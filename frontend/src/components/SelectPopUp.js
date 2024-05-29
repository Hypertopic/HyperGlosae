import React, { useState } from 'react';

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

function SelectPopUp({selectedText, setCommentText, setBeingEditedComment}) {
  const [focus, setFocus] = useState(true);

  let handleClick = (e) => {
    //e.preventDefault();
    //e.stopPropagation();
    setCommentText(selectedText);
    setBeingEditedComment(true);
  };

  let handleOnBlur = (e) =>{
    setFocus(false);
  };

  return (
    <div style={{
      display: focus ? 'inherit' : 'none',
      position: 'relative',
      padding: '20px',
      border: '1px solid gray'
    }}>
      <button type="button" onMouseUp={handleClick} onBlur={handleOnBlur} >highlight</button>
    </div>
  );
}

export default SelectPopUp;