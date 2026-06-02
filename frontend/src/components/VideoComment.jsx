import '../styles/VideoComment.css';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function VideoComment({ children }) {
  children = (children instanceof Array) ? children : [children];
  const timecodeRegex = /(\d{2}:\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}\.\d{3})/;
  if (timecodeRegex.test(children)) return (
    <OverlayTrigger overlay={<Tooltip>Play the video fragment</Tooltip>} >
      <p
        onClick={
          e => {
            e.preventDefault();
            e.stopPropagation();
            playVideoAt(children[0]);
          }
        }
        className="videoComment"
      >
        {children[0].replace(/ @\S+$/, '')}
      </p>
    </OverlayTrigger>
  );

  function playVideoAt(timecodeString) {
    let videoIdMatch = timecodeString.match(/@(\S+)/);
    let targetVideoId = videoIdMatch ? videoIdMatch[1] : null;

    let [start, end] = timecodeString.split('-->');
    let [hour, min, sec] = start.split(/[:.]/);
    let startTime = Number(hour * 3600) + Number(min * 60) + Number(sec);
    [hour, min, sec] = end.split(/[:.]/);
    let endTime = Number(hour * 3600) + Number(min * 60) + Number(sec);

    let iframes = document.getElementsByTagName('iframe');
    let iframe;

    if (targetVideoId) {
      iframe = Array.from(iframes).find(
        f => f.getAttribute('data-video-id') === targetVideoId
      );
    }
    if (!iframe && iframes.length !== 0) {
      iframe = iframes[0];
    }

    if (iframe) {
      let videoIdForUrl = targetVideoId || new URL(iframe.src).pathname.split('/').pop();
      let targetLink = `https://www.youtube.com/embed/${videoIdForUrl}?start=${startTime}&end=${endTime}&autoplay=1&mute=1`;
      iframe.src = targetLink;
    }
  }
}

export default VideoComment;