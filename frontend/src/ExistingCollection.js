import './ExistingCollection.css';
import Card from 'react-bootstrap/Card';

function ExistingCollection({relatedTo, collection, setLastUpdate, backend, setShowList}) {
  const id = collection._id;
  const title = extractSubstring(collection.value.dc_title);

  let handleClick = async () => {
    let newLink = {verb: 'includes', object: relatedTo[0]};
    let updatedLinks = [...collection.value.links, newLink];
    backend.putDocument({
      ...collection.value,
      links: updatedLinks
    }).then(() => {
      setLastUpdate(id);
    });
    setShowList(false);
  };

  return (
    <Card onClick={handleClick} className="existingCollection collectionList">
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

export default ExistingCollection;
