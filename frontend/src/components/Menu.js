import '../styles/Menu.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Menu({ backend, user, setUser }) {
  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

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
        <Authentication {...{ backend, user, setUser }} />
      </Container>
    </Navbar>
  );
}

function Authentication({ backend, user, setUser }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    let credentials = Object.fromEntries(new FormData(e.target).entries());
    backend.authenticate(credentials)
      .then(() => {
        setUser(credentials.name);
        Cookies.set('user', credentials.name);
        Cookies.set('name', credentials.name);
        Cookies.set('password', credentials.password);
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    setUser(null);
    Cookies.remove('user');
    Cookies.remove('name');
    Cookies.remove('password');
  };

  if (user) {
    return (
      <Navbar.Text>
        {user} <a href="/#logout" onClick={handleLogout}>Logout</a>
      </Navbar.Text>
    );
  }
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
