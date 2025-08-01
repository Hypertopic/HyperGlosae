import { Container, Row, Col, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router';

function DocumentNotFound() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="text-center w-100">
        <Col>
          <h1 className="display-5 fw-bold text-danger">Document introuvable</h1>
          <p className="lead text-muted mb-4">
            Le document que vous cherchez a été supprimé par les co-éditeurs ou l&apos;URI fournie est incorrecte.
          </p>
          <Button
            variant="light"
            size="lg"
            onClick={() => navigate('/')}
          >
            Revenir à l&apos;accueil
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DocumentNotFound;
