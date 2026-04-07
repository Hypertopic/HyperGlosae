import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import CroppedImage from './CroppedImage';
import VideoComment from './VideoComment';
import FragmentComment from './FragmentComment';

// Extrait l'ID YouTube depuis un lien
function getId(text) {
  if (!text) return null;
  const regExp = /^.*(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]{11})/;
  const match = text.match(regExp);
  return match ? match[1] : null;
}

// Pour gérer les balises img qui pointent vers YouTube
function embedVideo({ src }) {
  const videoId = getId(src);
  if (videoId) {
    const embedLink = `https://www.youtube.com/embed/${videoId}`;
    return <iframe width="80%" height="300" src={embedLink} style={{ border: 0 }} allowFullScreen title="YouTube video" />;
  }
  return null;
}

function FormattedText({ children, setHighlightedText, selectable, setSelectedText }) {

  const handleMouseUp = () => {
    if (selectable) {
      let text = window.getSelection().toString();
      setSelectedText(text);
      setHighlightedText(text);
    }
  };

  // Nouveau rendu pour <a> : transforme les liens YouTube purs en iframe
  const renderLinkOrVideo = ({ children, href }) => {
    const videoId = getId(href);
    if (videoId) {
      const embedLink = `https://www.youtube.com/embed/${videoId}`;
      return <iframe width="80%" height="300" src={embedLink} style={{ border: 0 }} allowFullScreen title="YouTube video" />;
    }
    return <a href={href}>{children}</a>;
  };

  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDefinitionList, remarkUnwrapImages]}
        components={{
          img: (x) => embedVideo(x) || CroppedImage(x),
          p: (x) =>
            VideoComment(x) ||
                        FragmentComment({ ...x, setHighlightedText }) ||
                        <p onMouseUp={handleMouseUp}>{x.children}</p>,
          a: renderLinkOrVideo
        }}
        remarkRehypeOptions={{
          handlers: defListHastHandlers
        }}
      >
        {children}
      </ReactMarkdown>
    </>
  );
}

export default FormattedText;
