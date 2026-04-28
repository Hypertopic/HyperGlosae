import '../styles/Metadata.css';

import { useEffect, useState } from 'react';
import { parse, stringify } from 'yaml';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function Metadata({metadata = {}, editable, backend, setLastUpdate}) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedDocument, setEditedDocument] = useState(metadata);
  const [editedText, setEditedText] = useState();

  useEffect(() => {
    setEditedDocument(metadata);
  }, [metadata]);

  let getMetadata = (doc) =>
    Object.fromEntries(
      Object.entries(doc).filter(([key, _]) => key.startsWith('dc_'))
    );

  let handleClick = () => {
    backend.getDocument(metadata._id)
      .then((x) => {
        setEditedDocument(x);
        setEditedText(stringify(getMetadata(x)));
        setBeingEdited(true);
      });
  };

  let handleChange = (event) => {
    setEditedText(event.target.value);
  };

  let handleBlur = () => {
    setBeingEdited(false);
    let updatedDocument = {
      ...Object.fromEntries(
        Object.entries(editedDocument).filter(([key, _]) => !key.startsWith('dc_'))
      ),
      ...parse(editedText)
    };
    setEditedDocument(updatedDocument);
    backend.putDocument(updatedDocument)
      .then(x => setLastUpdate(x.rev))
      .catch(console.error);
  };

  let format = (actors, prefix = '', suffix = '') =>
    actors && (prefix + [actors].flat().join(' & ') + suffix);

  let capitalize = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  let formatTranslation = (translators = '', language = '') =>
    (translators) &&
      'Translated '
        + (language && `in ${capitalize(language)} `)
        + format(translators, 'by ', ', ');

  let getCaption = ({dc_title, dc_spatial}) => dc_title + (dc_spatial ? `, ${dc_spatial}` : '');

  if (!beingEdited) {
    let {dc_title, dc_spatial, dc_creator, dc_translator, dc_isPartOf, dc_issued, dc_language} = getMetadata(editedDocument);
    let formattedMetadata = (
      <>
        <span className="work">
          {getCaption({dc_title, dc_spatial})} {format(dc_creator, '(', ')')},
        </span>
        <span className="edition">
          {formatTranslation(dc_translator, dc_language)}
          {dc_isPartOf ? <i>{dc_isPartOf}, </i> : ''}
          {dc_issued ? `${new Date(dc_issued.toString()).getFullYear()}` : ''}
        </span>
      </>
    );
    if (editable) return (
      <OverlayTrigger overlay={<Tooltip>Edit metadata...</Tooltip>} >
        <span className="editable metadata" onClick={handleClick} >
          {formattedMetadata}
        </span>
      </OverlayTrigger>
    );
    return (
      <span>
        {formattedMetadata}
      </span>
    );
  }
  return (
    <form>
      <textarea className="form-control" type="text" rows="5" autoFocus
        value={editedText} onChange={handleChange} onBlur={handleBlur}
      />
    </form>
  );
}
export default Metadata;
