import DiscreeteDropdown from '../components/DiscreeteDropdown';

function BreakIntoPassagesAction({parallelDocuments, margin, backend, setLastUpdate}) {

  let disabled = true;
  let scholium;

  // disabled if margin has already rubrics
  if (!parallelDocuments.doesMarginHaveRubrics) {
    let scholia = parallelDocuments.passages[0].scholia.filter(x => x.isPartOf === margin);
    // disabled if different chunks
    let hasChunks = scholia.length > 1;
    if (!hasChunks) {
      scholium = scholia[0];
      // disabled if source has rubrics and margin is not empty
      disabled = parallelDocuments.doesSourceHaveRubrics && scholium.text !== '…' && !!scholium.text;
    }
  }

  const handleClick = () => {
    let text = scholium.text
      .split('\n')
      .map((x, i) => '{' + (i + 1) + '} ' + x)
      .join('');
    backend.getDocument(scholium.id)
      .then(x => backend.putDocument({...x, text}))
      .then(x => setLastUpdate(x.rev));
  };

  return (
    <DiscreeteDropdown.Item onClick={handleClick} {...{disabled}}>
      Break into numbered passages
    </DiscreeteDropdown.Item>
  );
}

export default BreakIntoPassagesAction;

