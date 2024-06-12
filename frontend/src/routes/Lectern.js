import '../styles/Lectern.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { BookmarkFill } from 'react-bootstrap-icons';
import Metadata from '../components/Metadata';
import DocumentsCards from '../components/DocumentsCards';
import BrowseTools from '../components/BrowseTools';
import EditableText from '../components/EditableText';
import DocumentSources from '../components/DocumentSources';
import Type, { TypeBadge } from '../components/Type';
import More from '../components/More';

function Lectern({backend}) {

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
  }, [id, lastUpdate]);

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

  let getText = ({doc, value}) => {
    if (!doc) {
      return value.text;
    }
    let fragment = (value.inclusion !== 'whole' ? '#' + value.inclusion : '')
      + ` "${getCaption(doc)}"`;
    let imageReference = /!\[[^\]]*\]\([^)]+/;
    return doc.text.replace(imageReference, '$&' + fragment);
  };

  useEffect(() => {
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
          <DocumentsCards docs={sourcesOfSourceMetadata} byRow={1} />
        </Col>
        <Col className="lectern">
          <Row className ="runningHead">
            <RunningHeadSource metadata={ sourceMetadata } backend={backend} />
            <RunningHeadMargin {...{backend}}
              metadata={ metadata.find(x => (x._id === margin)) }
            />
          </Row>
          {lectern.map(({rubric, source, scholia}, i) =>
            <Passage key={rubric || i}
              {...{source, rubric, scholia, margin, backend, setLastUpdate}}
            />)
          }
        </Col>
        <References scholiaMetadata={scholiaMetadata} active={!margin}
          createOn={[id]} {...{setLastUpdate, backend}}
        />
      </Row>
    </Container>
  );
}

function Passage({source, rubric, scholia, margin, backend, setLastUpdate}) {
  let scholium = scholia.filter(x => (x.isPartOf === margin)) || {text: ''};
  return (
    <Row>
      <Col className="main">
        <Container>
          <Row>
            <Col>
              <DocumentSources>
                {source}
              </DocumentSources>
            </Col>
            <Rubric id={rubric} />
          </Row>
        </Container>
      </Col>
      <PassageMargin active={!!margin} {...{scholium, rubric, backend, setLastUpdate}} />
    </Row>
  );
}

function Rubric({id}) {
  if (id) return (
    <Col xs={1} className="rubric">{id}</Col>
  );
}

function PassageMargin({active, scholium, rubric, backend, setLastUpdate}) {
  if (!active) return;
  return (
    <Col xs={5} className="scholium">
      {scholium.map((x, i) =>
        <EditableText key={i} text={x.text} id={x.id} rubric={rubric || x.rubric}
          {...{backend, setLastUpdate}}
        />
      )}
    </Col>
  );
}

function RunningHeadSource({metadata, backend}) {
  return (
    <Col className="main">
      <BookmarkFill className="icon"/>
      <Metadata metadata={metadata}/>
      <TypeBadge type={metadata?.type}/>
    </Col>
  );
}

function RunningHeadMargin({metadata, backend}) {
  if (!metadata) return;
  return (
    <Col xs={5} className="scholium">
      <BrowseTools id={metadata._id} closable={true} />
      <More metadata={metadata} backend={backend} />
      <Metadata metadata={metadata} editable={true} {...{backend}} />
      <Type metadata={metadata} editable={true} {...{backend}}/>
    </Col>
  );
}

function References({scholiaMetadata, active, createOn, setLastUpdate, backend}) {
  if (!active) return;
  return (
    <Col className="gloses" >
      <DocumentsCards docs={scholiaMetadata} expandable={true} byRow={1}
        {...{createOn, setLastUpdate, backend}}
      />
    </Col>
  );
}

export default Lectern;
