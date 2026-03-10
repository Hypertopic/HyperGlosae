import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import CroppedImage from './CroppedImage';
import VideoComment from './VideoComment';
import FragmentComment from './FragmentComment';

function FormattedText({children, setHighlightedText, selectable, setSelectedText}) {

  const handleMouseUp = () => {
    if (selectable) {
      const selection = window.getSelection();
      let plainText = selection.toString();
      if (plainText.trim()) {
        const markdownText = extractMarkdownFromSelection(selection);
        setSelectedText(markdownText);
        setHighlightedText(plainText);
      }
    }
  };

  return (
    <div onMouseUp={handleMouseUp}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDefinitionList, remarkUnwrapImages]}
        components={{
          img: (x) => embedVideo(x) || CroppedImage(x),
          p: (x) => VideoComment(x)
            || FragmentComment({...x, setHighlightedText})
            || <p>{x.children}</p>,
          a: ({children, href}) => <a href={href}>{children}</a>
        }}
        remarkRehypeOptions={{
          handlers: defListHastHandlers
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

function extractMarkdownFromSelection(selection) {
  if (selection.rangeCount === 0) return selection.toString();
  return processNode(selection.getRangeAt(0).cloneContents());
}

function getMarkdownMarkers(element) {
  if (!element.tagName) return null;
  const tag = element.tagName;
  if (tag === 'EM' || tag === 'I') return { open: '*', close: '*' };
  if (tag === 'STRONG' || tag === 'B') return { open: '**', close: '**' };
  if (tag === 'CODE') return { open: '`', close: '`' };
  if (tag === 'DEL' || tag === 'S') return { open: '~~', close: '~~' };
  return null;
}

function processNode(node) {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent;

  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE) {
    const markers = node.nodeType === Node.ELEMENT_NODE ? getMarkdownMarkers(node) : null;

    let content = '';
    for (const child of node.childNodes) {
      content += processNode(child);
    }

    if (markers) {
      const trimmedContent = content.trim();
      const leadingSpaces = content.match(/^\s*/)[0];
      const trailingSpaces = content.match(/\s*$/)[0];
      return leadingSpaces + markers.open + trimmedContent + markers.close + trailingSpaces;
    }
    return content;
  }

  return '';
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
