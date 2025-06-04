import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DiscreeteDropdown from '../components/DiscreeteDropdown';

function DeleteReferenceToDocumentAction() {
  const [show, setShow] = useState(false);
  const handleClick = () => {
  };
  return (
    <>
      <DiscreeteDropdown.Item onClick={() => setShow(true)}>
        Delete Reference...
      </DiscreeteDropdown.Item>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          Are you sure you want to delete the reference to the main document (with all of its contents and metadata).
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Delete reference
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteReferenceToDocumentAction;

