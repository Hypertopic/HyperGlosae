import DiscreeteDropdown from './DiscreeteDropdown';

function CommentFragmentAction({selectedText, setSelectedText, setFragment}) {

  const handleClick = () => {
    setFragment(`[${selectedText}]\n`);
    setSelectedText();
  };

  return (
    <DiscreeteDropdown.Item onClick={handleClick}>
      Comment the selected text...
    </DiscreeteDropdown.Item>
  );
}

export default CommentFragmentAction;

