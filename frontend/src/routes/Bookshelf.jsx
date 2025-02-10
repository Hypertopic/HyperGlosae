import '../styles/Bookshelf.css';

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import DocumentsCards from '../components/DocumentsCards';
import GraphContainer from '../components/GraphContainer';

function Bookshelf({backend, user}) {
  console.log('Bookshelf');
  const [documents, setDocuments] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();
  const [display, setDisplay] = useState('cards');

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
  if (display === 'cards') {
    return (
      <>
        <button className="btn btn-dark" style={{ marginTop: '2px', marginLeft: '2px' }} onClick={() => displayButtonClicked(display, setDisplay)}>Relation Graph</button>
        <Container className="screen bookshelf">
          <DocumentsCards docs={documents} byRow={4} createOn={[]}
            {...{setLastUpdate, backend}}
          />
        </Container>
      </>
    );
  }
  if (display === 'graph') {
    return (
      <>
        <button className="btn btn-dark" style={{ marginTop: '2px', marginLeft: '2px' }} onClick={() => displayButtonClicked(display, setDisplay)}>Documents List</button>
        <Container className="screen bookshelf">
          {console.log('Container')}
          <GraphContainer data={documents} {...{setLastUpdate, backend}}/>
        </Container>
      </>
    );
  }
}

function displayButtonClicked(display, setDisplay) {
  if (display === 'cards') {
    setDisplay('graph');
  }
  if (display === 'graph') {
    setDisplay('cards');
  }
}

export default Bookshelf;

