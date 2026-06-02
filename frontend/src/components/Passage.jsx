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

function Passage({source, metadata, rubric, scholia, margin, sourceId, isComposite, rawEditMode, setRawEditMode, backend, setLastUpdate, user}) {
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
              <PassageSource {...{isComposite, metadata, highlightedText, setHighlightedText, setFragment, selectedText, setSelectedText, margin, rubric}}>
                {source}
              </PassageSource>
              <Rubric id={rubric} />
            </Row>
          </Container>
        }
      </Col>
      <PassageMargin active={!!margin} {...{scholia, rubric, setHighlightedText, fragment, setFragment, setSelectedText, rawEditMode, setRawEditMode, backend, setLastUpdate, user}} />
    </Row>
  );
}

function PassageSource({children, metadata, isComposite, highlightedText, setHighlightedText, setFragment, selectedText, setSelectedText, margin, rubric}) {
  const compositeTitleStyle = {color: 'crimson', textAlign: 'left'};
  const styleOdd = {borderLeft: '1px #AAA solid', backgroundColor: '#efefef'};
  const styleEven = {borderLeft: '1px #AAA solid', backgroundColor: '#f8f8ff'};
  let format = (actors, prefix = '', suffix = '') =>
    actors && (prefix + [actors].flat().join(' & ') + suffix);
  let getCaption = (dc_title, dc_spatial, actors, prefix = '', suffix = '') => dc_title + (dc_spatial ? `, ${dc_spatial} ` : ' ') + (format(actors, prefix, suffix));
  let documentsMetadata = metadata.forwardLinkedDocuments; // Can be undefined !
  if (documentsMetadata !== undefined) {
    documentsMetadata = documentsMetadata.filter(doc => 'dc_title' in doc);
  }
  console.log(JSON.stringify(documentsMetadata));
  return (
    <Col className="position-relative">
      {isComposite ? (
        <Row>
          {children.map((chunk, index) =>
            <Col key={index} style={index === 0 ? {} : (index % 2 === 0 ? styleEven : styleOdd)}>
              {(rubric === '0' || rubric == null) && documentsMetadata !== undefined ? (
                <div style={compositeTitleStyle}>
                  <span className="work">
                    {documentsMetadata[index] !== undefined ? (
                      getCaption(documentsMetadata[index].dc_title, documentsMetadata[index].dc_spatial, documentsMetadata[index].dc_creator, '(', ')')
                    ) : ('')}
                  </span>
                </div>
              ) : (null)
              }
              <SelectableFormattedText {...{highlightedText, setHighlightedText, setSelectedText}}>
                {chunk}
              </SelectableFormattedText>
            </Col>
          )}
        </Row>
      ) : (
        children.map((chunk, index) =>
          <SelectableFormattedText key={index} {...{highlightedText, setHighlightedText, setSelectedText}}>
            {chunk}
          </SelectableFormattedText>
        )
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

function PassageMargin({active, scholia, setHighlightedText, fragment, setFragment, setSelectedText, rawEditMode, setRawEditMode, backend, setLastUpdate, user}) {
  if (!active) return;
  return (
    <Col xs={5} className="scholium">
      {scholia.map((scholium, i) =>
        <EditableText key={i} {...scholium} {...{setHighlightedText, fragment, setFragment, setSelectedText, rawEditMode, setRawEditMode, backend, setLastUpdate, user}} />
      )}
    </Col>
  );
}

export default Passage;
