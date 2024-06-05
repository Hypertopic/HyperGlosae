import { Dropdown } from 'react-bootstrap';
import React, { useRef } from 'react';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

function PassageMarginMenu ({ id, backend, handleImageUrl }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) backend.putAttachment(id, file, (response) => {
      handleImageUrl(`![${file.name}](${response.url})`);
    });
  };

  return (
    <>
      <Dropdown title="Block actions...">
        <Dropdown.Toggle as={BlockMenuButton}/>
        <Dropdown.Menu id="block-actions">
          <Dropdown.Item onClick={handleClick}>Add an image</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <input
        id="image-input"
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}

const BlockMenuButton = React.forwardRef(({ children, onClick }, ref) => (
  <ThreeDotsVertical
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    ref={ref} class="editable-button">
    {children}
  </ThreeDotsVertical>
));

export default PassageMarginMenu;
