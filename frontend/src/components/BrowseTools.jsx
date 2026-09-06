import { Link } from 'react-router';
import { Bookmark, ChevronBarDown, ChevronExpand } from 'react-bootstrap-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function BrowseTools({id, closable, openable, focusable = true}) {
  return (
    <>
      {closable &&
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-close">Close this document</Tooltip>}
        >
          <Link to="#" className="icon close">
            <ChevronBarDown />
          </Link>
        </OverlayTrigger>
      }

      {openable &&
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-open">Open this document</Tooltip>}
        >
          <Link to={`#${id}`} className="icon open">
            <ChevronExpand />
          </Link>
        </OverlayTrigger>
      }

      {focusable &&
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-focus">Focus on this document</Tooltip>}
        >
          <Link to={`../${id}`} className="icon focus">
            <Bookmark />
          </Link>
        </OverlayTrigger>
      }
    </>
  );
}

export default BrowseTools;
