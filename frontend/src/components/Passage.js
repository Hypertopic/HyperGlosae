import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormattedText from './FormattedText';
import EditableText from '../components/EditableText';

function Passage({source, rubric, scholia, margin, sourceId, backend, setLastUpdate}) {
  scholia = scholia.filter(x => (x.isPartOf === margin));
  if (!scholia.length) {
    scholia = [{
      text: '&nbsp;',
      rubric,
      isPartOf: margin,
      links: [{verb: 'relatesTo', object: sourceId}]
    }];
  }
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
      <PassageMargin active={!!margin} {...{scholia, rubric, backend, setLastUpdate}} />
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

function PassageMargin({active, scholia, rubric, backend, setLastUpdate}) {
  if (!active) return;
  return (
    <Col xs={5} className="scholium">
      {scholia.map((scholium, i) =>
        <EditableText key={i} {...scholium} {...{backend, setLastUpdate}} />
      )}
    </Col>
  );
}

export default Passage;
