import { useRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { enqueueSnackbar } from 'notistack';

function PictureUploadAction({ id, backend, handleImageUrl }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      enqueueSnackbar('Please choose an image file (png,jpg,jpeg...).', {variant: 'warning'});
      return;
    }

    backend.putAttachment(id, file, (response) => {
      handleImageUrl(`![<IMAGE DESCRIPTION>](${response.url})`);
    });
  };

  return (
    <>
      <Dropdown.Item onClick={handleClick}>
        Add a picture...
      </Dropdown.Item>
      <input
        id="image-input"
        type="file"
        accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}

export default PictureUploadAction;
