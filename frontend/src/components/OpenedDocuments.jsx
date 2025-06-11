import { useState, useRef, useEffect } from 'react';
import '../styles/HistoryInfo.css';
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
import EditRawDocumentAction from '../menu-items/EditRawDocumentAction';
import Bookmark from './Bookmark';
import LicenseCompatibility from './LicenseCompatibility';
import { InfoCircle } from 'react-bootstrap-icons';

function OpenedDocuments({ id, margin, metadata, parallelDocuments, rawEditMode, setRawEditMode, backend, user, setLastUpdate }) {
  const marginMetadata = metadata.getDocument(margin);
  const marginLicense = marginMetadata?.dc_license;
  const sourceMetadata = metadata.focusedDocument;
  const xs = margin ? 12 : 7;
  const isComposite = parallelDocuments.doesSourceHaveInclusions;
  return (
    <Col className="lectern" {...{ xs }} >
      <Row className="runningHead">
        <RunningHeadSource {...{ id, metadata, parallelDocuments, backend, user }} />
        <RunningHeadMargin {...{ parallelDocuments, margin, setRawEditMode, backend, setLastUpdate }}
          metadata={marginMetadata}
        />
      </Row>
      {parallelDocuments.passages.map(({ rubric, source, scholia }, i) =>
        <Passage key={rubric || i}
          {...{ source, rubric, scholia, margin, sourceId: id, isComposite, rawEditMode, setRawEditMode, backend, setLastUpdate }}
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
            <LicenseCompatibility {...{ sourceMetadata, marginLicense }} />
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
    backend.getHistory(metadata._id).then(historyData => {
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
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    if (Math.abs(diffDay) >= 365) {
      return rtf.format(-Math.floor(diffDay / 365), 'year');
    } else if (Math.abs(diffDay) >= 30) {
      return rtf.format(-Math.floor(diffDay / 30), 'month');
    } else if (Math.abs(diffDay) >= 1) {
      return rtf.format(-diffDay, 'day');
    } else if (Math.abs(diffHour) >= 1) {
      return rtf.format(-diffHour, 'hour');
    } else if (Math.abs(diffMin) >= 1) {
      return rtf.format(-diffMin, 'minute');
    }
    return rtf.format(-diffSec, 'second');
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

function RunningHeadSource({ id, metadata, parallelDocuments, backend, user }) {
  metadata = metadata.focusedDocument;
  if (parallelDocuments.isFromScratch) return (
    <Col className="main" />
  );
  return (
    <Col className="main">
      <HistoryInfo metadata={metadata} backend={backend} />
      <Bookmark {...{ backend, user, id }} />
      <BrowseTools {...{ id }} editable={true} focusable={false} />
      <Metadata {...{ metadata }} />
      <TypeBadge type={metadata?.type} />
    </Col>
  );
}

function RunningHeadMargin({ metadata, parallelDocuments, margin, setRawEditMode, backend, setLastUpdate }) {
  const isFromScratch = parallelDocuments.isFromScratch;
  if (Object.keys(metadata).length) return (
    <Col xs={5} className="scholium position-relative">
      <BrowseTools id={metadata._id} closable={!parallelDocuments.isFromScratch} />
      <DiscreeteDropdown>
        <InviteEditorsAction {...{ backend, metadata, setLastUpdate }} />
        <BreakIntoPassagesAction {...{ parallelDocuments, margin, backend, setLastUpdate }} />
        <EditRawDocumentAction {...{ setRawEditMode }} />
        <DeleteDocumentAction {...{ metadata, isFromScratch, backend, setLastUpdate }} />
      </DiscreeteDropdown>
      <Metadata editable={true} {...{ backend, metadata, setLastUpdate }} />
      <Type editable={true} {...{ backend, metadata }} />
    </Col>
  );
}

export default OpenedDocuments;
