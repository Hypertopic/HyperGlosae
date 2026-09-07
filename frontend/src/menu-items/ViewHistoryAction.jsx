import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Dropdown from 'react-bootstrap/Dropdown';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import '../styles/HistoryInfo.css';

function ViewHistoryAction({ metadata, target, backend }) {

  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const hasHistory = Array.isArray(history) && history.length > 0;

  useEffect(() => {
    backend.getView({ view: 'history', id: metadata._id }).then(historyData => {
      let concatHistory = [];
      if (!Array.isArray(historyData)) return;
      historyData.forEach(entry => {
        if (entry.value && entry.value.history) {
          concatHistory = concatHistory.concat(entry.value.history);
        }
      });
      concatHistory = concatHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
      setHistory(concatHistory);
    });
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

  return (
    <>
      <Dropdown.Item onClick={() => setShow(true)}>
        View contribution history
      </Dropdown.Item>
      <Overlay target={target.current} placement="bottom" show={show}
        rootClose={true} onHide={() => setShow(false)}
      >
        <Popover>
          <Popover.Body>
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
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
}

export default ViewHistoryAction;

