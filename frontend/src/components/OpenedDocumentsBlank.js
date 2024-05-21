import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BrowseTools from './BrowseTools';
import Metadata from './Metadata';
import Type from './Type';
import PassageBlank from './PassageBlank';
import License from './License';

function OpenedDocumentsBlank({ backend, lectern, sourceMetadata, setLastUpdate }) {
  if (!sourceMetadata) return;
  return (
    <Col className="lectern">
      <Row className="runningHead">
        <RunningHeadSource metadata={sourceMetadata} backend={backend} />
      </Row>
      {lectern.map(({ rubric, source, scholia }, i) => (
        <PassageBlank
          key={rubric || i}
          {...{ backend, scholia, setLastUpdate }}
        />
      ))}
      <Row>
        <Col className="license-container">
          <License key={sourceMetadata?._id} license={sourceMetadata?.dc_license} />
        </Col>
      </Row>
    </Col>
  );
}

function RunningHeadSource({ metadata, backend }) {
  return (
    <Col className="main">
      <BrowseTools id={metadata._id} />
      <Metadata editable={true} {...{ backend, metadata }} />
      <Type editable={true} {...{ backend, metadata }}/>
    </Col>
  );
}

export default OpenedDocumentsBlank;
