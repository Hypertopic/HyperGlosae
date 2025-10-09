import '../styles/Menu.css';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import SignOutAction from '../menu-items/SignOutAction';

function Menu({backend, user, setUser}) {
  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand>
          <OverlayTrigger overlay={<Tooltip>Consult my bookshelf</Tooltip>} placement="bottom">
            <Link to="/">
              <img
                src="/logo.png"
                height="30"
                alt="Index"
              />
            </Link>
          </OverlayTrigger>
        </Navbar.Brand>
        <Authentication {...{backend, user, setUser}} />
      </Container>
    </Navbar>
  );
}

function Authentication({backend, user, setUser}) {

  let handleSubmit = (e) => {
    e.preventDefault();
    let credentials = Object.fromEntries(new FormData(e.target).entries());
    backend.postSession(credentials)
      .then(setUser);
  };

  if (user) return (
    <Dropdown>
      <Dropdown.Toggle variant="dark">
        {user}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <SignOutAction {...{setUser, backend}} />
      </Dropdown.Menu>
    </Dropdown>
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
        <Col>
          <Link className="btn btn-outline-light" to="/registration">
            Register...
          </Link>
        </Col>
      </Row>
    </Form>
  );
}

export default Menu;
