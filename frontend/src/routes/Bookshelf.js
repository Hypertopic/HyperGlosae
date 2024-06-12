import '../styles/Bookshelf.css';

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import DocumentsCards from '../components/DocumentsCards';
import DocumentsGraph from '../components/DocumentsGraph';

function Bookshelf({backend, user}) {
  const [documents, setDocuments] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    backend.refreshDocuments(setDocuments);
  }, [lastUpdate, user]);

  return (
    <Container className="screen bookshelf">
      <DocumentsGraph docs = {documents}/>
      <DocumentsCards docs={documents} byRow={4} createOn={[]}
        {...{setLastUpdate, backend}}
      />
    </Container>
  );
}

export default Bookshelf;

