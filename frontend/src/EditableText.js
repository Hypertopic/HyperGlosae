import './EditableText.css';

import { useState, useEffect } from 'react';
import FormattedText from './FormattedText';

function EditableText({id, text, rubric, backend}) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedDocument, setEditedDocument] = useState({
    text: (rubric) ? `{${rubric}} ${text}` : text
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
    let editedText = (rubric)
      ? editedDocument.text.replace(PASSAGE, `{${rubric}} ${event.target.value}`)
      : event.target.value;
    setEditedDocument({ ...editedDocument, text: editedText });
  };

  let handleBlur = () => {
    setBeingEdited(false);
    backend.putDocument(editedDocument);
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
