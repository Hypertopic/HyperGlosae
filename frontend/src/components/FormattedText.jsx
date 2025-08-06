import { MarkdownHooks } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import CroppedImage from './CroppedImage';
import VideoComment from './VideoComment';
import FragmentComment from './FragmentComment';

function FormattedText({children, setHighlightedText, selectable, setSelectedText}) {

  const handleMouseUp = () => {
    if (selectable) {
      let text = window.getSelection().toString();
      setSelectedText(text);
      setHighlightedText(text);
    }
  };

  return (<>
    <MarkdownHooks
      remarkPlugins={[remarkGfm, remarkDefinitionList, remarkUnwrapImages]}
      components={{
        img: (x) => embedVideo(x) || CroppedImage(x),
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
    </MarkdownHooks>
  </>);
}

function getId(text) {
  const regExp = /^.*(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]{11})/;
  const match = text.match(regExp);
  return match ? match[1] : null;
}

function embedVideo({src}) {
  const videoId = getId(src);
  if (videoId) {
    const embedLink = `https://www.youtube.com/embed/${videoId}`;
    return (
      <iframe width="80%" height="300" src={embedLink} frameBorder="0" allowFullScreen></iframe>
    );
  }
  return null;
}

export default FormattedText;
