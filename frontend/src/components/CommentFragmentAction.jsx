import DiscreeteDropdown from './DiscreeteDropdown';

function CommentFragmentAction({selectedText, setSelectedText, setFragment, margin}) {

  const disabled = !selectedText || !margin;

  const handleClick = () => {
    setFragment(`[${selectedText}]\n`);
    setSelectedText();
  };

  return (
    <DiscreeteDropdown.Item onClick={handleClick} {...{disabled}}>
      Comment the selected text...
    </DiscreeteDropdown.Item>
  );
}

export default CommentFragmentAction;

