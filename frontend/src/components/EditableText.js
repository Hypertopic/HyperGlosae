import '../styles/EditableText.css';

import { useState, useEffect } from 'react';
import FormattedText from './FormattedText';

function EditableText({id, text, rubric, isPartOf, beingEdited, setBeingEdited, sourceId, backend, setLastUpdate}) {
  const [editedDocument, setEditedDocument] = useState({
    text: (rubric) ? `{${rubric}} ${text}` : text,
    _id: id,
    isPartOf,
    links: [{
      verb: 'refersTo',
      object: sourceId
    }]
  });
  const PASSAGE = new RegExp(`\\{${rubric}} ?([^{]+)`);
  let handleClick = () => {
    setBeingEdited(true);
    backend.getDocument(id)
      .then((x) => {
        setEditedDocument(x);
      });
  };

  let handleChange = (event) => {
    console.log('onChange');
    let editedText = (rubric)
      ? editedDocument.text.replace(PASSAGE, `{${rubric}} ${event.target.value}`)
      : event.target.value;
    setEditedDocument({ ...editedDocument, text: editedText });
  };

  let handleBlur = (e) => {
    setBeingEdited(false);
    console.log(editedDocument);
    backend.putDocument(editedDocument)
      .then(x => setLastUpdate(x.rev))
      .catch(console.error);
  };

  let editedText = (rubric) ? editedDocument.text.match(PASSAGE)[1] : editedDocument.text;
  if (!beingEdited) return (
    <div className="editable content" onClick={handleClick} title="Edit content...">
      <FormattedText>
        {editedText}
      </FormattedText>
    </div>
  );
  return (
    <form>
      <textarea className="form-control" type="text" rows="5" autoFocus
        value={editedText} onChange={handleChange} onBlur={handleBlur}
      />
    </form>
  );
}

export default EditableText;
