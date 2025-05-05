import DiscreeteDropdown from '../components/DiscreeteDropdown';

function EditRawDocumentAction({setRawEditMode}) {

  const handleClick = () => setRawEditMode(true);

  return (
    <DiscreeteDropdown.Item onClick={handleClick}>
      Edit passage numbering
    </DiscreeteDropdown.Item>
  );
}

export default EditRawDocumentAction;

