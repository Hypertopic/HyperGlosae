import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Metadata from './Metadata';
import BrowseTools from './BrowseTools';

function DocumentsCards({docs, expandable}) {
  return (
    <Row className="gy-4">
      {docs.map(x =>
        <Col key={x._id} className="xs-4">
          <DocumentCard doc={x} expandable={expandable} />
        </Col>
      )}
    </Row>
  );
}

function DocumentCard({doc, expandable}) {
  return (
    <Card className="h-100">
      <Card.Body>
        <BrowseTools id={doc._id} openable={expandable} />
        <Metadata metadata={doc} />
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
