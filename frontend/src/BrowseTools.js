import { Link } from 'react-router-dom';
import { Bookmark, ChevronBarDown, ChevronExpand } from 'react-bootstrap-icons';
import { isPhoneSizedWindow } from './utils';

function BrowseTools({ id, closable, openable, collectionId }) {
  return (
    <>
      {closable &&
        <Link to="#" className="icon">
          <ChevronBarDown title="Close this document"/>
        </Link>
      }
      {openable &&
        <Link to={collectionId && isPhoneSizedWindow() ? `#/collection/${collectionId}/document/${id}` : `#${id}`}
          className="icon open">
          <ChevronExpand title="Open this document"/>
        </Link>
      }
      <Link to={collectionId && isPhoneSizedWindow() ? `../collection/${collectionId}/document/${id}` : `../${id}`}
        className="icon focus">
        <Bookmark title="Focus on this document"/>
      </Link>
    </>
  );
}

export default BrowseTools;
