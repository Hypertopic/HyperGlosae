import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import {format } from 'date-fns';

function ExistingDocument({ document, relatedTo, verb, setLastUpdate, backend }) {
  const navigate = useNavigate();
  const title = document.dc_title || 'Untitled document';
  const isPartOf = document.dc_isPartOf || '';
  const creator = document.dc_creator || '';
  const issued = format(new Date(document.dc_issued), 'dd/MM/yyyy HH:mm') || '';
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
        <span><strong>{title}</strong> - <i>{isPartOf} - {creator} - {issued}</i></span>
      </Card.Body>
    </Card>
  );
}

export default ExistingDocument;
