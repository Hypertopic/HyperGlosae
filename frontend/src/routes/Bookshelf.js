import '../styles/Bookshelf.css';

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import DocumentsCards from '../components/DocumentsCards';

function Bookshelf({backend, user}) {
  const [documents, setDocuments] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    if (user) {
      // User is logged in, fetch only bookmarked documents
      backend.getView({ view: 'bookmark', id: user, options: ['include_docs'] })
        .then(bookmarkedDocuments => {
          const bookmarkIds = new Set(bookmarkedDocuments.map(doc => doc.value));
          backend.refreshDocuments((allDocuments) => {
            const filteredDocuments = allDocuments.filter(doc => bookmarkIds.has(doc._id));
            setDocuments(filteredDocuments);
          });
        })
        .catch(error => {
          console.error('Error fetching bookmarks:', error);
        });
    } else {
      // No user is logged in, fetch all documents
      backend.refreshDocuments(setDocuments);
    }
  }, [lastUpdate, user]);

  return (
    <Container className="screen bookshelf">
      <DocumentsCards docs={documents} byRow={4} createOn={[]}
        {...{setLastUpdate, backend}}
      />
    </Container>
  );
}

export default Bookshelf;
