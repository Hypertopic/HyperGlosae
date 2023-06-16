import './Page.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { BookmarkFill } from 'react-bootstrap-icons';
import Metadata from './Metadata';
import DocumentsCards from './DocumentsCards';
import BrowseTools from './BrowseTools';
import EditableText from './EditableText';
import FormattedText from './FormattedText';
import Type, { TypeBadge } from './Type';
import NavbarCollection from './navbarCollection';
import {TypesContext} from './DocumentsCards';
import RelatedCollections from './RelatedCollections';
import { isPhoneSizedWindow } from './utils';

function Page({backend}) {

  const [types, setTypes] = useState([]);
  const [page, setPage] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [sourceMetadata, setSourceMetadata] = useState();
  const [sourcesOfSourceMetadata, setSourcesOfSourceMetadata] = useState([]);
  const [scholiaMetadata, setScholiaMetadata] = useState([]);
  const [content, setContent] = useState([]);
  const [trail, setTrail] = useState({});
  const [lastUpdate, setLastUpdate] = useState();
  let {id, collectionId} = useParams();
  const position = useMemo(() => {
    if (trail.links && id) {
      let element = trail.links.find((item) => {
        return item.object === id;
      });
      return trail.links.indexOf(element);
    }
    return undefined;
  }, [trail.links, id]);
  let margin = useLocation().hash.slice(1);
  let hasRubrics = (id, rows) => rows.some(x => x.key[1] !== 0 && x.value.isPartOf === id && x.value.text);
  const getCaption = ({dc_title, dc_spatial}) => dc_title + (dc_spatial ? `, ${dc_spatial}` : '');

  if (sourceMetadata)
    document.title = `${getCaption(sourceMetadata)} ${sourceMetadata.dc_creator ? `(${sourceMetadata.dc_creator})` : ''}`;

  useEffect(() => {
    backend.getView({view: 'metadata', id, options: ['include_docs']})
      .then(
        (rows) => {
          let documents = rows.map(x => x.doc);
          setMetadata(documents);
        }
      );
    backend.getView({view: 'types', options: ['include_docs']})
      .then(
        (rows) => {
          setTypes(rows);
        }
      );
    backend.getView({view: 'content', id, options: ['include_docs']})
      .then(
        (rows) => {
          setContent(rows);
        },
        (error) => {
          console.log(error.message);
        }
      );
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
      }
      if (collectionId) {
        setTrail(metadata.find((item) => item._id === collectionId));
      }
    }
  }, [id, metadata, lastUpdate, collectionId]);

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
          part = {source: '', scholia: []};
        }
        if (shouldBeAligned) {
          part.rubric = x.key[1];
        }
        let text = getText(x);
        let isPartOf = x.value.isPartOf;
        if (isPartOf === id) {
          part.source += '\n\n' + text;
        } else {
          part.scholia = [...part.scholia || [], {id: x.id, text, isPartOf}];
        }
        if (i === length - 1) {
          return [...whole, part];
        }
        return {whole, part};
      }, {whole: [], part: {source: '', scholia: []}});
      passages = Array.isArray(passages) ? passages : [];
      setPage(passages);
    }
  }, [id, margin, content]);

  return (
    <TypesContext.Provider value={types}>
      <Container className="screen">
        <Row>
          <Col md={2} className="sources">
            <DocumentsCards docs={sourcesOfSourceMetadata} types={types} byRow={1} />
          </Col>
          <Col className="page">
            <Row className="runningHead">
              <RunningHeadSource metadata={sourceMetadata}/>
              <RunningHeadMargin {...{backend}} metadata={metadata.find(x => (x._id === margin))} />
            </Row>
            {page.map(({rubric, source, scholia}, i) =>
              <Passage key={rubric || i} {...{source, rubric, scholia, margin, backend}} />)
            }
          </Col>
          <References types={types} scholiaMetadata={scholiaMetadata} active={!margin} createOn={[id]} {...{setLastUpdate, backend}} />
        </Row>
        <div className="navbar-collec">
          {(trail.links && position) != undefined &&
          <>
            <RelatedCollections relatedDocumentsMetadata={scholiaMetadata}
              currentCollectionId={collectionId} />
            <NavbarCollection
              position={position + 1}
              total={trail.links.length}
              pastId={ (position) == 0 ? undefined : trail.links[position - 1].object }
              nextId={ (position == trail.links.length - 1) ? undefined : trail.links[position + 1].object }
              collectionId={trail._id}
            />
          </>
          }
        </div>
      </Container>
    </TypesContext.Provider>
  );
}

function Passage({source, rubric, scholia, margin, backend}) {
  let scholium = scholia.filter(x => (x.isPartOf === margin)) || {text: ''};
  return (
    <Row>
      <Col className="main">
        <Container>
          <Row>
            <Col>
              <FormattedText>
                {source}
              </FormattedText>
            </Col>
            <Rubric id={rubric} />
          </Row>
        </Container>
      </Col>
      <PassageMargin active={!!margin} {...{scholium, rubric, backend}} />
    </Row>
  );
}

function Rubric({id}) {
  if (id) return (
    <Col xs={1} className="rubric">{id}</Col>
  );
}

function PassageMargin({active, scholium, rubric, backend}) {
  if (!active) return;
  return (
    <Col xs={5} className="scholium">
      {scholium.map((x, i) =>
        <EditableText key={i} text={x.text} id={x.id} {...{rubric, backend}} />
      )}
    </Col>
  );
}

function RunningHeadSource({metadata}) {
  return (
    <Col className="main">
      <BookmarkFill className="icon" />
      <Metadata metadata={metadata} />
      <TypeBadge type={metadata?.type} />
    </Col>
  );
}

function RunningHeadMargin({metadata, backend}) {
  if (!metadata) return;
  return (
    <Col xs={5} className="scholium">
      <BrowseTools id={metadata._id} closable={true} />
      <Metadata metadata={metadata} editable={true} {...{backend}} />
      <Type metadata={metadata} editable={true} {...{backend}}/>
    </Col>
  );
}

function References({scholiaMetadata, types, active, createOn, setLastUpdate, backend}) {
  if (!active) return;
  return (
    <Col className="gloses">
      <DocumentsCards docs={scholiaMetadata} types={types} expandable={true} byRow={1} {...{createOn, setLastUpdate, backend}} />
    </Col>
  );
}

export default Page;
