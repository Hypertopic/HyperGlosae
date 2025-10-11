import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';

function ExistingDocument({ document, relatedTo, verb, setLastUpdate, backend }) {
  const navigate = useNavigate();
  const title = document.dc_title || 'Untitled document';
  const sourceChunksToBeLinked = (verb !== 'includes' && relatedTo.length)
    ? [{ verb, object: relatedTo[0] }]
    : relatedTo.map(object =>({ verb, object }));

  const handleClick = async () => {
    const gloseChunksToBeLinked = (verb === 'includes')
      ? Promise.resolve([document._id])
      : backend.getView({view: 'content', id: document._id})
        .then(rows => rows
          .filter(x => x.value.isPartOf === document._id)
          .map(x => x.id)
          .reduce((set, item) => set.includes(item) ? set : [...set, item], [document._id])
        );
    gloseChunksToBeLinked.then(l =>
      l.map(x =>
        backend.getDocument(x)
          .then(chunk => backend.putDocument({
            ...chunk,
            links: [...chunk.links || [], ...sourceChunksToBeLinked]
          }))
      )
    )
      .then(x => Promise.all(x))
      .then(() => {
        setLastUpdate(document._id);
        navigate('#' + document._id);
      })
      .catch(console.error);
  };

  return (
    <Card onClick={handleClick} className="existingDocument documentList">
      <Card.Body>
        <span>{title}</span>
      </Card.Body>
    </Card>
  );
}

export default ExistingDocument;
