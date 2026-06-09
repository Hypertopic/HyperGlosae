import '../styles/Bookshelf.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import FutureDocument from '../components/FutureDocument.jsx';
import DocumentsCards from '../components/DocumentsCards.jsx';
import Graph from '../components/Graph.jsx';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { v4 as uuid } from 'uuid';

function Bookshelf({ backend, user }) {
  const [documents, setDocuments] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();
  const [displayMode, setDisplayMode] = useState(localStorage.getItem('displayMode') || 'graph');
  const [selectedDocs, setSelectedDocs] = useState([]);

  const navigate = useNavigate();
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

  const handleCreateQuotation = async () => {
    const _id = uuid().replace(/-/g, '');
    const doc = {
      _id,
      editors: [user],
      dc_creator: '…',
      dc_title: '…',
      dc_issued: new Date(),
      dc_isPartOf: null,
      dc_license: null,
      dc_translator: null,
      dc_language: null,
      dc_publisher: null,
      dc_spatial: null,
      text: '…',
      links: selectedDocs.map((object) => ({ verb: 'includes', object }))
    };

    try {
      await backend.putDocument(doc);
      setLastUpdate(_id);
      setSelectedDocs([]);
      navigate(`/${_id}#${_id}`);
    } catch (error) {
      console.error(error);
    }
  };

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
        return (
          <>
            {selectedDocs.length > 0 && (
              <div className="card p-3 mb-4 justify-content-between align-items-center flex-direction-row">
                <div>Create a new quotation with the <strong>{selectedDocs.length}</strong> selected document(s)</div>
                <Button variant="outline-danger" onClick={handleCreateQuotation} id="btn-create-quotation">
                  Create Quotation
                </Button>
              </div>
            )}
            <DocumentsCards
              docs={documents}
              byRow={4}
              createOn={[]}
              selectedDocs={selectedDocs}
              setSelectedDocs={setSelectedDocs}
              showCheckboxes={true}
              {...{setLastUpdate, backend, user}}
            />
          </>
        );
      default:
        return null;
    }
  }

  return (
    <Container className="screen bookshelf">
      <p id="title">My documents</p>
      <ButtonGroup size="sm" className="mb-2 mt-1">
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
            as a {display}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <DisplayDocuments />
    </Container>
  );
}

export default Bookshelf;