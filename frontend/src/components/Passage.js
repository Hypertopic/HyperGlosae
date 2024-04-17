import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormattedText from './FormattedText';
import EditableText from '../components/EditableText';
import {useState} from 'react';

function Passage({source, rubric, scholia, margin, backend, setLastUpdate}) {
  const [beingEdited, setBeingEdited] = useState(false);
  let scholium = scholia.filter(x => (x.isPartOf === margin)) || {text: ''};
  return (
    <Row>
      <Col className="main">
        <Container>
          <Row>
            <PassageSource>
              {source}
            </PassageSource>
            <Rubric id={rubric} />
          </Row>
        </Container>
      </Col>
      <PassageMargin active={!!margin} beingEdited={beingEdited} setBeingEdited={setBeingEdited} {...{scholium, rubric, backend, setLastUpdate}} />
    </Row>
  );
}

function PassageSource({children}) {
  return (
    <Col>
      {children.map((chunk, index) =>
        <FormattedText key={index}>
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

function PassageMargin({active, beingEdited, setBeingEdited, scholium, rubric, backend, setLastUpdate}) {
  if (!active) return;
  return (
    <Col xs={5} className="scholium">
      {scholium.map((x, i) =>
        <EditableText key={i} text={x.text} id={x.id} rubric={rubric || x.rubric}
          beingEdited={beingEdited} setBeingEdited={setBeingEdited}
          {...{backend, setLastUpdate}}
        />
      )}
    </Col>
  );
}

export default Passage;
