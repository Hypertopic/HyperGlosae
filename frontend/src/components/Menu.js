import '../styles/Menu.css';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Menu({backend, user, setUser}) {
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
        <Authentication {...{backend, user, setUser}} />
      </Container>
    </Navbar>
  );
}

function Authentication({backend, user, setUser}) {
  const { t } = useTranslation();

  let handleSubmit = (e) => {
    e.preventDefault();
    let credentials = Object.fromEntries(new FormData(e.target).entries());
    backend.authenticate(credentials)
      .then(() => setUser(credentials.name))
      .catch(console.error);
  };

  if (user) return (
    <Navbar.Text>
      {user}
    </Navbar.Text>
  );
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-1">
        <Col>
          <input placeholder={`${t('username')}`} name="name"
            className="form-control-sm"
          />
        </Col>
        <Col>
          <input placeholder={`${t('password')}`} name="password" type="password"
            className="form-control-sm"
          />
        </Col>
        <Col>
          <button className="btn btn-outline-light" type="submit">
            {t('signin')}
          </button>
        </Col>
      </Row>
    </Form>
  );
}

export default Menu;
