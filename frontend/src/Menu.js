import './Menu.css';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Menu({ backend }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              src="/logo.png"
              height="30"
              alt="Index"
            />
          </Link>
        </Navbar.Brand>
        <Authentication {...{ backend }} />
      </Container>
    </Navbar>
  );
}

function Authentication({ backend }) {
  const [credentials, setCredentials] = useState();

  let handleSubmit = (e) => {
    e.preventDefault();
    let credentials = Object.fromEntries(new FormData(e.target).entries());
    backend.authenticate(credentials)
      .then(() => setCredentials(credentials));
  };

  if (credentials) return (
    <Navbar.Text>
      {credentials.name}
    </Navbar.Text>
  );
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-1">
        <Col>
          <input placeholder="Username" name="name"
            className="form-control-sm"
          />
        </Col>
        <Col>
          <input placeholder="Password" name="password" type="password"
            className="form-control-sm"
          />
        </Col>
        <Col>
          <button className="btn btn-outline-light" type="submit">
            Sign in
          </button>
        </Col>
      </Row>
    </Form>
  );
}

export default Menu;
