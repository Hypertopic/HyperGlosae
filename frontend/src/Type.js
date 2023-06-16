import './Metadata.css';
import './Type.css';

import {TagFill} from 'react-bootstrap-icons';
import {useContext, useState} from 'react';
import {ListGroup} from 'react-bootstrap';
import {TypesContext} from './DocumentsCards';

export function TypeBadge({ type, addClassName }) {
  if (!type) return null;
  const types = useContext(TypesContext);
  const typeSelected = types.find((t) => t.id === type);
  if (!typeSelected) return;
  return <div style={{backgroundColor: typeSelected.doc.color}} className={`typeBadge ${addClassName ?? ''}`}>
    {typeSelected.doc.type_name.replace('/', '/\u200B')}
  </div>;
}

function TypeList({ typeSelected, handleUpdate }) {
  const types = useContext(TypesContext);
  return (
    <>
      <h6 style={{textAlign: 'left'}}>Select a type</h6>
      <ListGroup style={{textAlign: 'center', paddingTop: 0, paddingBottom: 20}}>
        {types.map((type, index) =>
          <ListGroup.Item action key={index} style={{backgroundColor: type === typeSelected ? 'grey' : ''}} onClick={() => handleUpdate(type.id)}>
            <TypeBadge type={type.id}/>
          </ListGroup.Item>
        )}
        {typeSelected ?
          <ListGroup.Item action key={'remove type'} style={{color: 'red'}} onClick={() => handleUpdate('')}>
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
