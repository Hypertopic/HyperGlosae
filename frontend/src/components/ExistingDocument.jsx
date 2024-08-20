import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function ExistingDocument({ document, relatedTo, setLastUpdate, backend, setShowDocumentList }) {
  const navigate = useNavigate();
  const title = extractSubstring(document.dc_title || 'Untitled Document');

  const handleClick = async () => {
    backend.getView({view: 'content', id: document._id, options: ['include_docs']})
      .then(rows => rows
        .filter(x => x.value.isPartOf === document._id)
        .map(x => x.id)
        .reduce((set, item) => set.includes(item) ? set : [...set, item], [document._id])
        .map(x =>
          backend.getDocument(x)
            .then(chunk => backend.putDocument({
              ...chunk,
              links: [...chunk.links || [], { verb: 'refersTo', object: relatedTo[0] }]
            }))
        )
      )
      .then(x => Promise.all(x))
      .then(() => {
        setLastUpdate(document._id);
        navigate('#' + document._id);
      })
      .catch(console.error);
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
