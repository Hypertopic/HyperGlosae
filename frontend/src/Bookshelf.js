import './Bookshelf.css';

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import DocumentsCards from './DocumentsCards';
import {TypesContext} from './DocumentsCards';

function Bookshelf({backend}) {
  const [documents, setDocuments] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    backend.getView({view: 'all_documents', options: ['group']})
      .then((rows) => {
        setDocuments(
          rows.map(
            ({value}) => ({...value.metadata, referenced: value.referenced})
          )
        );
      });
    backend.getView({view: 'types', options: ['include_docs']})
      .then(
        (rows) => {
          setTypes(rows);
        }
      );
  }, [lastUpdate]);

  return (
    <Container className="screen bookshelf">
      <TypesContext.Provider value={types}>
        <DocumentsCards docs={documents} byRow={4} createOn={[]} {...{setLastUpdate, backend}} />
      </TypesContext.Provider>
    </Container>
  );
}

export default Bookshelf;

