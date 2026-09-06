import { useState, useEffect, useCallback } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { v4 as uuid } from 'uuid';
import { NotificationManager } from 'react-notifications';

function ToggleBookmarkAction({id, user, backend}) {

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
        .then(() => {
          setIsBookmarked(true);
          NotificationManager.success('The document has been added to your bookshelf.', '', 2000);
        })
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
    <Dropdown.Item onClick={onBookmarkToggle}>
      {isBookmarked
        ? 'Unbookmark this document'
        : 'Bookmark this document'
      }
    </Dropdown.Item>
  );
}

export default ToggleBookmarkAction;

