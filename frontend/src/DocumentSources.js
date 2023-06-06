import { useEffect } from 'react';
import FormattedText from './FormattedText';

function DocumentSources({children}) {
  let sourcesTab = children.split('\n\n');
  sourcesTab.shift();

  return (
    <div>
      {sourcesTab.map((source, index) =>
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