import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EditableText from '../components/EditableText';

function PassageBlank({rubric, scholia, backend, setLastUpdate}) {
  if (!scholia.length) {
    scholia = [{
      text: '&nbsp;',
      rubric,
    }];
  }
  return (
    <Row>
      <PassageMargin {...{scholia, backend, setLastUpdate}} />
    </Row>
  );
}

function PassageMargin({scholia, backend, setLastUpdate}) {
  const setHighlightedText = () => {};
  return (
    <Col className="scholium">
      {scholia.map((scholium, i) =>
        <EditableText key={i} {...scholium} {...{setHighlightedText, backend, setLastUpdate}} />
      )}
    </Col>
  );
}

export default PassageBlank;
