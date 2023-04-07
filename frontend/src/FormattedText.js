import ReactMarkdown from 'react-markdown';
import remarkUnwrapImages from 'remark-unwrap-images';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import CroppedImage from './CroppedImage';

function FormattedText({children}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkDefinitionList, remarkUnwrapImages]}
      components={{
        img: CroppedImage
      }}
      remarkRehypeOptions={{
        handlers: defListHastHandlers
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

export default FormattedText;
