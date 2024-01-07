import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Metadata from './Metadata';
import BrowseTools from './BrowseTools';
import FutureDocument from './FutureDocument';
import FutureCollection from './FutureCollection';
import { TypeBadge } from './Type';

function DocumentsCards({docs, expandable, byRow, createOn, setLastUpdate, backend}) {
  return (
    <Row className="gy-4">
      {docs.map(x =>
        <Col key={x._id} md={ byRow && (12 / byRow) }>
          <DocumentCard doc={x} expandable={expandable} />
        </Col>
      )}
      {createOn &&
        <Col>
          <Row>
            <Col>
              <FutureDocument relatedTo={createOn} {...{setLastUpdate, backend}} />
            </Col>
            {(createOn.length > 0) &&
              <Col>
                <FutureCollection relatedTo={createOn} {...{setLastUpdate, backend}} />
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
      <References doc={doc} />
    </Card>
  );
}

function References({doc}) {
  if (doc.referenced) return (
    <Card.Footer>
      referenced by {doc.referenced} document(s)
    </Card.Footer>
  );
}

export default DocumentsCards;
