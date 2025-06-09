import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import DiscreeteDropdown from '../components/DiscreeteDropdown';

function DeleteReferenceToDocumentAction({id, margin, backend, metadata, content, setLastUpdate}) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setShow(false);
    metadata.links = metadata.links.filter(link => ![id, ...new Set([...content.filter((row) => row.value.isPartOf === id).map(({id, value}) => value._id || id)])].includes(link.object));
    backend.putDocument({...metadata})
      .then(x => setLastUpdate(x.rev))
      .then(() => navigate('/' + margin + '#' + margin))
      .catch(console.error);
  };

  const disabled = (metadata.links && metadata.links.length > 0 ? false : true);
  return (
    <>
      <DiscreeteDropdown.Item onClick={() => setShow(true)} {...{disabled}}>
        Delete reference...
      </DiscreeteDropdown.Item>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          Are you sure you want to delete the link between this glose and the
          focused document?
          Both documents will be preserved but in case of a &quot;quotation link&quot;,
          the quoted contents will be removed from the glose.
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

