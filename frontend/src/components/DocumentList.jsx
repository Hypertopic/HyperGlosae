import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ExistingDocument from './ExistingDocument';

function DocumentList({ relatedTo, setSelectedDocument, setShowDocumentList, setLastUpdate, backend, user }) {
  const [userDocuments, setUserDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDocuments = userDocuments.filter(({dc_title}) =>
    dc_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    backend.refreshDocuments(setUserDocuments);
  }, [user, backend]);

  return (
    <>
      <Card className="h-100">
        <Card.Body>
          <input
            type="text"
            placeholder="Search documents"
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control"
          />
        </Card.Body>
      </Card>
      {filteredDocuments.map(document => (
        <ExistingDocument key={document._id}
          {...{document, relatedTo, setSelectedDocument, setShowDocumentList,
            setLastUpdate, backend}}
        />
      ))}
    </>
  );
}

export default DocumentList;