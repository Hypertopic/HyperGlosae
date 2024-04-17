import ReactMarkdown from 'react-markdown';
import remarkUnwrapImages from 'remark-unwrap-images';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import CroppedImage from './CroppedImage';
import VideoComment from './VideoComment';
import SelectPopUp from './SelectPopUp';
import {useState} from 'react';

function FormattedText({children}) {

  const [selectedText, setSelectedText] = useState('');
  return (
    <div>{selectedText && <SelectPopUp selectedText={selectedText} />}
      <ReactMarkdown
        remarkPlugins={[remarkDefinitionList, remarkUnwrapImages]}
        components={{
          img: (x) => embedVideo(x) || CroppedImage(x),
          p: (x) => VideoComment(x) || (
            <p onMouseUp={() => setSelectedText(window.getSelection().toString())}>{x.children}</p>
          ),
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
