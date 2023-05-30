import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Bookmark, ChevronBarDown, ChevronExpand } from 'react-bootstrap-icons';

function BrowseTools({id, closable, openable, collectionId}) {

  const windowWidth = useRef(window.innerWidth);
  return (
    <>
      {closable &&
        <Link to="#" className="icon">
          <ChevronBarDown title="Close this document" />
        </Link>
      }
      {openable &&
        <Link to={collectionId && windowWidth.current < 820 ? `#/collection/${collectionId}/document/${id}` : `#${id}`} className="icon open">
          <ChevronExpand title="Open this document" />
        </Link>
      }
      <Link to={collectionId && windowWidth.current < 820 ? `../collection/${collectionId}/document/${id}` : `../${id}`} className="icon focus">
        <Bookmark title="Focus on this document" />
      </Link>
    </>
  );
}

export default BrowseTools;
