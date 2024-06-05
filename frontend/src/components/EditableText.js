import '../styles/EditableText.css';

import { useState } from 'react';
import FormattedText from './FormattedText';
import { v4 as uuid } from 'uuid';
import React from 'react';
import PassageMarginMenu from './PassageMarginMenu';

function EditableText ({ id, text, rubric, isPartOf, links, backend, setLastUpdate }) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedDocument, setEditedDocument] = useState();
  const [editedText, setEditedText] = useState(text);
  const PASSAGE = new RegExp(`\\{${rubric}} ?([^{]+)`);
  const FIRST_PASSAGE = new RegExp('\\{[^}]+} ?([^{]+)');

  let parsePassage = (rawText) => rubric ? rawText.match(PASSAGE)[1] : rawText;

  let parseFirstPassage = (rawText) => {
    let parsed = rawText.match(FIRST_PASSAGE);
    return (parsed) ? parsed[1] : rawText;
  };

  let updateEditedDocument = () => backend.getDocument(id)
    .then((x) => {
      x = x.error
        ? {_id: uuid(), text: `{${rubric}}`, isPartOf, links}
        : x;
      setEditedDocument(x);
      return x;
    });

  useEffect(() => {
    if (fragment) {
      updateEditedDocument()
        .then((x) => {
          let existingText = parseFirstPassage(x.text);
          setEditedText((existingText && `${existingText}\n\n`) + fragment + '<COMMENT>');
          setBeingEdited(true);
          setFragment();
        });
    }
  }, [fragment]);

  let handleClick = () => {
    setBeingEdited(true);
    updateEditedDocument()
      .then((x) => {
        setEditedText(parsePassage(x.text));
      })
      .catch(() => {
        setEditedDocument({
          _id: uuid(),
          text: `{${rubric}} ${text}`,
          isPartOf,
          links
        });
      });
  };

  let handleImageUrl = (imageTag) => {
    backend.getDocument(id).then((editedDocument) => {
      let parsedText = parseFirstPassage(editedText) + imageTag;
      let text = (rubric)
        ? editedDocument.text.replace(PASSAGE, `{${rubric}} ${parsedText}`)
        : parsedText;
      backend.putDocument({ ...editedDocument, text })
        .then(x => {
          setEditedText(parsedText);
          return x;
        })
        .then(x => setLastUpdate(x.rev))
        .catch(console.error);
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
    <div className="editable content" title="Edit content...">
      <div className="formatted-text" onClick={handleClick}>
        <FormattedText>
          {editedText || text}
        </FormattedText>
      </div>
      <PassageMarginMenu id={id} backend={backend} handleImageUrl={handleImageUrl}/>
    </div>
  );
  return (
    <form>
      <textarea className="form-control" rows="5" autoFocus value={editedText} onChange={handleChange}
        onBlur={handleBlur}
      />
    </form>
  );
}

export default EditableText;
