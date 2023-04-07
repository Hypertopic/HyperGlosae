import './Page.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { BookmarkFill } from 'react-bootstrap-icons';
import ReactMarkdown from 'react-markdown';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import remarkUnwrapImages from 'remark-unwrap-images'
import Metadata from './Metadata';
import DocumentsCards from './DocumentsCards';
import BrowseTools from './BrowseTools';
import CroppedImage from './CroppedImage';
import hyperglosae from './hyperglosae';

function Page() {

  const [page, setPage] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [sourceMetadata, setSourceMetadata] = useState();
  const [sourcesOfSourceMetadata, setSourcesOfSourceMetadata] = useState([]);
  const [scholiaMetadata, setScholiaMetadata] = useState([]);
  const [content, setContent] = useState([]);
  let {id } = useParams();
  let margin = useLocation().hash.slice(1);
  let hasRubrics = (id, rows) => rows.some(x => x.key[1] !== 0 && x.value.isPartOf === id && x.value.text);

  if (sourceMetadata)
    document.title = `${sourceMetadata.dc_title} ${sourceMetadata.dc_creator ? `(${sourceMetadata.dc_creator})` : ''}`

  useEffect(() => {
    hyperglosae.getView({view: 'metadata', id, options:['include_docs']})
      .then(
        (rows) => {
          let documents = rows.map(x => x.doc);
          setMetadata(documents);
        }
      );
    hyperglosae.getView({view: 'content', id, options:['include_docs']})
      .then(
        (rows) => {
          setContent(rows);
        },
        (error) => {
          console.log(error.message)
        }
      );
  }, [id]);

  useEffect(() => {
    if (metadata.length) {
      let focusedDocument = metadata.find(x => (x._id === id));
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
  }, [id, metadata]);

  let getText = ({doc, value}) => {
    if (!doc) {
      return value.text;
    }
    if (value.inclusion !== 'whole') {
      let fragment = '#' + value.inclusion;
      let imageReference = /!\[[^\]]*\]\([^)]+/;
      return doc.text.replace(imageReference, '$&' + fragment);
    }
    return doc.text;
  }

  useEffect(() => {
    if (content.length) {
      let shouldBeAligned = hasRubrics(id, content) && (!margin || hasRubrics(margin, content));
      let passages = content.reduce(({whole, part}, x, i, {length}) => {
        if (part.rubric && (x.key[1] !== part.rubric || !shouldBeAligned && i === length - 1)) {
          whole.push(part);
          part = {source:'', scholia:[]};
        }
        if (shouldBeAligned) {
          part.rubric = x.key[1];
        }
        let text = getText(x);
        let isPartOf = x.value.isPartOf;
        if (isPartOf === id) {
          part.source += '\n\n' + text;
        } else {
          part.scholia = [...part.scholia || [], {text, isPartOf}];
        }
        if (i === length - 1) {
          return [...whole, part];
        }
        return {whole, part};
      }, {whole: [], part: {source:'', scholia:[]}});
      passages = Array.isArray(passages) ? passages : [];
      setPage(passages);
    }
  }, [id, margin, content]);

  return (
      <Container className="screen">
        <Row>
          <Col md={2} className="sources">
            <DocumentsCards docs={sourcesOfSourceMetadata} />
          </Col>
          <Col className="page">
            <Row className ="runningHead">
              <RunningHeadSource metadata={ sourceMetadata } />
              <RunningHeadMargin metadata={ metadata.find(x => (x._id === margin)) } />
            </Row>
            {page.map(({rubric, source, scholia}, i) =>
              <Passage key={rubric || i} source={source} rubric={rubric} scholia={scholia} margin={margin} />)}
          </Col>
          <References scholiaMetadata={scholiaMetadata} active={!margin} />
        </Row>
      </Container>
  );
}

function Passage({source, rubric, scholia, margin}) {
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
      <PassageMargin scholium={scholium} active={!!margin} />
    </Row>
  );
}

function Rubric({id}) {
  if (id) return (
    <Col xs={1} className="rubric">{id}</Col>
  );
}

function PassageMargin({active, scholium}) {
  if (!active) return;
  let scholiumText = scholium.map(x => x.text).join('');
  return (
    <Col xs={5} className="scholium">
      <FormattedText>
        {scholiumText}
      </FormattedText>
    </Col>
  );
}

function RunningHeadSource({metadata}) {
  return (
    <Col className="main">
      <BookmarkFill className="icon" />
      <Metadata metadata={metadata} />
    </Col>
  );
}

function RunningHeadMargin({metadata}) {
  if (!metadata) return;
  return (
    <Col xs={5} className="scholium">
      <BrowseTools id={metadata._id} closable={true} />
      <Metadata metadata={metadata} />
    </Col>
  );
}

function References({scholiaMetadata, active}) {
  if (!active) return;
  return (
    <Col className="gloses" >
      <DocumentsCards docs={scholiaMetadata} expandable={true} />
    </Col>
  );
}

function FormattedText({children}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkDefinitionList, remarkUnwrapImages]}
      components={{
        img: CroppedImage
      }}
      remarkRehypeOptions={{
        handlers: defListHastHandlers
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

export default Page;
