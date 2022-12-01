import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Bookmark } from 'react-bootstrap-icons';
import Metadata from './Metadata';

function DocumentsCards({docs}) {
  return docs.map(x =>
    <DocumentCard key={x._id} doc={x} />
  );
}

function DocumentCard({doc}) {
  return (
    <Card>
      <Card.Body>
        <Link to={`../${doc._id}`} className="icon">
          <Bookmark title="Focus on this document" />
        </Link>
        <Metadata metadata={doc} />
      </Card.Body>
    </Card>
  );
}

export default DocumentsCards;
