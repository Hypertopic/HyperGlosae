import { useRef } from 'react';

import DiscreeteDropdown from './DiscreeteDropdown';

function PictureUploadAction ({ id, backend, handleImageUrl }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) backend.putAttachment(id, file, (response) => {
      handleImageUrl(`![<IMAGE DESCRIPTION>](${response.url})`);
    });
  };

  return (
    <>
      <DiscreeteDropdown.Item onClick={handleClick}>
        Add a picture...
      </DiscreeteDropdown.Item>
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

export default PictureUploadAction;
