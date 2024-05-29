import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormattedText from './FormattedText';
import EditableText from '../components/EditableText';
import {useState} from 'react';
import {v4 as uuid} from 'uuid';

function Passage({source, rubric, scholia, margin, sourceMetadata, backend, setLastUpdate}) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [beingEditedComment, setBeingEditedComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  let scholium = scholia.filter(x => (x.isPartOf === margin)) || {text: ''};
  //console.log(commentText);
  return (
    <Row>
      <Col className="main">
        <Container>
          <Row>
            <PassageSource setCommentText={setCommentText} setBeingEditedComment={setBeingEditedComment}>
              {source}
            </PassageSource>
            <Rubric id={rubric} />
          </Row>
        </Container>
      </Col>
      <PassageMargin active={!!margin} margin={margin} beingEdited={beingEdited} setBeingEdited={setBeingEdited} commentText={commentText} beingEditedComment={beingEditedComment} setBeingEditedComment={setBeingEditedComment} {...{sourceMetadata, scholium, rubric, backend, setLastUpdate}} />
    </Row>
  );
}

function PassageSource({children, setCommentText, setBeingEditedComment}) {
  return (
    <Col>
      {children.map((chunk, index) =>
        <FormattedText key={index} setCommentText={setCommentText} setBeingEditedComment={setBeingEditedComment}>
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

function PassageMargin({active, margin, beingEdited, setBeingEdited, commentText, beingEditedComment, setBeingEditedComment, sourceMetadata, scholium, rubric, backend, setLastUpdate}) {
  if (!active) return;
  let sourceId = sourceMetadata?._id;
  let futureId = uuid();
  return (
    <Col xs={5} className="scholium">
      {scholium.map((x, i) =>
        <EditableText key={i} text={x.text} id={x.id} rubric={rubric || x.rubric}
          beingEdited={beingEdited} setBeingEdited={setBeingEdited}
          {...{backend, setLastUpdate}}
        />
      )}
      {commentText &&
        <EditableText key={futureId} text={commentText} id={futureId} rubric={rubric} isPartOf={margin}
          beingEdited={beingEditedComment} setBeingEdited={setBeingEditedComment}
          {...{sourceId, backend, setLastUpdate}}
        />
      }
    </Col>
  );
}

export default Passage;