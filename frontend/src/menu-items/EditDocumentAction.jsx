import { useNavigate } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';

function EditDocumentAction({id}) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`../${id}#${id}`);
  };

  return (
    <Dropdown.Item onClick={handleClick}>
      Edit this document
    </Dropdown.Item>
  );
}

export default EditDocumentAction;

