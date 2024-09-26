import '../styles/Lectern.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Context from '../context';
import OpenedDocuments from '../components/OpenedDocuments';
import DocumentsCards from '../components/DocumentsCards';

function Lectern({backend, user}) {

  const [lectern, setLectern] = useState([]);
  const [metadata, setMetadata] = useState(new Context());
  const [content, setContent] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();
  const [sourceHasRubrics, setSourceHasRubrics] = useState();
  const [marginHasRubrics, setMarginHasRubrics] = useState();
  let {id} = useParams();
  let margin = useLocation().hash.slice(1);
  let hasRubrics = (id, rows) => rows.some(x => x.key[1] !== 0 && x.value.isPartOf === id && x.value.text);
  const getCaption = ({dc_title, dc_spatial}) => dc_title + (dc_spatial ? `, ${dc_spatial}` : '');

  if (metadata) {
    const sourceMetadata = metadata.focusedDocument;
    document.title = `${getCaption(sourceMetadata)} ${sourceMetadata.dc_creator ? `(${sourceMetadata.dc_creator})` : ''}`;
  }

  useEffect(() => {
    backend.refreshMetadata(id, x => setMetadata(new Context(id, x)));
    backend.refreshContent(id, setContent);
  }, [id, lastUpdate, backend]);

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
      let sourceHasRubrics = hasRubrics(id, content);
      let marginHasRubrics = hasRubrics(margin, content);
      setSourceHasRubrics(sourceHasRubrics);
      setMarginHasRubrics(marginHasRubrics);
      let shouldBeAligned = sourceHasRubrics && (!margin || marginHasRubrics);
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
          part.scholia = [...part.scholia || [], {id: x.id, text, isPartOf, rubric: x.key[1]}];
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
          <DocumentsCards docs={metadata.forwardLinkedDocuments} byRow={1} />
        </Col>
        <OpenedDocuments
          hasSources={metadata.forwardLinkedDocuments.length > 0}
          {...{backend, lectern, metadata, margin, id, sourceHasRubrics, marginHasRubrics, setLastUpdate}}
        />
        <References active={!margin} createOn={[id]}
          {...{metadata, user, setLastUpdate, backend}}
        />
      </Row>
    </Container>
  );
}

function References({metadata, active, createOn, setLastUpdate, backend, user}) {
  if (!active) return;
  return (
    <Col className="gloses" >
      <DocumentsCards docs={metadata.reverseLinkedDocuments} expandable={true} byRow={1}
        {...{createOn, setLastUpdate, backend, user}}
      />
    </Col>
  );
}

export default Lectern;
