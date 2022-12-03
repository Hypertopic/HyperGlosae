import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Bookmark } from 'react-bootstrap-icons';
import Metadata from './Metadata';

function DocumentsCards({docs}) {
  return (
    <Row className="gy-4">
      {docs.map(x =>
        <Col key={x._id} className="xs-4">
          <DocumentCard doc={x} />
        </Col>
      )}
    </Row>
  );
}

function DocumentCard({doc}) {
  return (
    <Card className="h-100">
      <Card.Body>
        <Link to={`../${doc._id}`} className="icon">
          <Bookmark title="Focus on this document" />
        </Link>
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
