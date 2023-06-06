import { useEffect } from 'react';
import FormattedText from './FormattedText';

function DocumentSources({children}) {
  return (
    <div>
      {children.map((source, index) =>
        <div key={index}>
          <FormattedText>
            {source}
          </FormattedText>
        </div>
      )}
    </div>
  );
}

export default DocumentSources;