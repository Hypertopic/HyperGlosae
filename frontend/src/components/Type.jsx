import '../styles/Metadata.css';
import '../styles/Type.css';

import { TagFill } from 'react-bootstrap-icons';
import { useState, useContext } from 'react';
import { Modal, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TypesContext } from './TypesContext.js';
import TypeBadge from './TypeBadge';

function TypeList({ typeSelected, handleUpdate }) {
  const types = useContext(TypesContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTypes = types.filter(type =>
    type.doc.type_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <h6 style={{ textAlign: 'left' }}>Select a type</h6>
      <input
        type="text"
        id="searchType"
        placeholder="Filter types..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
      />
      <ListGroup style={{ textAlign: 'center', paddingTop: 0, paddingBottom: 20 }}>
        {filteredTypes.map((type, index) =>
          <ListGroup.Item action
            key={index}
            style={{ backgroundColor: type === typeSelected ? 'grey' : '' }}
            onClick={() => handleUpdate(type.id)}>
            <TypeBadge type={type.id}/>
          </ListGroup.Item>
        )}
        {typeSelected ?
          <ListGroup.Item action
            key={'remove type'}
            style={{ color: 'red' }}
            onClick={() => handleUpdate('')}>
            Remove the current type
          </ListGroup.Item>
          : null}
      </ListGroup>
    </>
  );
}

function Type({ metadata, backend }) {
  const [ beingEdited, setBeingEdited ] = useState(false);
  const [ typeSelected, setTypeSelected ] = useState(metadata.type);
  const [ editedDocument, setEditedDocument ] = useState(metadata);

  const handleEdit = () => {
    setBeingEdited(!beingEdited);
    backend.getDocument(metadata._id)
      .then((x) => {
        setEditedDocument(x);
        setTypeSelected(x.type);
      });
  };

  const handleUpdate = async (type) => {
    setTypeSelected(type);
    setBeingEdited(false);
    await backend.putDocument({ ...editedDocument, type })
      .catch(console.error);
  };

  return (
    <div style={{ paddingTop: 10, paddingBottom: 30 }}>
      <div style={{ paddingTop: 0, justifyContent: 'flex-end' }}>
        <TypeBadge addClassName="typeSelected" type={typeSelected}/>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-apply-label">Apply a label...</Tooltip>}
        >
          <TagFill
            onClick={handleEdit}
            className="icon typeIcon always-visible"
          />
        </OverlayTrigger>
      </div>

      <Modal show={beingEdited} onHide={() => setBeingEdited(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Set document type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TypeList typeSelected={typeSelected} handleUpdate={handleUpdate}/>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Type;
