import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Metadata from './Metadata';
import BrowseTools from './BrowseTools';
import FutureDocument from './FutureDocument';
import { TypeBadge } from './Type';

function DocumentsCards({docs, expandable, byRow, createOn, setLastUpdate, backend, user, selectedDocs, setSelectedDocs}) {
  return (
    <Row className="gy-4">
      {docs.map(x => x?._id && x?.dc_title &&
        <Col key={x._id} md={ byRow && (12 / byRow) }>
          <DocumentCard
            doc={x}
            expandable={expandable}
            selectedDocs={selectedDocs}
            setSelectedDocs={setSelectedDocs}
          />
        </Col>
      )}
      {createOn &&
        <Col>
          <Row>
            <Col>
              <FutureDocument relatedTo={createOn} {...{setLastUpdate, backend, user}} />
            </Col>
          </Row>
        </Col>
      }
    </Row>
  );
}

function DocumentCard({doc, expandable, selectedDocs, setSelectedDocs}) {
  const handleCheck = (e) => {
    if (e.target.checked) {
      setSelectedDocs(prev => [...prev, doc._id]);
    } else {
      setSelectedDocs(prev => prev.filter(id => id !== doc._id));
    }
  };

  return (
    <Card className="h-100 position-relative">
      <Card.Body>
        <div className="d-flex align-items-start gap-2 mb-2">
          <Form.Check
            type="checkbox"
            id={`check-${doc._id}`}
            className="me-1"
            style={{ cursor: 'pointer' }}
            checked={selectedDocs?.includes(doc._id) || false}
            onChange={handleCheck}
          />
          <div className="flex-grow-1">
            <BrowseTools id={doc._id} openable={expandable} />
          </div>
        </div>
        <Metadata metadata={doc} />
        <TypeBadge type={doc?.type}/>
      </Card.Body>
    </Card>
  );
}

export default DocumentsCards;