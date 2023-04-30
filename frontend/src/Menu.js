import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function Menu() {
  let random = Math.random();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/logo.png"
            height="30"
            alt="Index"
          />
        </Navbar.Brand>
        <Navbar.Text>
          {random}
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default Menu;
