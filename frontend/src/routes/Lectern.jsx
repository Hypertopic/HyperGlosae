import '../styles/Lectern.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Context from '../context';
import ParallelDocuments from '../parallelDocuments';
import OpenedDocuments from '../components/OpenedDocuments';
import DocumentsCards from '../components/DocumentsCards';

function Lectern({backend, user}) {

  const [metadata, setMetadata] = useState(new Context());
  const [content, setContent] = useState(new ParallelDocuments());
  const [lastUpdate, setLastUpdate] = useState();
  let {id} = useParams();
  let margin = useLocation().hash.slice(1);
  const getCaption = ({dc_title, dc_spatial}) => [dc_title, dc_spatial].filter(Boolean).join(', ');

  if (metadata) {
    const sourceMetadata = metadata.focusedDocument;
    document.title = `${getCaption(sourceMetadata)} ${sourceMetadata.dc_creator ? `(${sourceMetadata.dc_creator})` : ''}`;
  }

  useEffect(() => {
    backend.refreshMetadata(id, x => setMetadata(new Context(id, x)));
    backend.refreshContent(id, x => setContent(new ParallelDocuments(id, x)));
  }, [id, lastUpdate, backend]);

  useEffect(() => {
    content.setMargin(margin);
  }, [content, margin, lastUpdate]);

  return (
    <Container className="screen">
      <Row>
        <Col md={2} className="sources">
          <DocumentsCards docs={metadata.forwardLinkedDocuments} byRow={1} />
        </Col>
        <OpenedDocuments
          hasSources={metadata.forwardLinkedDocuments.length > 0}
          {...{id, margin, metadata, content, backend, setLastUpdate}}
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
