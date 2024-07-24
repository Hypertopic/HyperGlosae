import '../styles/Passage.css';

import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Marker } from 'react-mark.js';
import FormattedText from './FormattedText';
import EditableText from '../components/EditableText';
import PassageSourceMenu from './PassageSourceMenu';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

function Passage({ source, rubric, scholia, margin, sourceId, backend, setLastUpdate }) {
  const [highlightedText, setHighlightedText] = useState('');
  const [fragment, setFragment] = useState('');

  const navigate = useNavigate();

  const handleAddQuotation = async (chunk, passageId, passageKey) => {
    let _id = uuid();
    let doc = {
      _id,
      editors: [backend.credentials.name],
      dc_creator: '<CREATOR>',
      dc_title: '<TITLE>',
      dc_issued: new Date().toISOString(),
      dc_license: '',
      text: '<TEXT>',
      links: [
        { verb: 'includes', object: sourceId },
        { verb: 'includes', object: `${passageId}#${passageKey}` } // Include both passageId and passageKey
      ] // Include both sourceId and passageId with key
    };

    try {
      await backend.putDocument(doc);
      setLastUpdate(_id);
      navigate((sourceId ? '#' : '/') + _id);
    } catch (error) {
      console.error('Failed to create new document:', error);
    }
  };

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
            <PassageSource {...{highlightedText, rubric, setHighlightedText, setFragment, handleAddQuotation, source}} />
          </Row>
        </Container>
      </Col>
      <PassageMargin active={!!margin} {...{scholia, rubric, setHighlightedText, fragment, setFragment, backend, setLastUpdate}} />
    </Row>
  );
}

function PassageSource({ source, highlightedText, rubric, setHighlightedText, setFragment, handleAddQuotation }) {
  return (
    <Col>
      {source.map((passage, index) => {
        const { text, _id: passageId, key } = passage;
        return (
          <Marker key={index} mark={highlightedText} options={{ separateWordSearch: false }}>
            <div className="passage-source-wrapper">
              <FormattedText selectable="true" {...{ setFragment, setHighlightedText }}>
                {text}
              </FormattedText>
              <Rubric id={rubric} handleAddQuotation={() => handleAddQuotation(text, passageId, key)} />
            </div>
          </Marker>
        );
      })}
    </Col>
  );
}

function Rubric({ id, handleAddQuotation }) {
  if (id) return (
    <Col xs={1} className="rubric editable">
      {id}
      <PassageSourceMenu handleAddQuotation={handleAddQuotation} />
    </Col>
  );
  return null;
}

function PassageMargin({ active, scholia, setHighlightedText, fragment, setFragment, backend, setLastUpdate }) {
  if (!active) return null;
  return (
    <Col xs={5} className="scholium">
      {scholia.map((scholium, i) =>
        <EditableText key={i} {...scholium} {...{ setHighlightedText, fragment, setFragment, backend, setLastUpdate }} />
      )}
    </Col>
  );
}

export default Passage;
