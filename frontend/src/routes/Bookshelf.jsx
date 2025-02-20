import '../styles/Bookshelf.css';

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import GraphContainer from '../components/GraphContainer';

function Bookshelf({backend, user}) {
  console.log('Bookshelf');
  const [documents, setDocuments] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    console.log('Fetching documents...');
    backend.refreshDocuments(setDocuments);
  }, [lastUpdate, user, backend]);
  useEffect(() => {
    console.log('Documents updated:', documents);
  }, [documents]);

  if (!documents.length) {
    return <div>Loading...</div>;
  };
  return (
    <>
      <Container className="screen bookshelf">
        {console.log('Container')}
        <GraphContainer data={documents} {...{setLastUpdate, backend}}/>
      </Container>
    </>
  );
}

export default Bookshelf;

