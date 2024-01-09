import '../styles/FutureDocument.css';

import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { PlusLg, FolderPlus } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';

function FutureDocument({relatedTo, verb = 'refersTo', setLastUpdate, backend}) {
  return (
    <Card>
      <Card.Body className="text-center">
        <FutureDocumentIcon {...{relatedTo, verb, setLastUpdate, backend}} />
      </Card.Body>
    </Card>
  );
}

function FutureDocumentIcon({relatedTo, verb, setLastUpdate, backend}) {
  const navigate = useNavigate();

  let handleClick = async () => {
    let _id = uuid();
    let editors = [backend.credentials.name];
    let links = relatedTo.map(object => ({verb, object}));
    backend.putDocument({
      _id,
      editors,
      dc_creator: '<CREATOR>',
      dc_title: '<TITLE>',
      dc_issued: new Date(),
      dc_license: '',
      text: '<TEXT>',
      links
    }).then((x) => {
      setLastUpdate(_id);
      navigate((relatedTo.length ? '#' : '/') + _id);
    });
  };

  switch (verb) {
    case 'includes':
      return (
        <FolderPlus title="Create a collection from this document"
          className="icon create-collection" onClick={handleClick}
        />
      );
    default:
      return (
        <PlusLg title={`Create a document ${relatedTo.length ? 'as a glose' : 'from scratch'}`}
          className="icon create-document" onClick={handleClick}
        />
      );
  }
}

export default FutureDocument;
