import './FutureDocument.css';

import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { PlusLg } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';

function FutureDocument({ relatedTo, setLastUpdate, backend }) {
  const navigate = useNavigate();

  let handleClick = async () => {
    let _id = uuid();
    let editors = [ backend.credentials.name ];
    let links = relatedTo.map(object => ({ verb: 'refersTo', object }));
    backend.putDocument({
      _id,
      editors,
      dc_creator: '<CREATOR>',
      dc_title: '<TITLE>',
      dc_issued: new Date(),
      text: '<TEXT>',
      links
    }).then(() => {
      setLastUpdate(_id);
      navigate((relatedTo.length ? '#' : '/') + _id);
    });
  };

  return (
    <Card>
      <Card.Body className="text-center">
        <PlusLg title={`Create a document ${relatedTo.length ? 'as a glose' : 'from scratch'}`}
          className="icon create-document" onClick={handleClick}
        />
      </Card.Body>
    </Card>
  );
}

export default FutureDocument;
