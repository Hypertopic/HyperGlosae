import './Metadata.css';
import './Type.css';

import { TagFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import hyperglosae from './hyperglosae';

// { [typeName: string ]: typeColor }
// type typeColor = primary | secondary | success | danger | warning | info | light | dark
const typesParams = {
  'interview': 'primary',
  'report': 'info',
  'document': 'warning'
};

export function TypeBadge({ type, addClassName }) {
  if (!type) return null;
  return <Badge pill bg={typesParams[type]} className={`typeBadge ${addClassName ?? ''}`}>
    {type}
  </Badge>;
}

function TypeList({ typeSelected, handleUpdate }) {
  return (
    <>
      <h6 style={{ textAlign: 'left' }}>Select a type</h6>
      <ListGroup style={{ textAlign: 'center', paddingTop: 0, paddingBottom: 20 }}>
        {Object.keys(typesParams).map((type, index) =>
          <ListGroup.Item action
            key={index}
            style={{ backgroundColor: type === typeSelected ? 'grey' : '' }}
            onClick={() => handleUpdate(type)}>
            <TypeBadge type={type} typesParams={typesParams}/>
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

function Type({ metadata, editable, backend }) {
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
    await backend.putDocument({ ...editedDocument, type });
  };

  return (
    <div style={{ paddingTop: 10, paddingBottom: 30 }}>
      <div style={{ paddingTop: 0, justifyContent: 'flex-end' }}>
        <TypeBadge addClassName="typeSelected" type={typeSelected}/>
        {editable ? <TagFill onClick={handleEdit} className="icon typeIcon" title="Edit type"/> : null}
      </div>
      {beingEdited ?
        <TypeList typeSelected={typeSelected} handleUpdate={handleUpdate}/>
        : null
      }
    </div>
  );
}

export default Type;
