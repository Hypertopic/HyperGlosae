import { useState } from 'react';
import { Button, InputGroup, ListGroup, Modal, Form } from 'react-bootstrap';
import DiscreeteDropdown from './DiscreeteDropdown';

export default function InviteEditorsAction({metadata, backend, setLastUpdate}) {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');
  const [grantedEditors, setGrantedEditors] = useState(metadata.editors || []);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  let addEditor = () => {
    const formattedUserName = userName.trim();
    let editors;
    backend.getDocument(metadata._id)
      .then(x => {
        editors = [...(x.editors || []), formattedUserName];
        return backend.putDocument({...x, editors});
      })
      .then(x => setLastUpdate(x.rev))
      .then(() => {
        setGrantedEditors(editors);
        setUserName('');
      });
  };

  return (
    <>
      <DiscreeteDropdown.Item onClick={handleShow}>
        Invite editors...
      </DiscreeteDropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invite user to edit document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="inputPassword5">Username</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              className="add-user-input"
              value={userName}
              onInput={(event) => setUserName(event.target.value)}
            />
            <Button variant="primary" onClick={addEditor} className="add-user-input-btn">
              Invite
            </Button>
          </InputGroup>
        </Modal.Body>
        <Modal.Body>
          <h5>Editors</h5>
          <ListGroup>
            {grantedEditors.map((user) => (
              <ListGroup.Item key={user}>{user}</ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}
