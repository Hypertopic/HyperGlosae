import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Bookmark, ChevronExpand } from 'react-bootstrap-icons';
import Metadata from './Metadata';

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
        <ToolBar doc_id={doc._id} expandable={expandable} />
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

function ToolBar({doc_id, expandable}) {
  if (expandable) return (
    <Link to={`#${doc_id}`} className="icon">
      <ChevronExpand title="Open this document" />
    </Link>
  );
  return (
    <Link to={`../${doc_id}`} className="icon">
      <Bookmark title="Focus on this document" />
    </Link>
  );
}

export default DocumentsCards;
