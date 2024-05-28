import ReactMarkdown from 'react-markdown';
import remarkUnwrapImages from 'remark-unwrap-images';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import CroppedImage from './CroppedImage';
import VideoComment from './VideoComment';
import TimecodeBuilder from './TimecodeBuilder';
import YouTube from 'react-youtube';
import { useState } from 'react';

function FormattedText({children, addComment}) {

  return (
    <ReactMarkdown
      remarkPlugins={[remarkDefinitionList, remarkUnwrapImages]}
      components={{
        img: (x) => embedVideo({...x, addComment}) || CroppedImage(x),
        p: (x) => VideoComment(x) || <p>{x.children}</p>,
        a: ({children, href}) => <a href={href}>{children}</a>
      }}
      remarkRehypeOptions={{
        handlers: defListHastHandlers
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

function getId(text) {
  const regExp = /^.*(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]{11})/;
  const match = text.match(regExp);
  return match ? match[1] : null;
}

function embedVideo({src, addComment}) {
  const videoId = getId(src);
  const [player, setPlayer] = useState(null);

  let resetCount = 0;

  if (videoId) {

    const opts = {
      height: '300',
      width: '80%',
      playerVars: {
        autoplay: 0,
        allowFullScreen: 1
      },
    };

    let onPlayerReady = (event) => {
      if (event.target.g) {
        if (resetCount == 1) {
          setPlayer(event.target);
        }
        resetCount++;
      }
    };

    return (
      <div key={videoId} >
        <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady}/>
        <TimecodeBuilder player={player} addComment={addComment}></TimecodeBuilder>
      </div>
    );
  }
  return null;
}

export default FormattedText;
