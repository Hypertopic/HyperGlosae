import '../styles/Bookshelf.css';

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import GraphContainer from '../components/GraphContainer';

function Bookshelf({backend, user}) {
  const [documents, setDocuments] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    backend.refreshDocuments(setDocuments);
  }, [lastUpdate, user, backend]);
  return (
    <Container className="screen bookshelf">
      <GraphContainer data={documents} createOn={[]} {...{setLastUpdate, backend, user}}/>
    </Container>
  );
}

export default Bookshelf;

