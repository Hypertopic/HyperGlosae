import { useState, useEffect, useContext } from 'react';
import { TagFill } from 'react-bootstrap-icons';
import { ListGroup, Form, InputGroup, Button } from 'react-bootstrap';
import { TypesContext } from './TypesContext.js';
import { v4 as uuidv4 } from 'uuid';

import '../styles/Metadata.css';
import '../styles/Type.css';

export function TypeBadge({ type, addClassName }) {
  const types = useContext(TypesContext);
  if (!type) return null;
  const typeSelected = types.find((t) => t.id === type);
  if (!typeSelected || !typeSelected.doc) return null;

  return (
    <span
      className={`typeBadge ${addClassName ?? ''}`}
      style={{ backgroundColor: typeSelected.doc.color }}
    >
      {typeSelected.doc.type_name}
    </span>
  );
}

function TypeList({ typeSelected, handleUpdate, addNewType, backend }) {
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newType, setNewType] = useState('');
  const [newColor, setNewColor] = useState('#FF5733');

  const fetchTypes = async () => {
    try {
      const response = await backend.getView({ view: 'types', options: ['include_docs'] });
      setTypes(response);
      console.log('Types récupérés:', response);
    } catch (error) {
      console.error('Erreur lors de la récupération des types:', error);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleAddNewType = () => {
    if (newType.trim()) {
      addNewType(newType, newColor)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout du type:', error);
        });

      setNewType('');
      setNewColor('#FF5733');
    }
  };

  const filteredTypes = types.filter(
    (type) =>
      type.doc &&
      type.doc.type_name &&
      type.doc.type_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h6 style={{ textAlign: 'left', marginBottom: '15px' }}>Select a type</h6>
      <Form.Control
        type="text"
        placeholder="Filter types..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '15px', padding: '10px', borderRadius: '8px' }}
      />

      <ListGroup style={{ textAlign: 'center', paddingTop: 0, paddingBottom: 20 }}>
        {filteredTypes.map((type, index) => (
          <div
            key={index}
            onClick={() => handleUpdate(type.id)}
            className="typeContainer"
            style={{ cursor: 'pointer' }}
          >
            <TypeBadge type={type.id} />
          </div>
        ))}
        {typeSelected && (
          <div
            key="remove-type"
            onClick={() => handleUpdate('')}
            style={{
              color: 'red',
              cursor: 'pointer',
              marginTop: '10px',
              textAlign: 'center'
            }}
          >
            Remove the current type
          </div>
        )}
      </ListGroup>

      <div style={{ marginTop: '20px' }}>
        <h6 style={{ textAlign: 'left', marginBottom: '10px' }}>Create a new type</h6>
        <InputGroup style={{ marginBottom: '10px' }}>
          <Form.Control
            type="text"
            placeholder="New type name"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="inputField"
          />
        </InputGroup>

        <InputGroup>
          <Form.Control
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            style={{ height: '40px', width: '40px', border: 'none', cursor: 'pointer' }}
          />
          <Button
            variant="success"
            onClick={handleAddNewType}
            className="addButton"
          >
            Add Type
          </Button>
        </InputGroup>
      </div>
    </>
  );
}

function Type({ metadata, editable, backend }) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [typeSelected, setTypeSelected] = useState(metadata.type);
  const [editedDocument, setEditedDocument] = useState(metadata);

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
    await backend.putDocument({ ...editedDocument, type }).catch(console.error);
  };

  const addNewType = async (newTypeName, newColor) => {
    const newId = uuidv4();
    const newTypeObject = {
      type_name: newTypeName,
      color: newColor,
    };

    try {
      const response = await backend.putDocument(newTypeObject, newId);
      console.log('Type ajouté avec succès:', response);
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du type:', error);
      throw new Error('L\'ajout du type a échoué. Veuillez réessayer.');
    }
  };

  return (
    <div style={{ paddingTop: 10, paddingBottom: 30 }}>
      <div style={{ paddingTop: 0, justifyContent: 'flex-end' }}>
        <TypeBadge addClassName="typeSelected" type={typeSelected} />
        {editable ? (
          <TagFill
            onClick={handleEdit}
            className="icon typeIcon"
            title="Apply a label..."
          />
        ) : null}
      </div>
      {beingEdited && (
        <TypeList
          typeSelected={typeSelected}
          handleUpdate={handleUpdate}
          addNewType={addNewType}
          backend={backend}
        />
      )}
    </div>
  );
}

export default Type;
