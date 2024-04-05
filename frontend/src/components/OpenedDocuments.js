import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BookmarkFill } from 'react-bootstrap-icons';
import BrowseTools from './BrowseTools';
import Metadata from './Metadata';
import Type, { TypeBadge } from './Type';
import Passage from './Passage';

function OpenedDocuments({backend, lectern, metadata, sourceMetadata, margin, setLastUpdate}) {
  return (
    <Col className="lectern">
      <Row className ="runningHead">
        <RunningHeadSource metadata={ sourceMetadata } />
        <RunningHeadMargin {...{backend}}
          metadata={ metadata.find(x => (x._id === margin)) }
        />
      </Row>
      {lectern.map(({rubric, source, scholia}, i) =>
        <Passage key={rubric || i}
          {...{source, rubric, scholia, margin, backend, setLastUpdate}}
        />)
      }
    </Col>
  );
}

function RunningHeadSource({metadata}) {
  return (
    <Col className="main">
      <BookmarkFill className="icon" />
      <Metadata {...{metadata}} />
      <TypeBadge type={metadata?.type} />
    </Col>
  );
}

function RunningHeadMargin({metadata, backend}) {
  if (!metadata) return;
  return (
    <Col xs={5} className="scholium">
      <BrowseTools id={metadata._id} closable={true} />
      <Metadata editable={true} {...{backend, metadata}} />
      <Type editable={true} {...{backend, metadata}}/>
    </Col>
  );
}

export default OpenedDocuments;
