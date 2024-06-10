import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BookmarkFill } from 'react-bootstrap-icons';
import BrowseTools from './BrowseTools';
import Metadata from './Metadata';
import Type, { TypeBadge } from './Type';
import Passage from './Passage';
import License from './License';
import LicenseCompatibility from './LicenseCompatibility';

function OpenedDocuments({backend, lectern, metadata, sourceMetadata, margin, id, setLastUpdate}) {
  const marginLicense = margin ? metadata.find(x => x._id === margin)?.dc_license : null;
  return (
    <Col className="lectern">
      <Row className ="runningHead">
        <RunningHeadSource metadata={ sourceMetadata } />
        <RunningHeadMargin {...{backend}}
          metadata={ metadata.find(x => (x._id === margin)) } setLastUpdate={setLastUpdate}
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
            <LicenseCompatibility sourceMetadata={sourceMetadata} marginLicense={marginLicense} />
          </Col>
        </Row>
      )}
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

function RunningHeadMargin({metadata, backend, setLastUpdate}) {
  if (!metadata) return;
  return (
    <Col xs={5} className="scholium">
      <BrowseTools id={metadata._id} closable={true} />
      <Metadata editable={true} {...{backend, metadata, setLastUpdate}} />
      <Type editable={true} {...{backend, metadata}}/>
    </Col>
  );
}

export default OpenedDocuments;
