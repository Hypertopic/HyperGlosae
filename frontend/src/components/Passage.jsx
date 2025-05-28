import '../styles/Passage.css';

import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Marker } from 'react-mark.js';
import FormattedText from './FormattedText';
import EditableText from '../components/EditableText';
import DiscreeteDropdown from './DiscreeteDropdown';
import CommentFragmentAction from '../menu-items/CommentFragmentAction';

function Passage({source, rubric, scholia, margin, sourceId, rawEditMode, setRawEditMode, backend, setLastUpdate}) {
  const [selectedText, setSelectedText] = useState();
  const [highlightedText, setHighlightedText] = useState('');
  const [fragment, setFragment] = useState();
  const isFromScratch = margin === sourceId;

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
        {!isFromScratch &&
          <Container>
            <Row>
              <PassageSource {...{highlightedText, setHighlightedText, setFragment, selectedText, setSelectedText, margin}}>
                {source}
              </PassageSource>
              <Rubric id={rubric} />
            </Row>
          </Container>
        }
      </Col>
      <PassageMargin active={!!margin} {...{scholia, rubric, setHighlightedText, fragment, setFragment, setSelectedText, rawEditMode, setRawEditMode, backend, setLastUpdate}} />
    </Row>
  );
}

function PassageSource({children, highlightedText, setHighlightedText, setFragment, selectedText, setSelectedText, margin}) {
  return (
    <Col className="position-relative">
      {children.map((chunk, index) =>
        <SelectableFormattedText key={index} {...{highlightedText, setHighlightedText, setSelectedText}}>
          {chunk}
        </SelectableFormattedText>
      )}
      <DiscreeteDropdown>
        <CommentFragmentAction {...{selectedText, setSelectedText, setFragment, margin}}/>
      </DiscreeteDropdown>
    </Col>
  );
}

function SelectableFormattedText({children, highlightedText, setHighlightedText, setSelectedText}) {
  return (
    <Marker mark={highlightedText} options={({separateWordSearch: false})}>
      <FormattedText selectable="true" {...{setSelectedText, setHighlightedText}}>
        {children}
      </FormattedText>
    </Marker>
  );
}

function Rubric({id}) {
  if (id) return (
    <Col xs={1} className="rubric">{id}</Col>
  );
}

function PassageMargin({active, scholia, setHighlightedText, fragment, setFragment, setSelectedText, rawEditMode, setRawEditMode, backend, setLastUpdate}) {
  if (!active) return;
  return (
    <Col xs={5} className="scholium">
      {scholia.map((scholium, i) =>
        <EditableText key={i} {...scholium} {...{setHighlightedText, fragment, setFragment, setSelectedText, rawEditMode, setRawEditMode, backend, setLastUpdate}} />
      )}
    </Col>
  );
}

export default Passage;
