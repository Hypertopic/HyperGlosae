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

  let capitalize = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  let formatTranslation = (translators = '', language = '') => {
    if (translators) {
      return 'Translated ' +
        (language ? `in ${capitalize(language)} ` : '') +
        format(translators, 'by ', ', ');
    } else if (language) {
      return `Translated in ${capitalize(language)}, `;
    }
  };

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
          {formatTranslation(dc_translator, dc_language)}
          {dc_isPartOf ? <i>{dc_isPartOf}, </i> : ''}
          {dc_issued ? `${new Date(dc_issued.toString()).getFullYear()}` : ''}
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
