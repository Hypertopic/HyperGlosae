import DiscreeteDropdown from './DiscreeteDropdown';

function PassageSourceMenu({selectedText, setSelectedText, setFragment}) {

  const handleClick = () => {
    setFragment(`[${selectedText}]\n`);
    setSelectedText();
  };

  return (
    <DiscreeteDropdown>
      <DiscreeteDropdown.Item onClick={handleClick}>
        Comment the selected text...
      </DiscreeteDropdown.Item>
    </DiscreeteDropdown>
  );
}

export default PassageSourceMenu;

