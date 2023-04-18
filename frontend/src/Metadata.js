import './Metadata.css';

import { useEffect, useState } from 'react';
import yaml from 'yaml';

function Metadata({metadata = {}, editable, backend}) {
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
      ...yaml.parse(event.target.value)
    };
    setEditedDocument(updatedDocument);
    backend.putDocument(updatedDocument);
  };

  let editedMetadata = Object.fromEntries(
    Object.entries(editedDocument)
      .filter(([key, _]) => key.startsWith('dc_'))
  );

  let format = (actors, prefix = '', suffix = '') =>
    actors && (prefix + [actors].flat().join(' & ') + suffix);

  if (!beingEdited) {
    let {dc_title, dc_spatial, dc_creator, dc_translator, dc_isPartOf, dc_issued} = editedMetadata;
    let attributes = (editable)
      ? {className: 'editable metadata', onClick: handleClick, title: 'Edit metadata...'}
      : {};
    return (
      <span {...attributes}>
        <span className="work">
          {dc_title}{dc_spatial ? ', ' + dc_spatial : ''} {format(dc_creator, '(', ')')},
        </span>
        <span className="edition">
          {format(dc_translator, 'Translated by ', ', ')}
          {dc_isPartOf ? <i>{dc_isPartOf}, </i> : ''}
          {dc_issued ? `${new Date(dc_issued).getFullYear()}` : ''}
        </span>
        , <License metadata={metadata} />
      </span>
    );
  }
  return (
    <form>
      <textarea className="form-control" type="text" rows="5" autoFocus
        defaultValue={yaml.stringify(editedMetadata)} onBlur={handleBlur}
      />
    </form>
  );
}

function License({metadata}) {
  let license_uri = metadata.dc_license;
  let [license_name] = /BY[\w-]+/i.exec(license_uri) || [];
  if (license_name) return (
    <span className="license">
      <a href={license_uri}>
        CC-{license_name.toUpperCase()}
      </a>
    </span>
  );
  return (
    <span className="license">
      All rights reserved
    </span>
  );
}

export default Metadata;
