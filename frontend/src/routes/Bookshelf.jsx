import '../styles/Bookshelf.css';

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import DocumentsCards from '../components/DocumentsCards';

function Bookshelf({backend, user}) {
  const [documents, setDocuments] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    backend.getAllDocuments(user)
      .then(setDocuments);
  }, [lastUpdate, user, backend]);

  return (
    <Container className="screen bookshelf">
      <DocumentsCards docs={documents} byRow={4} createOn={[]}
        {...{setLastUpdate, backend, user}}
      />
    </Container>
  );
}

export default Bookshelf;

