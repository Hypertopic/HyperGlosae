import '../styles/EditableText.css';

import { useState} from 'react';
import * as React from 'react';
import FormattedText from './FormattedText';
import { v4 as uuid } from 'uuid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function EditableText({ id, text, rubric, isPartOf, links, backend, setLastUpdate }) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedDocument, setEditedDocument] = useState();
  const [editedText, setEditedText] = useState();
  const [contextMenu, setContextMenu] = useState(null);
  const [open, setOpen] = useState(false);

  const PASSAGE = new RegExp(`\\{${rubric}} ?([^{]+)`);
  const FIRST_PASSAGE = new RegExp('\\{[^}]+} ?([^{]+)');

  let parsePassage = (rawText) => (rubric)
    ? rawText.match(PASSAGE)[1]
    : rawText;

  let parseFirstPassage = (rawText) => {
    let parsed = rawText.match(FIRST_PASSAGE);
    return (parsed) ? parsed[1] : rawText;
  };

  let handleClick = (event) => {
    if (event.type === 'click' && contextMenu === null) {
      setBeingEdited(true);
      backend.getDocument(id)
        .then((x) => {
          setEditedDocument(x);
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
    }
  };

  let handleChange = (event) => {
    setEditedText(event.target.value);
  };

  const updateText = (parsedText) => {
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

  let handleBlur = () => {
    const firstPassage = parseFirstPassage(editedText);
    updateText(firstPassage);
  };

  const handleContextMenu = (event) => {
    backend.getDocument(id)
      .then((x) => {
        setEditedDocument(x);
      });
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 6,
        }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
        // Other native context menus might behave different.
        // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
        null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
    setOpen(false);
  };

  const handleRevert = () => {
    backend.getDocumentRevisions(id)
      .then(revisions => {
        const prevRevision = revisions._revs_info[1].rev;
        return backend.getDocument(`${id}?rev=${prevRevision}`);
      })
      .then(prevDoc => {
        const passage = parsePassage(prevDoc.text);
        updateText(passage);
      })
      .catch(error => {
        console.error(error);
      });
    setContextMenu(null);
    setOpen(false);
  };

  const handleClickOpenMenu = () => {
    setOpen(true);
  };

  if (!beingEdited) return (
    <div className="editable content" onClick={handleClick} title="Edit content..." onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
      <FormattedText>
        {editedText || text}
      </FormattedText>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <React.Fragment>
          <MenuItem className="rollback" onClick={handleClickOpenMenu}>Revenir en arrière</MenuItem>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Revenir an arrière?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Souhaitez-vous vraiment revenir en arrière ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button className="cancel-rollback" onClick={handleClose}>Non</Button>
              <Button className="confirm-rollback" onClick={handleRevert} autoFocus>
                Oui
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
        <MenuItem onClick={handleClose}>Annuler</MenuItem>
      </Menu>
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