import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { v4 as uuidv4 } from 'uuid';
import { FolderPlus } from 'react-bootstrap-icons';

function FutureCollection({relatedTo, setLastUpdate, backend}) {
  const navigate = useNavigate();

  let handleClick = async () => {
    let _id = uuidv4();
    let editors = [backend.credentials.name];
    let links = relatedTo.map(object => ({verb: 'includes', object}));
    backend.putDocument({
      _id,
      editors,
      dc_creator: '<CREATOR>',
      dc_title: '<TITLE>',
      dc_issued: new Date(),
      text: '',
      dc_license: 'https://creativecommons.org/licenses/by-sa/4.0/',
      links
    })
      .then((x) => {
        setLastUpdate(_id);
        navigate((relatedTo.length ? '#' : '/') + _id);
      });
  };

  return (
    <Card className="h-100">
      <Card.Body className="text-center">
        <FolderPlus title="Create a collection from this document"
          className="icon create-collection" onClick={handleClick}
        />
      </Card.Body>
    </Card>
  );
}

export default FutureCollection;
