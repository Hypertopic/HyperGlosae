import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function ExistingDocument({ document, relatedTo, setLastUpdate, backend, setShowDocumentList }) {
  const navigate = useNavigate();
  const title = extractSubstring(document.dc_title || 'Untitled Document');

  const handleClick = async () => {
    let newLink = { verb: 'refersTo', object: relatedTo[0] };
    let updatedLinks = [...document.links, newLink];

    backend.putDocument({
      ...document,
      links: updatedLinks
    }).then(() => {
      setLastUpdate(document._id);
      navigate((relatedTo.length ? '#' : '/') + document._id);
    });

    setShowDocumentList(false);
  };

  return (
    <Card onClick={handleClick} className="existingDocument documentList">
      <Card.Body>
        <span>{title}</span>
      </Card.Body>
    </Card>
  );
}

function extractSubstring(str) {
  if (str.includes('–')) {
    str = str.split('–')[0];
  }

  if (str.length > 25) {
    str = str.substring(0, 25) + '...';
  }

  return str;
}

export default ExistingDocument;
