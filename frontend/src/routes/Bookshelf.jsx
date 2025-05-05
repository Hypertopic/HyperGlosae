import '../styles/Bookshelf.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import FutureDocument from '../components/FutureDocument.jsx';
import DocumentsCards from '../components/DocumentsCards.jsx';
import Graph from '../components/Graph.jsx';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Bookshelf({ backend, user }) {
  const [documents, setDocuments] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();
  const [displayMode, setDisplayMode] = useState(localStorage.getItem('displayMode') || 'graph');

  const displayModesList = ['graph', 'list'];

  useEffect(() => {
    backend.getAllDocuments(user)
      .then(setDocuments);
  }, [lastUpdate, user, backend]);
  const docs = [
    ...new Map(
      documents?.filter(x => !!x)
        .map(({_id, dc_title, links}) => [_id, [_id, dc_title, links]])
    ).values()
  ];
  const displayedDocs = docs?.flatMap(d => d[0]);

  function DisplayDocuments() {
    switch (displayMode) {
      case 'graph':
        return (
          <Row>
            <Col className="col-10">
              <Graph rawDocs={docs} {...{displayedDocs}} />
            </Col>
            <Col>
              <FutureDocument relatedTo={[]} {...{setLastUpdate, backend, user}} />
            </Col>
          </Row>
        );
      case 'list':
        return <DocumentsCards docs={documents} byRow={4} createOn={[]}
          {...{setLastUpdate, backend, user}}
        />;
    }
  }

  return (
    <Container className="screen bookshelf">
      <h4>My documents</h4>
      <ButtonGroup className="mb-2">
        {displayModesList.map((display, idx) => (
          <ToggleButton
            key={idx}
            id={`display-${display}`}
            type="radio"
            variant="outline-dark"
            name="displayMode"
            value={display}
            checked={displayMode === display}
            onChange={(e) => {
              setDisplayMode(e.currentTarget.value);
              localStorage.setItem('displayMode', e.currentTarget.value);
            }}
          >
            As a {display}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <DisplayDocuments />
    </Container>
  );
}

export default Bookshelf;

