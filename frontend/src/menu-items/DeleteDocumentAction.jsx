import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Modal, Button, Dropdown } from 'react-bootstrap';

function DeleteDocumentAction({metadata, isFromScratch, backend, setLastUpdate}) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    backend.deleteDocument(metadata)
      .then(x => setLastUpdate(x.rev))
      .then(() => navigate(isFromScratch ? '/' : '#'));
  };

  return (
    <>
      <Dropdown.Item onClick={() => setShow(true)}>
        Delete...
      </Dropdown.Item>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          Are you sure you want to delete this document (with all of its contents and metadata).
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteDocumentAction;

