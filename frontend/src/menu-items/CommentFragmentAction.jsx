import Dropdown from 'react-bootstrap/Dropdown';

function CommentFragmentAction({selectedText, setSelectedText, setFragment, margin}) {

  const disabled = !selectedText || !margin;

  const handleClick = () => {
    setFragment(`[${selectedText}]\n`);
    setSelectedText();
  };

  return (
    <Dropdown.Item onClick={handleClick} {...{disabled}}>
      Comment the selected text...
    </Dropdown.Item>
  );
}

export default CommentFragmentAction;

