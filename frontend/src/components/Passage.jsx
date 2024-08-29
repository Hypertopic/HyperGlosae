import '../styles/Passage.css';

import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Marker } from 'react-mark.js';
import FormattedText from './FormattedText';
import EditableText from '../components/EditableText';
import PassageSourceMenu from './PassageSourceMenu';

function Passage({source, rubric, scholia, margin, sourceId, backend, setLastUpdate}) {
  const [selectedText, setSelectedText] = useState();
  const [highlightedText, setHighlightedText] = useState('');
  const [fragment, setFragment] = useState();

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
            <PassageSource {...{highlightedText, setHighlightedText, setFragment, selectedText, setSelectedText}}>
              {source}
            </PassageSource>
            <Rubric id={rubric} />
          </Row>
        </Container>
      </Col>
      <PassageMargin active={!!margin} {...{scholia, rubric, setHighlightedText, fragment, setFragment, setSelectedText, backend, setLastUpdate}} />
    </Row>
  );
}

function PassageSource({children, highlightedText, setHighlightedText, setFragment, selectedText, setSelectedText}) {
  return (
    <Col className="position-relative">
      {children.map((chunk, index) =>
        <Marker key={index} mark={highlightedText} options={({separateWordSearch: false})}>
          <FormattedText selectable="true" {...{setSelectedText, setHighlightedText}}>
            {chunk}
          </FormattedText>
        </Marker>
      )}
      <PassageSourceMenu {...{selectedText, setSelectedText, setFragment}}/>
    </Col>
  );
}

function Rubric({id}) {
  if (id) return (
    <Col xs={1} className="rubric">{id}</Col>
  );
}

function PassageMargin({active, scholia, setHighlightedText, fragment, setFragment, setSelectedText, backend, setLastUpdate}) {
  if (!active) return;
  return (
    <Col xs={5} className="scholium">
      {scholia.map((scholium, i) =>
        <EditableText key={i} {...scholium} {...{setHighlightedText, fragment, setFragment, setSelectedText, backend, setLastUpdate}} />
      )}
    </Col>
  );
}

export default Passage;
