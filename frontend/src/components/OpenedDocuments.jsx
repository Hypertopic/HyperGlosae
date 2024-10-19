import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BrowseTools from './BrowseTools';
import Metadata from './Metadata';
import Type, { TypeBadge } from './Type';
import Passage from './Passage';
import License from './License';
import DiscreeteDropdown from './DiscreeteDropdown';
import InviteEditorsAction from './InviteEditorsAction';
import BreakIntoPassagesAction from './BreakIntoPassagesAction';
import DeleteDocumentAction from './DeleteDocumentAction';
import Bookmark from './Bookmark';
import LicenseCompatibility from './LicenseCompatibility';

function OpenedDocuments({id, margin, metadata, parallelDocuments, hasSources, backend, setLastUpdate}) {
  const marginMetadata = metadata.getDocument(margin);
  const marginLicense = marginMetadata?.dc_license;
  const sourceMetadata = metadata.focusedDocument;
  return (
    <Col className="lectern">
      <Row className ="runningHead">
        <RunningHeadSource {...{id, metadata, hasSources, backend}} />
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
        {margin && (
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

function RunningHeadSource({id, metadata, hasSources, backend}) {
  metadata = metadata.focusedDocument;
  return (
    <Col className="main">
      <Bookmark {...{backend, id}} />
      <BrowseTools {...{id}} editable={!hasSources} focusable={false} />
      <Metadata {...{metadata}} />
      <TypeBadge type={metadata?.type} />
    </Col>
  );
}

function RunningHeadMargin({metadata, parallelDocuments, margin, backend, setLastUpdate}) {
  if (Object.keys(metadata).length) return (
    <Col xs={5} className="scholium position-relative">
      <BrowseTools id={metadata._id} closable={true} />
      <DiscreeteDropdown>
        <InviteEditorsAction {...{backend, metadata, setLastUpdate}} />
        <BreakIntoPassagesAction {...{parallelDocuments, margin, backend, setLastUpdate}} />
        <DeleteDocumentAction {...{metadata, backend, setLastUpdate}} />
      </DiscreeteDropdown>
      <Metadata editable={true} {...{backend, metadata, setLastUpdate}} />
      <Type editable={true} {...{backend, metadata}}/>
    </Col>
  );
}

export default OpenedDocuments;
