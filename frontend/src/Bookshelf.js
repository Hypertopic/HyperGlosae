import './Bookshelf.css';

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import DocumentsCards from './DocumentsCards';

function Bookshelf() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5984/hyperglosae/_design/app/_view/all_documents?group=true`)
      .then(x => x.json())
      .then((result) => {
        setDocuments(
          result.rows.map(
            ({value}) => ({...value.metadata, referenced: value.referenced})
          )
        );
      });
  }, []);

  return (
    <Container className="screen bookshelf">
      <DocumentsCards docs={documents} />
    </Container>
  );
}

export default Bookshelf;

