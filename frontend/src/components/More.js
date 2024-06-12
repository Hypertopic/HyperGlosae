import Dropdown from 'react-bootstrap/Dropdown';
import {ThreeDotsVertical} from 'react-bootstrap-icons';
import {useEffect, useState} from 'react';
import {Button, InputGroup, ListGroup, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function More({metadata, backend}) {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState(metadata);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let addEditor = () => {
    if (!loading) {
      setLoading(true);
      const payload = {...document, editors: [...(document.editors ?? [])]};
      const formattedUserName = userName.trim();

      if (payload.editors.includes(formattedUserName) || formattedUserName === '') {
        setUserName('');
        setLoading(false);
        return;
      }

      payload.editors.push(formattedUserName);

      backend.putDocument(payload).then(({rev}) => {
        payload._rev = rev;
        setDocument(payload);
        setUserName('');
        setLoading(false);
      });
    }
  };

  return (
    <>
      <Dropdown className="float-end more-btn">
        <Dropdown.Toggle variant="ghost">
          <ThreeDotsVertical/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as="button" onClick={handleShow} className="dropdown-item-share">Share</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

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
            {(document && document.editors ? document.editors : []).map((user) => (
              <ListGroup.Item key={user}>{user}</ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}