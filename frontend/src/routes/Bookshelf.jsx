import '../styles/Bookshelf.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import FutureDocument from '../components/FutureDocument.jsx';
import Graph from '../components/Graph.jsx';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Bookshelf({ backend, user }) {
  const [documents, setDocuments] = useState();
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    backend.getAllDocuments(user)
      .then(setDocuments);
  }, [lastUpdate, user, backend]);
  const docs = documents?.filter(x => !!x)
    .map(({_id, dc_title, links}) => [_id, dc_title, links]);
  const displayedDocs = docs?.flatMap(d => d[0]);

  return (
    <Container className="screen bookshelf">
      <Row>
        <Col className="col-10">
          <Graph rawDocs={docs} {...{displayedDocs}} />
        </Col>
        <Col>
          <FutureDocument relatedTo={[]} {...{setLastUpdate, backend, user}} />
        </Col>
      </Row>
    </Container>
  );
}

export default Bookshelf;

