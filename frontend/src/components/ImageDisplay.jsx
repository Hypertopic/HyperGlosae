import { Trash } from 'react-bootstrap-icons';

function ImagesWithDelete({ id, images, setDeleteTarget, setShowDeleteModal }) {
  return (
    <>
      {images.map(({ src, alt }) => (
        <figure
          key={src + alt}
          className="has-trash-overlay"
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <img
            src={src}
            alt={alt}
            className="img-fluid rounded editable-image"
          />
          <button
            className="trash-overlay"
            type="button"
            aria-label={`Delete image ${alt || src}`}
            title={`Delete image ${alt || src}`}
            onClick={e => {
              e.stopPropagation();
              const internal = src.includes(`/${id}/`);
              const name = internal
                ? decodeURIComponent(src.split(`${id}/`)[1])
                : src;
              setDeleteTarget({ src, alt, internal, name });
              setShowDeleteModal(true);
            }}
          >
            <Trash />
          </button>
        </figure>
      ))}
    </>
  );
}

export default ImagesWithDelete;
