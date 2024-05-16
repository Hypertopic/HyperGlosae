import '../styles/Bookshelf.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import DocumentsCards from '../components/DocumentsCards';

function Bookshelf({backend, user}) {
  const [documents, setDocuments] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();
  const [page, setPage] = useState(0);
  const limit = 35; // Items per page

  useEffect(() => {
    backend.refreshDocuments(setDocuments, limit, page * limit);
  }, [lastUpdate, user, page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return (
    <Container className="screen bookshelf">
      <DocumentsCards docs={documents} byRow={4} createOn={[]}
        {...{setLastUpdate, backend}}
      />
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </button>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>
    </Container>
  );
}

export default Bookshelf;
