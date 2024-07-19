import { Card } from 'react-bootstrap';
import { useState } from 'react';
import ExistingDocument from './ExistingDocument';

function DocumentList({ userDocuments, relatedTo, setSelectedDocument, setShowDocumentList, setLastUpdate, backend }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDocuments = userDocuments.filter(document =>
    document.dc_title && document.dc_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
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
        <ExistingDocument
          key={document._id}
          document={document}
          relatedTo={relatedTo}
          setSelectedDocument={setSelectedDocument}
          setShowDocumentList={setShowDocumentList}
          setLastUpdate={setLastUpdate}
          backend={backend}
        />
      ))}
    </div>
  );
}

export default DocumentList;
