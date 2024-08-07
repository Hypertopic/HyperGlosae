import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BrowseTools from './BrowseTools';
import Metadata from './Metadata';
import Type, { TypeBadge } from './Type';
import Passage from './Passage';
import License from './License';
import More from './More';
import Bookmark from './Bookmark';
import LicenseCompatibility from './LicenseCompatibility';

function OpenedDocuments({backend, lectern, metadata, sourceMetadata, margin, hasSources, id, setLastUpdate}) {
  const marginMetadata = metadata.find(x => x._id === margin);
  const marginLicense = marginMetadata?.dc_license;
  return (
    <Col className="lectern">
      <Row className ="runningHead">
        <RunningHeadSource metadata={ sourceMetadata } {...{hasSources, backend}} />
        <RunningHeadMargin {...{backend, setLastUpdate}}
          metadata={marginMetadata}
        />
      </Row>
      {lectern.map(({rubric, source, scholia}, i) =>
        <Passage key={rubric || i}
          {...{source, rubric, scholia, margin, sourceId: id, backend, setLastUpdate}}
        />)
      }
      <Row>
        <Col className="license-container">
          <License key={sourceMetadata?._id} license={sourceMetadata?.dc_license} />
        </Col>
        {margin && (
          <Col className="license-container">
            <License key={margin} license={metadata.find(x => x._id === margin)?.dc_license} />
          </Col>
        )}
      </Row>
      {margin && (
        <Row>
          <Col>
            <LicenseCompatibility {...{sourceMetadata, marginLicense}} />
          </Col>
        </Row>
      )}
    </Col>
  );
}

function RunningHeadSource({metadata, hasSources, backend}) {
  let id = metadata?._id;
  return (
    <Col className="main">
      <Bookmark {...{backend, id}} />
      <BrowseTools id={metadata?._id} editable={!hasSources} focusable={false} />
      <Metadata {...{metadata}} />
      <TypeBadge type={metadata?.type} />
    </Col>
  );
}

function RunningHeadMargin({metadata, backend, setLastUpdate}) {
  if (!metadata) return;
  return (
    <Col xs={5} className="scholium">
      <BrowseTools id={metadata._id} closable={true} />
      <More {...{backend, metadata}} />
      <Metadata editable={true} {...{backend, metadata, setLastUpdate}} />
      <Type editable={true} {...{backend, metadata}}/>
    </Col>
  );
}

export default OpenedDocuments;
