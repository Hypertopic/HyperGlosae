import { useContext } from 'react';
import { TypesContext } from './TypesContext.js';

function TypeBadge({ type, addClassName }) {
  const types = useContext(TypesContext);
  if (!type) return null;
  const typeSelected = types.find((t) => t.id === type);
  if (!typeSelected) return;
  return (
    <div
      style={{backgroundColor: typeSelected.doc.color}}
      className={`typeBadge ${addClassName ?? ''}`}
    >
      {typeSelected.doc.type_name}
    </div>
  );
}

export default TypeBadge;

