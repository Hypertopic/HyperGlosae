import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Metadata from './Metadata';
import BrowseTools from './BrowseTools';
import FutureDocument from './FutureDocument';
import { TypeBadge } from './Type';

// asSource is a flag that indicates whether to create a parent (left) or a glose (right)
function DocumentsCards({docs, expandable, byRow, createOn, setLastUpdate, backend, user, asSource = false}) {
  return (
    <Row className="gy-4">
      {docs.map(x => x._id &&
        <Col key={x._id} md={ byRow && (12 / byRow) }>
          <DocumentCard doc={x} expandable={expandable} />
        </Col>
      )}
      {createOn &&
        <Col>
          <Row>
            <Col>
              <FutureDocument relatedTo={createOn} {...{setLastUpdate, backend, user, asSource}} />
            </Col>
            {(!asSource && createOn.length > 0) &&
              <Col>
                <FutureDocument relatedTo={createOn} verb="includes" {...{setLastUpdate, backend}} />
              </Col>
            }
          </Row>
        </Col>
      }
    </Row>
  );
}

function DocumentCard({doc, expandable}) {
  return (
    <Card className="h-100">
      <Card.Body>
        <BrowseTools id={doc._id} openable={expandable} />
        <Metadata metadata={doc} />
        <TypeBadge type={doc?.type}/>
      </Card.Body>
    </Card>
  );
}

export default DocumentsCards;
