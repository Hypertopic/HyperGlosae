import '../styles/HistoryInfo.css';
import { useState, useRef, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
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
            <LicenseCompatibility {...{sourceMetadata, marginMetadata}} />
          </Col>
        </Row>
      )}
    </Col>
  );
}

function HistoryInfo({ metadata, backend }) {
  const [showAll, setShowAll] = useState(false);
  const infoRef = useRef(null);
  const [history, setHistory] = useState([]);
  const hasHistory = Array.isArray(history) && history.length > 0;

  // Fetch history once on mount or when metadata._id changes
  useEffect(() => {
    let isMounted = true;
    backend.getView({ view: 'history', id: metadata._id }).then(historyData => {
      let concatHistory = [];
      if (!Array.isArray(historyData)) return;
      historyData.forEach(entry => {
        if (entry.value && entry.value.history) {
          concatHistory = concatHistory.concat(entry.value.history);
        }
      });
      concatHistory = concatHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
      if (isMounted) setHistory(concatHistory);
    });
    return () => {
      isMounted = false;
    };
  }, [backend, metadata._id]);

  function getRelativeTime(dateString) {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  }

  // Filter modifications in the last 24h
  let modifications = [];
  if (hasHistory) {
    const lastUpdate = history[history.length - 1].date;
    const lastUpdateDate = new Date(lastUpdate);
    modifications = history
      .filter(entry => entry.action === 'modification')
      .filter(entry => {
        const entryDate = new Date(entry.date);
        return (lastUpdateDate - entryDate) < 24 * 60 * 60 * 1000;
      });
  }

  const displayCount = 5;
  const showSeeMore = modifications.length > displayCount && !showAll;
  const displayedModifications = showAll ? modifications : modifications.slice(modifications.length - displayCount, modifications.length);

  function handleMouseLeave() {
    setShowAll(false);
  }

  return (
    <div className="info-container">
      <div className="info-icon-container"
        ref={infoRef}
        onMouseLeave={handleMouseLeave}
      >
        <InfoCircle className="info-icon" />
        <div className="text-document-creation bg-light border rounded p-2 shadow">
          {hasHistory ? (
            <>
              {history[0].action === 'creation' ? (
                <span>Created by <b>{history[0].user}</b> on <b>{history[0].date.split('T')[0]}</b></span>
              ) : (
                <span>The creation details of this document are unavailable.</span>
              )}
              <hr className="separator" />
              {displayedModifications.length === 0 ? (
                <div>There is no available record of modifications to this document.</div>
              ) : (
                <div className="list-group">
                  <span>
                    Modified by :
                  </span>
                  <ul>
                    {displayedModifications.reverse().map((entry, idx) => (
                      <li key={idx}>
                        <b>{entry.user}</b> on <b>{entry.date.split('T')[0]}</b> at <b>{entry.date.split('T')[1].slice(0, 8)}</b> (
                        {getRelativeTime(entry.date)})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                {showSeeMore && (
                  <button
                    className="btn btn-link p-0 btn-see-more"
                    onClick={() => setShowAll(true)}
                  >
                    See more
                  </button>
                )}
              </div>
            </>
          ) : (
            'No historical record exists for this document.'
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
      <HistoryInfo metadata={metadata} backend={backend} />
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
