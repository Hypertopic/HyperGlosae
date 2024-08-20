function SelectPopUp({selectedText, setSelectedText, setFragment}) {

  let handleClick = () => {
    setFragment(`[${selectedText}]\n`);
    setSelectedText();
  };

  if (selectedText) return (
    <div style={{
      position: 'relative',
      padding: '20px',
      border: '1px solid gray'
    }}>
      <button type="button" className="create-fragment" onMouseUp={handleClick}>highlight</button>
    </div>
  );
}

export default SelectPopUp;
