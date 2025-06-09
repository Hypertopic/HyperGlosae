import '../styles/CreationInfo.css';
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
import DeleteReferenceToDocumentAction from '../menu-items/DeleteReferenceToDocumentAction';
import EditRawDocumentAction from '../menu-items/EditRawDocumentAction';
import Bookmark from './Bookmark';
import LicenseCompatibility from './LicenseCompatibility';
import { InfoCircle } from 'react-bootstrap-icons';

function OpenedDocuments({id, margin, metadata, parallelDocuments, rawEditMode, setRawEditMode, backend, user, setLastUpdate, content}) {
  const marginMetadata = metadata.getDocument(margin);
  const marginLicense = marginMetadata?.dc_license;
  const sourceMetadata = metadata.focusedDocument;
  const xs = margin ? 12 : 7;
  const isComposite = parallelDocuments.doesSourceHaveInclusions;
  return (
    <Col className="lectern" {...{xs}} >
      <Row className ="runningHead">
        <RunningHeadSource {...{id, metadata, parallelDocuments, backend, user}} />
        <RunningHeadMargin {...{id, parallelDocuments, margin, setRawEditMode, backend, setLastUpdate, content}}
          metadata={marginMetadata}
        />
      </Row>
      {parallelDocuments.passages.map(({rubric, source, scholia}, i) =>
        <Passage key={rubric || i}
          {...{source, rubric, scholia, margin, sourceId: id, isComposite, rawEditMode, setRawEditMode, backend, setLastUpdate}}
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

function CreationInfo({ metadata }) {
  const hasHistory = Array.isArray(metadata?.history) && metadata.history.length > 0;
  return (
    <div className="info-container">
      <div className="info-icon-container">
        <InfoCircle className="info-icon" />
        <div className="text-document-creation bg-light border rounded p-2 shadow">
          {hasHistory ? (
            <>
              Created by <b>{metadata.history[0].user}</b> on <b>{metadata.history[0].date.split('T')[0]}</b>
            </>
          ) : (
            'No information about the creator and creation date of this document'
          )}
        </div>
      </div>
    </div>
  );
}

function RunningHeadSource({id, metadata, parallelDocuments, backend, user}) {
  metadata = metadata.focusedDocument;
  if (parallelDocuments.isFromScratch) return (
    <Col className="main" />
  );
  return (
    <Col className="main">
      <CreationInfo metadata={metadata} />
      <Bookmark {...{backend, user, id}} />
      <BrowseTools {...{id}} editable={true} focusable={false} />
      <Metadata {...{metadata}} />
      <TypeBadge type={metadata?.type} />
    </Col>
  );
}

function RunningHeadMargin({id, metadata, parallelDocuments, margin, setRawEditMode, backend, setLastUpdate, content}) {
  const isFromScratch = parallelDocuments.isFromScratch;
  if (Object.keys(metadata).length) return (
    <Col xs={5} className="scholium position-relative">
      <BrowseTools id={metadata._id} closable={!parallelDocuments.isFromScratch} />
      <DiscreeteDropdown>
        <InviteEditorsAction {...{backend, metadata, setLastUpdate}} />
        <BreakIntoPassagesAction {...{parallelDocuments, margin, backend, setLastUpdate}} />
        <EditRawDocumentAction {...{setRawEditMode}} />
        <DeleteDocumentAction {...{metadata, isFromScratch, backend, setLastUpdate}} />
        <DeleteReferenceToDocumentAction {...{id, margin, backend, metadata, content, setLastUpdate}} />
      </DiscreeteDropdown>
      <Metadata editable={true} {...{backend, metadata, setLastUpdate}} />
      <Type editable={true} {...{backend, metadata}}/>
    </Col>
  );
}

export default OpenedDocuments;
