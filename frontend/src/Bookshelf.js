import './Bookshelf.css';

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import DocumentsCards from './DocumentsCards';

function Bookshelf({backend}) {
  const [documents, setDocuments] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    backend.getView({view: 'all_documents', options: ['group']})
      .then((rows) => {
        setDocuments(
          rows.map(
            ({value}) => ({...value.metadata, referenced: value.referenced})
          )
        );
      });
  }, [lastUpdate]);

  return (
    <Container className="screen bookshelf">
      <DocumentsCards docs={documents} byRow={4} createOn={[]}
        {...{setLastUpdate, backend}}
      />
    </Container>
  );
}

export default Bookshelf;

