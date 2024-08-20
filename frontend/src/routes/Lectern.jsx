import '../styles/Lectern.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import OpenedDocuments from '../components/OpenedDocuments';
import DocumentsCards from '../components/DocumentsCards';

function Lectern({backend, user}) {

  const [lectern, setLectern] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [sourceMetadata, setSourceMetadata] = useState();
  const [sourcesOfSourceMetadata, setSourcesOfSourceMetadata] = useState([]);
  const [scholiaMetadata, setScholiaMetadata] = useState([]);
  const [content, setContent] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();
  let {id} = useParams();
  let margin = useLocation().hash.slice(1);
  let hasRubrics = (id, rows) => rows.some(x => x.key[1] !== 0 && x.value.isPartOf === id && x.value.text);
  const getCaption = ({dc_title, dc_spatial}) => dc_title + (dc_spatial ? `, ${dc_spatial}` : '');

  if (sourceMetadata)
    document.title = `${getCaption(sourceMetadata)} ${sourceMetadata.dc_creator ? `(${sourceMetadata.dc_creator})` : ''}`;

  useEffect(() => {
    backend.refreshMetadata(id, setMetadata);
    backend.refreshContent(id, setContent);
  }, [id, lastUpdate, backend]);

  useEffect(() => {
    if (metadata.length) {
      let focusedDocument = metadata.find(x => (x._id === id));
      if (focusedDocument) {
        setSourceMetadata(focusedDocument);
        let forwardLinks = (focusedDocument.links || [])
          .map(({subject, object}) => (subject && (subject !== id)) ? subject : object)
          .map(x => x.split('#')[0]);
        let forwardLinkedDocuments = metadata.filter(x => forwardLinks.includes(x._id));
        setSourcesOfSourceMetadata(forwardLinkedDocuments);
        let reverseLinkedDocuments = metadata.filter(
          x => !forwardLinks.includes(x._id) && x._id !== id
        );
        setScholiaMetadata(reverseLinkedDocuments);
      };
    }
  }, [id, metadata, lastUpdate]);

  useEffect(() => {
    let getText = ({doc, value}) => {
      if (!doc || !doc.text) {
        return value.text;
      }
      let fragment = (value.inclusion !== 'whole' ? '#' + value.inclusion : '')
        + ` "${getCaption(doc)}"`;
      let imageReference = /!\[[^\]]*\]\([^)]+/;
      return doc.text.replace(imageReference, '$&' + fragment);
    };

    if (content.length) {
      let shouldBeAligned = hasRubrics(id, content) && (!margin || hasRubrics(margin, content));
      let passages = content.reduce(({whole, part}, x, i, {length}) => {
        if (part.rubric && (x.key[1] !== part.rubric || !shouldBeAligned && i === length - 1)) {
          whole.push(part);
          part = {source: [], scholia: []};
        }
        if (shouldBeAligned) {
          part.rubric = x.key[1];
        }
        let text = getText(x);
        let isPartOf = x.value.isPartOf;
        if (isPartOf === id) {
          part.source.push(text);
        } else {
          part.scholia = [...part.scholia || [], {id: x.id, rev: x.rev, text, isPartOf, rubric: x.key[1]}];
        }
        if (i === length - 1) {
          return [...whole, part];
        }
        return {whole, part};
      }, {whole: [], part: {source: [], scholia: []}});
      passages = Array.isArray(passages) ? passages : [];
      setLectern(passages);
    }
  }, [id, margin, content, lastUpdate]);

  return (
    <Container className="screen">
      <Row>
        <Col md={2} className="sources">
          <DocumentsCards docs={sourcesOfSourceMetadata} byRow={1} />
        </Col>
        <OpenedDocuments
          hasSources={sourcesOfSourceMetadata.length > 0}
          {...{backend, lectern, metadata, sourceMetadata, margin, id, setLastUpdate}}
        />
        <References scholiaMetadata={scholiaMetadata} active={!margin}
          createOn={[id]} {...{setLastUpdate, backend, user}}
        />
      </Row>
    </Container>
  );
}

function References({scholiaMetadata, active, createOn, setLastUpdate, backend, user}) {
  if (!active) return;
  return (
    <Col className="gloses" >
      <DocumentsCards docs={scholiaMetadata} expandable={true} byRow={1}
        {...{createOn, setLastUpdate, backend, user}}
      />
    </Col>
  );
}

export default Lectern;
