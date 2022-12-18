import './Page.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Bookmark, BookmarkFill, ChevronBarDown } from 'react-bootstrap-icons';
import Metadata from './Metadata';
import DocumentsCards from './DocumentsCards';

function Page() {

  const [page, setPage] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [sourceMetadata, setSourceMetadata] = useState();
  const [sourcesOfSourceMetadata, setSourcesOfSourceMetadata] = useState([]);
  const [scholiaMetadata, setScholiaMetadata] = useState([]);
  let {id } = useParams();
  let margin = useLocation().hash.slice(1);

  useEffect(() => {
    fetch(`http://localhost:5984/hyperglosae/_design/app/_view/metadata?startkey=["${id}"]&endkey=["${id}",{}]&include_docs=true`)
      .then(x => x.json())
      .then(
        (result) => {
          let documents = result.rows.map(x => x.doc);
          setMetadata(documents);
          let focusedDocument = documents.find(x => (x._id === id));
          setSourceMetadata(focusedDocument);
          let forwardLinks = (focusedDocument.links || []).map(({subject, object}) =>
            (subject && (subject !== id)) ? subject : object
          );
          let forwardLinkedDocuments = documents.filter(x => forwardLinks.includes(x._id));
          setSourcesOfSourceMetadata(forwardLinkedDocuments);
          let reverseLinkedDocuments = documents.filter(
            x => !forwardLinks.includes(x._id) && x._id !== id
          );
          setScholiaMetadata(reverseLinkedDocuments);
        }
      );
    fetch(`http://localhost:5984/hyperglosae/_design/app/_view/content?startkey=["${id}"]&endkey=["${id}",{}]`)
      .then(x => x.json())
      .then(
        (result) => {
          let passages = result.rows.reduce(({whole, part}, x, i, {length}) => {
            if (part.rubric && (x.key[1] !== part.rubric)) {
              whole.push(part);
              part = {source:'', scholia:[]};
            }
            part.rubric = x.key[1];
            if (x.value.isPartOf === id) {
              part.source = x.value.text;
            } else {
              part.scholia = [...part.scholia || [], x.value];
            }
            if (i === length - 1) {
              return [...whole, part];
            }
            return {whole, part};
          }, {whole: [], part: {source:'', scholia:[]}});
          setPage(passages);
        },
        (error) => {
          console.log(error.message)
        }
      )
  }, [id]);

  return (
      <Container className="screen">
        <Row>
          <Col md={2} className="references">
            <DocumentsCards docs={sourcesOfSourceMetadata} />
          </Col>
          <Col className="page">
            <Row className ="runningHead">
              <RunningHeadSource metadata={ sourceMetadata } />
              <RunningHeadMargin metadata={ metadata.find(x => (x._id === margin)) } />
            </Row>
            {page.map(({rubric, source, scholia}) =>
              <Passage key={rubric} source={source} rubric={rubric} scholia={scholia} margin={margin} />)}
          </Col>
          <References scholiaMetadata={scholiaMetadata} active={!margin} />
        </Row>
      </Container>
  );
}

function Passage({source, rubric, scholia, margin}) {
  let scholium = scholia.find(x => (x.isPartOf === margin)) || {text: ''};
  return (
    <Row>
      <Col className="source">
        <Container>
          <Row>
            <Col>
              {source}
            </Col>
            <Col xs={1} className="rubric">{rubric}</Col>
          </Row>
        </Container>
      </Col>
      <PassageMargin scholium={scholium} active={!!margin} />
    </Row>
  );
}

function PassageMargin({active, scholium}) {
  if (!active) return;
  return (
    <Col xs={5} className="scholium">
      {scholium.text}
    </Col>
  );
}

function RunningHeadSource({metadata}) {
  return (
    <Col className="source">
      <BookmarkFill className="icon" />
      <Metadata metadata={metadata} />
    </Col>
  );
}

function RunningHeadMargin({metadata}) {
  if (!metadata) return;
  return (
    <Col xs={5} className="scholium">
      <Link to="#" className="icon">
        <ChevronBarDown title="Close this document" />
      </Link>
      <Link to={`../${metadata._id}`} className="icon">
        <Bookmark title="Focus on this document" />
      </Link>
      <Metadata metadata={metadata} />
    </Col>
  );
}

function References({scholiaMetadata, active}) {
  if (!active) return;
  return (
    <Col className="references" >
      <DocumentsCards docs={scholiaMetadata} expandable={true} />
    </Col>
  );
}

export default Page;
