import Dropdown from 'react-bootstrap/Dropdown';
import { enqueueSnackbar } from 'notistack';

function BreakIntoPassagesAction({parallelDocuments, margin, backend, setLastUpdate}) {

  let disabled = true;
  let scholium;
  let firstPassage = parallelDocuments.passages[0];

  // disabled if margin has already rubrics
  if (!parallelDocuments.doesMarginHaveRubrics && firstPassage) {
    let scholia = firstPassage.scholia.filter(x => x.isPartOf === margin);
    // disabled if different chunks
    let hasChunks = scholia.length > 1;
    if (!hasChunks) {
      scholium = scholia[0];
      // disabled if source has rubrics and margin is not empty
      disabled = !scholium
        || parallelDocuments.doesSourceHaveRubrics && scholium.text && scholium.text !== '…';
    }
  }

  const handleClick = () => {
    let text = scholium.text
      .split(/\n{2,}/)
      .map((x, i) => `{${i + 1}} ${x}`)
      .join('\n\n');
    backend.getDocument(scholium.id)
      .then(x => backend.putDocument({...x, text}))
      .then(x => {
        setLastUpdate(x.rev);
        enqueueSnackbar('The text has been successfully split into passages.', {variant: 'success'});
      });
  };

  return (
    <Dropdown.Item onClick={handleClick} {...{disabled}}>
      Break into numbered passages
    </Dropdown.Item>
  );
}

export default BreakIntoPassagesAction;

