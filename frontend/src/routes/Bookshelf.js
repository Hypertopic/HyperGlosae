import '../styles/Bookshelf.css';

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import DocumentsCards from '../components/DocumentsCards';

function Bookshelf({backend, credentials}) {
  const [documents, setDocuments] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    // This will now re-run when `credentials` changes.
    backend.refreshDocuments((newDocuments) => {
      setDocuments(newDocuments);
    });
  }, [credentials]);

  return (
    <Container className="screen bookshelf">
      <DocumentsCards docs={documents} byRow={4} createOn={[]}
        {...{setLastUpdate, backend}}
      />
    </Container>
  );
}

export default Bookshelf;

