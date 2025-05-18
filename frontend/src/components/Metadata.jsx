import '../styles/Metadata.css';

import { useEffect, useState } from 'react';
import { parse, stringify } from 'yaml';

function Metadata({metadata = {}, editable, backend, setLastUpdate}) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedDocument, setEditedDocument] = useState(metadata);

  useEffect(() => {
    setEditedDocument(metadata);
  }, [metadata]);

  let handleClick = () => {
    setBeingEdited(true);
    backend.getDocument(metadata._id)
      .then((x) => {
        setEditedDocument(x);
      });
  };

  let handleBlur = () => {
    setBeingEdited(false);
    let updatedDocument = {
      ...Object.fromEntries(
        Object.entries(editedDocument).filter(([key, _]) => !key.startsWith('dc_'))
      ),
      ...parse(event.target.value)
    };
    setEditedDocument(updatedDocument);
    backend.putDocument(updatedDocument)
      .then(x => setLastUpdate(x.rev))
      .catch(console.error);
  };

  let editedMetadata = Object.fromEntries(
    Object.entries(editedDocument)
      .filter(([key, _]) => key.startsWith('dc_'))
  );

  let format = (actors, prefix = '', suffix = '') =>
    actors && (prefix + [actors].flat().join(' & ') + suffix);

  let getCaption = ({dc_title, dc_spatial}) => dc_title + (dc_spatial ? `, ${dc_spatial}` : '');

  if (!beingEdited) {
    let {dc_title, dc_spatial, dc_creator, dc_translator, dc_isPartOf, dc_issued, dc_language} = editedMetadata;
    let attributes = (editable)
      ? {className: 'editable metadata', onClick: handleClick, title: 'Edit metadata...'}
      : {};
    return (
      <span {...attributes}>
        <span className="work">
          {getCaption({dc_title, dc_spatial})} {format(dc_creator, '(', ')')},
        </span>
        <span className="edition">
          {format(dc_translator, 'Translated by ', ', ')}
          {dc_isPartOf ? <i>{dc_isPartOf}, </i> : ''}
          {dc_issued ? `${new Date(dc_issued.toString()).getFullYear()}` : ''}
          {dc_language ? `, ${dc_language.charAt(0).toUpperCase() + dc_language.slice(1).toLowerCase()}` : ''}
        </span>
      </span>
    );
  }
  return (
    <form>
      <textarea className="form-control" type="text" rows="5" autoFocus
        defaultValue={stringify(editedMetadata)} onBlur={handleBlur}
      />
    </form>
  );
}
export default Metadata;
