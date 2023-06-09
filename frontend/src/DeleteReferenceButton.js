import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import {XCircle} from 'react-bootstrap-icons';

function DeleteReferenceButton({doc, ref_id, setLastUpdate, backend}) {
  const navigate = useNavigate();
  let handleDelete = async () => {
    let _id = doc._id;
    doc.links = doc.links.filter(link => link.object.toString() !== ref_id.toString());
    backend.putDocument(doc).then(() => {
      setLastUpdate(_id);
      navigate('/' + ref_id);
    });
  };

  return (
    <XCircle title="Delete this reference" className="icon delete_reference" onClick={handleDelete}/>
  );
}

export default DeleteReferenceButton;