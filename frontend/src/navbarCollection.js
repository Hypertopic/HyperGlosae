import React, {useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavbarCollection ({position, total, nextId, pastId, collectionId}) {

  const navigate = useNavigate();
  function handleClickBack () {
    navigate(`/collection/${collectionId}/document/${pastId}`);
  };

  function handleClickUp () {
    navigate(`/collection/${collectionId}/document/${nextId}`);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="d-flex justify-content-between">
          <button
            className={pastId ? 'btn btn-outline-light previous-document' : 'btn btn-outline-light disabled previous-document'}
            onClick={handleClickBack}
          >
            {'<-'}
          </button>
          <div className="text-warning">
            Parcours: {position}/{total}
          </div>
          <button
            className={nextId ? 'btn btn-outline-light next-document' : 'btn btn-outline-light disabled next-document'}
            onClick={handleClickUp}
          >
            {'->'}
          </button>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarCollection;