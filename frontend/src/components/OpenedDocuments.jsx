import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BrowseTools from './BrowseTools';
import Metadata from './Metadata';
import Type, { TypeBadge } from './Type';
import Passage from './Passage';
import License from './License';
import DiscreeteDropdown from './DiscreeteDropdown';
import InviteEditorsAction from '../menu-items/InviteEditorsAction';
import BreakIntoPassagesAction from '../menu-items/BreakIntoPassagesAction';
import DeleteDocumentAction from '../menu-items/DeleteDocumentAction';
import Bookmark from './Bookmark';
import LicenseCompatibility from './LicenseCompatibility';

function OpenedDocuments({id, margin, metadata, parallelDocuments, backend, user, setLastUpdate}) {
  const marginMetadata = metadata.getDocument(margin);
  const marginLicense = marginMetadata?.dc_license;
  const sourceMetadata = metadata.focusedDocument;
  const xs = margin ? 12 : 7;
  return (
    <Col className="lectern" {...{xs}} >
      <Row className ="runningHead">
        <RunningHeadSource {...{id, metadata, parallelDocuments, backend, user}} />
        <RunningHeadMargin {...{parallelDocuments, margin, backend, setLastUpdate}}
          metadata={marginMetadata}
        />
      </Row>
      {parallelDocuments.passages.map(({rubric, source, scholia}, i) =>
        <Passage key={rubric || i}
          {...{source, rubric, scholia, margin, sourceId: id, backend, setLastUpdate}}
        />)
      }
      <Row>
        <Col className="license-container">
          <License key={sourceMetadata?._id} license={sourceMetadata?.dc_license} />
        </Col>
        {margin && !parallelDocuments.isFromScratch && (
          <Col className="license-container">
            <License key={margin} license={marginLicense} />
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

function RunningHeadSource({id, metadata, parallelDocuments, backend, user}) {
  metadata = metadata.focusedDocument;
  if (parallelDocuments.isFromScratch) return (
    <Col className="main" />
  );
  return (
    <Col className="main">
      <Bookmark {...{backend, user, id}} />
      <BrowseTools {...{id}} editable={true} focusable={false} />
      <Metadata {...{metadata}} />
      <TypeBadge type={metadata?.type} />
    </Col>
  );
}

function RunningHeadMargin({metadata, parallelDocuments, margin, backend, setLastUpdate}) {
  const isFromScratch = parallelDocuments.isFromScratch;
  if (Object.keys(metadata).length) return (
    <Col xs={5} className="scholium position-relative">
      <BrowseTools id={metadata._id} closable={!parallelDocuments.isFromScratch} />
      <DiscreeteDropdown>
        <InviteEditorsAction {...{backend, metadata, setLastUpdate}} />
        <BreakIntoPassagesAction {...{parallelDocuments, margin, backend, setLastUpdate}} />
        <DeleteDocumentAction {...{metadata, isFromScratch, backend, setLastUpdate}} />
      </DiscreeteDropdown>
      <Metadata editable={true} {...{backend, metadata, setLastUpdate}} />
      <Type editable={true} {...{backend, metadata}}/>
    </Col>
  );
}

export default OpenedDocuments;
