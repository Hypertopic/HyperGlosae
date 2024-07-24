import '../styles/Menu.css';
import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Menu({ backend }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
    const interval = setInterval(fetchUser, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchUser = () => {
    fetch('/api/_session', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data.userCtx.name))
      .catch(() => setUser(null));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData.entries());
    backend.authenticate(credentials)
      .then(() => {
        fetchUser();
      })
      .catch(console.error);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    backend.logout()
      .then(() => setUser(null))
      .catch(console.error);
  };

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
        <Authentication {...{ user, handleLogin, handleLogout }} />
      </Container>
    </Navbar>
  );
}

function Authentication({ user, handleLogin, handleLogout }) {
  if (user) {
    return (
      <Navbar.Text>
        {user} <a href="#logout" onClick={handleLogout}>Logout</a>
      </Navbar.Text>
    );
  }
  return (
    <Form onSubmit={handleLogin}>
      <Row className="g-1">
        <Col>
          <input placeholder="Username" name="name" className="form-control-sm" />
        </Col>
        <Col>
          <input placeholder="Password" name="password" type="password" className="form-control-sm" />
        </Col>
        <Col>
          <button className="btn btn-outline-light" type="submit">Sign in</button>
        </Col>
      </Row>
    </Form>
  );
}

export default Menu;
