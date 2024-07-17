import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function ExistingDocument({ document, relatedTo, setLastUpdate, backend, setShowDocumentList }) {
  const navigate = useNavigate();
  const title = extractSubstring(document.dc_title || 'Untitled Document');

  const handleClick = async () => {
    backend.putDocument({
      ...document,
      links: [...document.links || [], { verb: 'refersTo', object: relatedTo[0] }]
    }).then(() => {
      setLastUpdate(document._id);
      navigate('#' + document._id);
    }).catch(console.error);

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
