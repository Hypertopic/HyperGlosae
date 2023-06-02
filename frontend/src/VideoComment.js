import './VideoComment.css';

function VideoComment({ children }) {
  const timecodeRegex = /(\d{2}:\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}\.\d{3})/;
  if (timecodeRegex.test(children)) {
    return <p
      onClick={
        e => {
          e.preventDefault();
          e.stopPropagation();
          playVideoAt(children[0]);
        }
      }
      className="comment"
      title="Go to the video excerpt"
    >{children[0]}</p>;
  }
  function playVideoAt(timecode) {
    let [start, end] = timecode.split('-->');
    let [hour, min, sec] = start.split(/[:.]/);
    let startTime = Number(hour * 3600) + Number(min * 60) + Number(sec);
    [hour, min, sec] = end.split(/[:.]/);
    let endTime = Number(hour * 3600) + Number(min * 60) + Number(sec);
    let iframe = document.getElementsByTagName('iframe');
    if (iframe.length != 0) {
      let youTubeLink = new URL(iframe[0].src);
      let youTubeBaseLink = youTubeLink.origin + youTubeLink.pathname;
      let targetLink = `${youTubeBaseLink}?start=${startTime}&end=${endTime}&autoplay=1&mute=1`;
      iframe[0].src = targetLink;
    }
  }
}

export default VideoComment;