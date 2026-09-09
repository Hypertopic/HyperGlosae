import { useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BrowseTools from './BrowseTools';
import Metadata from './Metadata';
import Type from './Type';
import TypeBadge from './TypeBadge';
import Passage from './Passage';
import License from './License';
import VisibleDropdown from './VisibleDropdown';
import InviteEditorsAction from '../menu-items/InviteEditorsAction';
import BreakIntoPassagesAction from '../menu-items/BreakIntoPassagesAction';
import DeleteDocumentAction from '../menu-items/DeleteDocumentAction';
import DeleteReferenceToDocumentAction from '../menu-items/DeleteReferenceToDocumentAction';
import EditRawDocumentAction from '../menu-items/EditRawDocumentAction';
import ToggleBookmarkAction from '../menu-items/ToggleBookmarkAction';
import EditDocumentAction from '../menu-items/EditDocumentAction';
import ViewHistoryAction from '../menu-items/ViewHistoryAction';
import LicenseCompatibility from './LicenseCompatibility';
import { BookmarkFill } from 'react-bootstrap-icons';

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
          {...{source, metadata, rubric, scholia, margin, sourceId: id, isComposite, rawEditMode, setRawEditMode, backend, setLastUpdate, user }}
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
            <LicenseCompatibility {...{sourceMetadata, marginMetadata}} />
          </Col>
        </Row>
      )}
    </Col>
  );
}

function RunningHeadSource({id, metadata, parallelDocuments, backend, user}) {
  const target = useRef(null);
  metadata = metadata.focusedDocument;
  if (parallelDocuments.isFromScratch) return (
    <Col className="main" />
  );
  return (
    <Col className="main position-relative" ref={target}>
      <VisibleDropdown>
        <ToggleBookmarkAction {...{id, backend, user}}/>
        <EditDocumentAction {...{id}} />
        <ViewHistoryAction {...{metadata, target, backend}} />
      </VisibleDropdown>
      <div className="headerBox">
        <BookmarkFill className="icon" />
        <Metadata {...{metadata}} />
      </div>
      <TypeBadge type={metadata?.type} />
    </Col>
  );
}

function RunningHeadMargin({id, metadata, parallelDocuments, margin, setRawEditMode, backend, setLastUpdate, content}) {
  const isFromScratch = parallelDocuments.isFromScratch;
  if (Object.keys(metadata).length) return (
    <Col xs={5} className="scholium position-relative">
      <VisibleDropdown>
        <InviteEditorsAction {...{backend, metadata, setLastUpdate}} />
        <BreakIntoPassagesAction {...{parallelDocuments, margin, backend, setLastUpdate}} />
        <EditRawDocumentAction {...{setRawEditMode}} />
        <DeleteDocumentAction {...{metadata, isFromScratch, backend, setLastUpdate}} />
        <DeleteReferenceToDocumentAction {...{id, margin, backend, metadata, content, setLastUpdate}} />
      </VisibleDropdown>
      <div className="headerBox">
        <BrowseTools id={metadata._id} closable={!parallelDocuments.isFromScratch} />
        <Metadata editable={true} {...{backend, metadata, setLastUpdate}} />
      </div>
      <Type {...{backend, metadata}}/>
    </Col>
  );
}

export default OpenedDocuments;
