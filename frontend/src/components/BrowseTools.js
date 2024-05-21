import { Link } from 'react-router-dom';
import { Bookmark, ChevronBarDown, ChevronExpand, PencilSquare} from 'react-bootstrap-icons';

function BrowseTools({id, closable, openable, editable, focusable = true}) {
  return (
    <>
      {editable &&
        <Link to={`../blank#${id}`} className="icon edit">
          <PencilSquare title="Edit this document" />
        </Link>
      }
      {closable &&
        <Link to="#" className="icon">
          <ChevronBarDown title="Close this document" />
        </Link>
      }
      {openable &&
        <Link to={`#${id}`} className="icon open">
          <ChevronExpand title="Open this document" />
        </Link>
      }
      {focusable &&
        <Link to={`../${id}`} className="icon focus">
          <Bookmark title="Focus on this document" />
        </Link>
      }
    </>
  );
}

export default BrowseTools;
