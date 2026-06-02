import { useState, useEffect, useRef, useContext } from 'react';
import { SegmentContext } from './SegmentContext';

let apiLoaded = false;
let apiCallbacks = [];

function ensureYouTubeAPI() {
  if (window.YT && window.YT.Player) {
    apiLoaded = true;
    return;
  }
  if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) return;
  let script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(script);
  window.onYouTubeIframeAPIReady = () => {
    apiLoaded = true;
    apiCallbacks.forEach(cb => cb());
    apiCallbacks = [];
  };
}

function onAPIReady(cb) {
  if (apiLoaded) {
    cb();
  } else {
    apiCallbacks.push(cb);
  }
}

function formatTimecode(seconds) {
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor(seconds % 60);
  let ms = Math.round((seconds % 1) * 1000);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

function VideoPlayer({ videoId, showSegmentControls }) {
  let containerRef = useRef(null);
  let playerRef = useRef(null);
  let [ready, setReady] = useState(false);
  let [state, setState] = useState('idle');
  let [startTimecode, setStartTimecode] = useState(null);
  let { showSegmentButton, setSegmentTimecode } = useContext(SegmentContext);

  useEffect(() => {
    let mounted = true;
    let container = containerRef.current;

    let playerDiv = document.createElement('div');
    container.appendChild(playerDiv);

    ensureYouTubeAPI();
    onAPIReady(() => {
      if (!mounted) return;
      playerRef.current = new window.YT.Player(playerDiv, {
        videoId,
        width: '100%',
        height: '300',
        events: {
          onReady: () => {
            if (!mounted) return;
            let iframe = playerRef.current.getIframe();
            iframe.setAttribute('data-video-id', videoId);
            setReady(true);
          }
        }
      });
    });

    return () => {
      mounted = false;
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      setReady(false);
    };
  }, [videoId]);

  let handleClick = () => {
    if (!ready || !playerRef.current) return;
    let current = formatTimecode(playerRef.current.getCurrentTime());

    if (state === 'idle') {
      setStartTimecode(current);
      setState('start_captured');
    } else {
      setSegmentTimecode(`${startTimecode} --> ${current} @${videoId}`);
      setState('idle');
      setStartTimecode(null);
    }
  };

  let handleCancel = () => {
    setState('idle');
    setStartTimecode(null);
  };

  let shouldShowButton = showSegmentButton && showSegmentControls;

  return (
    <div className="video-player-container">
      <div ref={containerRef}/>
      {shouldShowButton && (
        <div className="segment-selector justify-content-end">
          <button
            className={`btn btn-sm ${state === 'idle' ? 'btn-outline-danger' : 'btn-warning'}`}
            onClick={handleClick}
            disabled={!ready}
          >
            {!ready
              ? 'Loading the player…'
              : state === 'idle'
                ? 'Define segment start'
                : `Define segment end (start: ${startTimecode})`
            }
          </button>
          {state === 'start_captured' && (
            <button
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;