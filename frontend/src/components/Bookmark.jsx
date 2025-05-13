import { useState, useEffect, useCallback } from 'react';
import { BookmarkFill } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function Bookmark({backend, user, id}) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getBookmark = useCallback((id, user) =>
    backend.getView({view: 'bookmark', id: user, options: ['include_docs']})
      .then(rows => rows.find(row => row.doc.bookmark === id)),
  [backend]);

  useEffect(() => {
    if (user) {
      getBookmark(id, user)
        .then(bookmark => setIsBookmarked(!!bookmark))
        .catch(console.error);
    }
  }, [user, id, getBookmark]);

  const onBookmarkToggle = () => {
    if (!isBookmarked) {
      backend.putDocument({ _id: uuid(), editors: [user], bookmark: id })
        .then(() => setIsBookmarked(true))
        .catch(console.error);
    } else {
      getBookmark(id, user)
        .then(x => x.doc)
        .then(backend.deleteDocument)
        .then(() => setIsBookmarked(false))
        .catch(console.error);
    }
  };

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id="tooltip-bookmark">
          {isBookmarked
            ? 'Remove this document from your bookshelf'
            : 'Add this document to your bookshelf'}
        </Tooltip>
      }
    >
      <BookmarkFill
        className={`icon bookmark ${isBookmarked && 'bookmarked'}`}
        onClick={onBookmarkToggle}
        style={{ cursor: 'pointer' }}
      />
    </OverlayTrigger>
  );
}

export default Bookmark;
