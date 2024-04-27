import '../styles/EditableText.css';

import { useState, useEffect } from 'react';
import FormattedText from './FormattedText';

function EditableText({id, text, rubric, backend, setLastUpdate}) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedDocument, setEditedDocument] = useState();
  const [editedText, setEditedText] = useState();
  const PASSAGE = new RegExp(`\\{${rubric}} ?([^{]+)`);
  const FIRST_PASSAGE = new RegExp('\\{[^}]+} ?([^{]+)');

  let parsePassage = (rawText) => (rubric)
    ? rawText.match(PASSAGE)[1]
    : rawText;

  let parseFirstPassage = (rawText) => {
    let parsed = rawText.match(FIRST_PASSAGE);
    return (parsed) ? parsed[1] : rawText;
  };

  let handleClick = () => {
    setBeingEdited(true);
    backend.getDocument(id)
      .then((x) => {
        setEditedDocument(x);
        setEditedText(parsePassage(x.text));
      });
  };

  let handleChange = (event) => {
    setEditedText(event.target.value);
  };

  let handleBlur = () => {
    let parsedText = parseFirstPassage(editedText);
    let text = (rubric)
      ? editedDocument.text.replace(PASSAGE, `{${rubric}} ${parsedText}`)
      : editedText;
    backend.putDocument({ ...editedDocument, text })
      .then(x => {
        setEditedText(parsedText);
        return x;
      })
      .then(x => setLastUpdate(x.rev))
      .then(() => setBeingEdited(false))
      .catch(console.error);
  };

  if (!beingEdited) return (
    <div className="editable content" onClick={handleClick} title="Edit content...">
      <FormattedText>
        {editedText || id && text}
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
