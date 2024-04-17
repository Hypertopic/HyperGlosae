import React, { useState } from 'react';

function Popup({ x, y, selectedText }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      <p>Selected Text: {selectedText}</p>
      {/* Add more content or components as needed */}
    </div>
  );
}

// function ReturnHighlightText() {
//   return (
//     <style>
//       .highlight {
//         background - color: yellow;
//       }
//     </style>
//   <p>This is some text. <span class="highlight">This part is highlighted.</span> This is some more text.</p>
//   )
// }

function SelectPopUp() {
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');

  const handleTextSelection = () => {
    const selected = window.getSelection().toString();
    if (selected) {
      const selection = window.getSelection().getRangeAt(0).getBoundingClientRect();
      setPopupPosition({ x: selection.x, y: selection.y });
      setSelectedText(selected);
    }
  };

  return (
    <div onMouseUp={handleTextSelection}>
      <button type="button">highlight</button>
      {selectedText && (
        <Popup x={popupPosition.x} y={popupPosition.y} selectedText={selectedText}/>
      )}
    </div>
  );
}

export default SelectPopUp;
