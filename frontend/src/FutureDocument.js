import './FutureDocument.css';

import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { PlusLg } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';
import hyperglosae from './hyperglosae';

function FutureDocument({relatedTo, setLastUpdate}) {
  const navigate = useNavigate();

  let handleClick = async () => {
    let _id = uuid();
    let links = relatedTo.map(object => ({verb: 'refersTo', object}));
    Promise.all([
      hyperglosae.putDocument({
        _id,
        dc_creator: '<CREATOR>',
        dc_title: '<TITLE>',
        dc_issued: new Date(),
        links
      }),
      hyperglosae.putDocument({
        _id: uuid(),
        isPartOf: _id,
        text: '<TEXT>',
        links
      })
    ]).then((x) => {
      setLastUpdate(_id);
      navigate((relatedTo.length ? '#' : '/') + _id);
    });
  };

  return (
    <Card>
      <Card.Body className="text-center">
        <PlusLg title="Create a document as a glose" className="icon"
          onClick={handleClick}
        />
      </Card.Body>
    </Card>
  );
}

export default FutureDocument;
