import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import DiscreeteDropdown from './DiscreeteDropdown';

function DeleteDocumentAction({metadata, backend, setLastUpdate}) {
  const focus = useNavigate('#');
  const [show, setShow] = useState(false);

  const handleClick = () => {
    backend.deleteDocument(metadata)
      .then(x => setLastUpdate(x._rev))
      .then(focus);
  };

  return (
    <>
      <DiscreeteDropdown.Item onClick={() => setShow(true)}>
        Delete...
      </DiscreeteDropdown.Item>
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

