import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormattedText from './FormattedText';
import EditableText from '../components/EditableText';

function Passage({source, rubric, scholia, margin, backend, setLastUpdate, comment, addComment}) {
  let scholium = scholia.filter(x => (x.isPartOf === margin)) || {text: ''};
  return (
    <Row>
      <Col className="main">
        <Container>
          <Row>
            <PassageSource addComment={addComment}>
              {source}
            </PassageSource>
            <Rubric id={rubric} />
          </Row>
        </Container>
      </Col>
      <PassageMargin active={!!margin} {...{scholium, rubric, backend, setLastUpdate, comment}} />
    </Row>
  );
}

function PassageSource({children, addComment}) {
  return (
    <Col>
      {children.map((chunk, index) =>
        <FormattedText key={index} addComment={addComment}>
          {chunk}
        </FormattedText>
      )}
    </Col>
  );
}

function Rubric({id}) {
  if (id) return (
    <Col xs={1} className="rubric">{id}</Col>
  );
}

function PassageMargin({active, scholium, rubric, backend, setLastUpdate, comment}) {
  if (!active) return;
  return (
    <Col xs={5} className="scholium">
      {scholium.map((x, i) =>
        <EditableText key={i} text={x.text} id={x.id} rubric={rubric || x.rubric}
          {...{backend, setLastUpdate, comment}}
        />
      )}
    </Col>
  );
}

export default Passage;
