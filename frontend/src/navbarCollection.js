import React, {useMemo} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavbarCollection ({trail, documentId}) {

  const position = useMemo(() => {
    if (trail.links && documentId) {
      let element = trail.links.find((item) => {
        return item.object === documentId;
      });
      return trail.links.indexOf(element);
    }
    return undefined;
  }, [trail.links, documentId]);

  const pastId = useMemo(() => {
    if (trail.links) {
      return (position) == 0 ? undefined : trail.links[position - 1].object;
    }
  }, [trail.links, position]);

  const nextId = useMemo(() => {
    if (trail.links) {
      return (position == trail.links.length - 1) ? undefined : trail.links[position + 1].object;
    }
  }, [trail.links, position]);

  const navigate = useNavigate();

  function handleClickBack () {
    navigate(`/collection/${trail._id}/document/${pastId}`);
  };

  function handleClickUp () {
    navigate(`/collection/${trail._id}/document/${nextId}`);
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
            Parcours: {position + 1}/{trail.links.length}
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