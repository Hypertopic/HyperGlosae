import '../styles/EditableText.css';

import { useState, useEffect, useCallback } from 'react';
import FormattedText from './FormattedText';
import DiscreeteDropdown from './DiscreeteDropdown';
import PictureUploadAction from '../menu-items/PictureUploadAction';
import {v4 as uuid} from 'uuid';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function EditableText({id, text, rubric, isPartOf, links, fragment, setFragment, setHighlightedText, setSelectedText, rawEditMode, setRawEditMode, backend, setLastUpdate}) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedDocument, setEditedDocument] = useState();
  const [editedText, setEditedText] = useState();
  const [hasBeenChanged, setHasBeenChanged] = useState(false);
  const PASSAGE = new RegExp(`\\{${rubric}} ?([^{]*)`);

  let parsePassage = (rawText) => (rubric)
    ? rawText.match(PASSAGE)[1]
    : rawText;

  let parseFirstPassage = useCallback((rawText) => {
    const FIRST_PASSAGE = new RegExp('\\{[^}]+} ?([^{]*)');
    let parsed = rawText.match(FIRST_PASSAGE);
    return (parsed) ? parsed[1] : rawText;
  }, []);

  let updateEditedDocument = useCallback(() => backend.getDocument(id)
    .then((x) => {
      x = x.error
        ? {_id: uuid(), text: `{${rubric}}`, isPartOf, links}
        : x;
      setEditedDocument(x);
      return x;
    }), [backend, id, isPartOf, links, rubric]);

  useEffect(() => {
    if (fragment) {
      updateEditedDocument()
        .then((x) => {
          let existingText = parseFirstPassage(x.text);
          setEditedText((existingText && `${existingText}\n\n`) + fragment + '<COMMENT>');
          setBeingEdited(true);
          setFragment();
          setHasBeenChanged(true);
        });
    }
  }, [fragment, parseFirstPassage, setFragment, updateEditedDocument]);

  useEffect(() => {
    if (rawEditMode) {
      updateEditedDocument()
        .then((x) => {
          setEditedText(x.text);
          setBeingEdited(true);
        });
    }
  }, [rawEditMode, updateEditedDocument]);

  let handleClick = () => {
    setBeingEdited(true);
    updateEditedDocument()
      .then((x) => {
        setEditedText(parsePassage(x.text));
      });
  };

  let handleImageUrl = (imageTag) => {
    backend.getDocument(id).then((editedDocument) => {
      let parsedText = parsePassage(editedDocument.text) + imageTag;
      let text = (rubric)
        ? editedDocument.text.replace(PASSAGE, `{${rubric}} ${parsedText}`)
        : parsedText;
      backend.putDocument({ ...editedDocument, text })
        .then(x => setLastUpdate(x.rev))
        .catch(console.error);
    });
  };

  let handleChange = (event) => {
    setHasBeenChanged(true);
    setEditedText(event.target.value);
  };

  let handleBlur = () => {
    if (!hasBeenChanged) {
      if (!rawEditMode) {
        setHighlightedText();
        setBeingEdited(false);
      }
      return;
    }
    let parsedText = parseFirstPassage(editedText);
    let text = (rubric && !rawEditMode)
      ? editedDocument.text.replace(PASSAGE, `{${rubric}} ${parsedText}`)
      : editedText;
    backend.putDocument({ ...editedDocument, text })
      .then(x => setLastUpdate(x.rev))
      .then(() => setHighlightedText())
      .then(() => setBeingEdited(false))
      .then(() => setHasBeenChanged(false))
      .then(() => setRawEditMode(false))
      .catch(console.error);
  };

  if (!beingEdited) return (
    <div className="editable content position-relative">
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={`tooltip-${id}`}>Edit content...</Tooltip>}
      >
        <div className="formatted-text" onClick={handleClick}>
          <FormattedText {...{setHighlightedText, setSelectedText}}>
            {text || '&nbsp;'}
          </FormattedText>
        </div>
      </OverlayTrigger>
      <DiscreeteDropdown>
        <PictureUploadAction {... {id, backend, handleImageUrl}}/>
      </DiscreeteDropdown>
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
