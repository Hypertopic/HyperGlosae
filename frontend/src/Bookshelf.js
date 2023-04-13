import './Bookshelf.css';

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import DocumentsCards from './DocumentsCards';
import hyperglosae from './hyperglosae';

function Bookshelf() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    hyperglosae.getView({view: 'all_documents', options: ['group']})
      .then((rows) => {
        setDocuments(
          rows.map(
            ({value}) => ({...value.metadata, referenced: value.referenced})
          )
        );
      });
  }, []);

  return (
    <Container className="screen bookshelf">
      <DocumentsCards docs={documents} byRow={4} />
    </Container>
  );
}

export default Bookshelf;

