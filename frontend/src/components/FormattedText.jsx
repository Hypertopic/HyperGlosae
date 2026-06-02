import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import CroppedImage from './CroppedImage';
import VideoComment from './VideoComment';
import FragmentComment from './FragmentComment';
import VideoPlayer from './VideoPlayer';

function FormattedText({children, setHighlightedText, selectable, setSelectedText, showSegmentControls}) {

  const handleMouseUp = () => {
    if (selectable) {
      let text = window.getSelection().toString();
      setSelectedText(text);
      setHighlightedText(text);
    }
  };

  function getVideoId(src) {
    const regExp = /^.*(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]{11})/;
    const match = src.match(regExp);
    return match ? match[1] : null;
  }

  return (<>
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkDefinitionList, remarkUnwrapImages]}
      components={{
        img: (x) => {
          let videoId = getVideoId(x.src);
          if (videoId) {
            return <VideoPlayer videoId={videoId} showSegmentControls={showSegmentControls} />;
          }
          return CroppedImage(x);
        },
        p: (x) => VideoComment(x)
          || FragmentComment({...x, setHighlightedText})
          || <p onMouseUp={handleMouseUp}>{x.children}</p>,
        a: ({children, href}) => <a href={href}>{children}</a>
      }}
      remarkRehypeOptions={{
        handlers: defListHastHandlers
      }}
    >
      {children}
    </ReactMarkdown>
  </>);
}

export default FormattedText;