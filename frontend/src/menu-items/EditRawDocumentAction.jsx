import Dropdown from 'react-bootstrap/Dropdown';

function EditRawDocumentAction({setRawEditMode}) {

  const handleClick = () => setRawEditMode(true);

  return (
    <Dropdown.Item onClick={handleClick}>
      Edit passage numbering
    </Dropdown.Item>
  );
}

export default EditRawDocumentAction;

