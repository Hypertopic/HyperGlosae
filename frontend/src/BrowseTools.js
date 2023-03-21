import { Link } from 'react-router-dom';
import { Bookmark, ChevronBarDown, ChevronExpand } from 'react-bootstrap-icons';

function BrowseTools({id, closable, openable}) {
  return(
    <>
      {closable &&
        <Link to="#" className="icon">
          <ChevronBarDown title="Close this document" />
        </Link>
      }
      {openable &&
        <Link to={`#${id}`} className="icon">
          <ChevronExpand title="Open this document" />
        </Link>
      }
      <Link to={`../${id}`} className="icon focus">
        <Bookmark title="Focus on this document" />
      </Link>
    </>
  );
}

export default BrowseTools;
