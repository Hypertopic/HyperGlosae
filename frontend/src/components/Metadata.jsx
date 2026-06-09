import '../styles/Metadata.css';

import { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const CORE_FIELDS = [
  {key: 'dc_creator', label: 'Creator', type: 'text'},
  {key: 'dc_title', label: 'Title', type: 'text'},
  {key: 'dc_issued', label: 'Date', type: 'date'},
];

const OPTIONAL_FIELDS = [
  {key: 'dc_translator', label: 'Translator', type: 'text'},
  {key: 'dc_language', label: 'Language', type: 'text'},
  {key: 'dc_isPartOf', label: 'Part of', type: 'text'},
  {key: 'dc_publisher', label: 'Publisher', type: 'text'},
  {key: 'dc_spatial', label: 'Spatial', type: 'text'},
];

function Metadata({metadata = {}, editable, user, backend, setLastUpdate}) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedDocument, setEditedDocument] = useState(metadata);
  const [editedMetadata, setEditedMetadata] = useState({});
  const [shownOptional, setShownOptional] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);

  useEffect(() => {
    setEditedDocument(metadata);
  }, [metadata]);

  let getMetadata = (doc) =>
    Object.fromEntries(
      Object.entries(doc).filter(([key, _]) => key.startsWith('dc_'))
    );

  let toFieldValue = (value) =>
    Array.isArray(value) ? value.join(' & ') : (value ?? '');

  let toDateInputValue = (value) => {
    if (!value) return '';
    let date = new Date(value.toString());
    return isNaN(date) ? '' : date.toISOString().slice(0, 10);
  };

  let fieldValue = (key, type) =>
    type === 'date'
      ? toDateInputValue(editedMetadata[key])
      : toFieldValue(editedMetadata[key]);

  let isAuthorized = (doc) =>
    user && (!doc.editors || doc.editors.includes(user));

  let handleClick = () => {
    backend.getDocument(metadata._id)
      .then((x) => {
        let md = getMetadata(x);
        setEditedDocument(x);
        setEditedMetadata(md);
        // Reveal optional fields that already hold a value.
        setShownOptional(
          OPTIONAL_FIELDS.filter(({key}) => md[key]).map(({key}) => key)
        );
        setShowAddMenu(false);
        setBeingEdited(true);
        // Surface the canonical authorization warning right away; the backend
        // rejects this no-op write so no revision is created.
        if (!isAuthorized(x)) backend.putDocument(x).catch(() => {});
      });
  };

  let handleFieldChange = (key) => (event) => {
    setEditedMetadata((current) => ({...current, [key]: event.target.value}));
  };

  let handleAddField = (key) => {
    setShownOptional((current) => [...current, key]);
    setShowAddMenu(false);
  };

  let save = () => {
    let updatedDocument = {
      ...Object.fromEntries(
        Object.entries(editedDocument).filter(([key, _]) => !key.startsWith('dc_'))
      ),
      ...Object.fromEntries(
        Object.entries(editedMetadata).filter(([_, value]) => value !== '')
      ),
    };
    setEditedDocument(updatedDocument);
    setBeingEdited(false);
    setShowAddMenu(false);
    backend.putDocument(updatedDocument)
      .then(x => setLastUpdate(x.rev))
      .catch(console.error);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    save();
  };

  let handleBlur = (event) => {
    // Only save once focus leaves the whole form, not when moving between fields.
    if (event.currentTarget.contains(event.relatedTarget)) return;
    save();
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
  let visibleFields = [
    ...CORE_FIELDS,
    ...OPTIONAL_FIELDS.filter(({key}) => shownOptional.includes(key)),
  ];
  let addableFields = OPTIONAL_FIELDS.filter(({key}) => !shownOptional.includes(key));

  return (
    <form className="metadata-form" onSubmit={handleSubmit} onBlur={handleBlur}>
      {visibleFields.map(({key, label, type}, index) => (
        <div className="metadata-field mb-2" key={key}>
          <label className="form-label" htmlFor={key}>{label}</label>
          <input
            id={key}
            className="form-control"
            type={type}
            autoFocus={index === 0}
            value={fieldValue(key, type)}
            onChange={handleFieldChange(key)}
          />
        </div>
      ))}
      {addableFields.length > 0 && (
        <div className="add-section position-relative">
          {/* preventDefault keeps focus on the inputs so the onBlur save does
              not fire (and close the form) while interacting with this menu. */}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm add-section-toggle"
            aria-label="Add a section"
            onMouseDown={(event) => {
              event.preventDefault();
              setShowAddMenu((v) => !v);
            }}
          >
            +
          </button>
          {showAddMenu && (
            <ul className="dropdown-menu show">
              {addableFields.map(({key, label}) => (
                <li key={key}>
                  <button
                    type="button"
                    className="dropdown-item"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      handleAddField(key);
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
export default Metadata;
