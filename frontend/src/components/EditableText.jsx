import '../styles/EditableText.css';

import { useState, useEffect, useCallback } from 'react';
import FormattedText from './FormattedText';
import DiscreeteDropdown from './DiscreeteDropdown';
import PictureUploadAction from '../menu-items/PictureUploadAction';
import {v4 as uuid} from 'uuid';
import ImagesWithDelete from './ImageDisplay';

function EditableText({id, text, rubric, isPartOf, links, fragment, setFragment, setHighlightedText, setSelectedText, backend, setLastUpdate}) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedDocument, setEditedDocument] = useState();
  const [editedText, setEditedText] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ src: '', alt: '', internal: false, name: '' });
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
        });
    }
  }, [fragment, parseFirstPassage, setFragment, updateEditedDocument]);

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
    setEditedText(event.target.value);
  };

  let handleBlur = () => {
    let parsedText = parseFirstPassage(editedText);
    let text = (rubric)
      ? editedDocument.text.replace(PASSAGE, `{${rubric}} ${parsedText}`)
      : editedText;
    backend.putDocument({ ...editedDocument, text })
      .then(x => setLastUpdate(x.rev))
      .then(() => setHighlightedText())
      .then(() => setBeingEdited(false))
      .catch(console.error);
  };

  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let images = [];
  let textWithoutInternalImages = text || '';
  let match;

  while ((match = imageRegex.exec(text || '')) !== null) {
    const alt = match[1];
    const src = match[2];
    const isInternal = src.includes(`/${id}/`);
    if (isInternal) {
      images.push({ alt, src });
      const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const mdRx = new RegExp(`!\\[${esc(alt)}\\]\\(${esc(src)}\\)`, 'g');
      textWithoutInternalImages = textWithoutInternalImages.replace(mdRx, '');
    }
  }
  textWithoutInternalImages = textWithoutInternalImages.replace(/\n{2,}/g, '\n\n').trim();

  const confirmDelete = () => {
    const { src, alt, internal, name } = deleteTarget;
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const mdRx = new RegExp(`!\\[${esc(alt)}\\]\\(${esc(src)}\\)`, 'g');
    const clean = t => (t || '').replace(mdRx, '').replace(/\n{2,}/g, '\n\n').trim();
    if (internal) {
      backend.deleteAttachment(id, name, res => {
        if (!res.ok) return;
        backend.getDocument(id).then(doc => {
          const cleaned = clean(doc.text);
          backend.putDocument({ ...doc, text: cleaned }).then(r => {
            setEditedText(cleaned);
            setEditedDocument({ ...doc, text: cleaned, _rev: r.rev });
            setLastUpdate(r.rev);
            setShowDeleteModal(false);
          });
        });
      });
    } else {
      const cleaned = clean(editedText);
      setEditedText(cleaned);
      setEditedDocument(p => ({ ...p, text: cleaned }));
      setShowDeleteModal(false);
    }
  };

  if (!beingEdited) return (
    <div className="editable content position-relative" title="Edit content...">
      <div className="formatted-text" onClick={handleClick}>
        <FormattedText {...{setHighlightedText, setSelectedText}}>
          {textWithoutInternalImages || '&nbsp;'}
        </FormattedText>
        <ImagesWithDelete
          id={id}
          images={images}
          setDeleteTarget={setDeleteTarget}
          setShowDeleteModal={setShowDeleteModal}
        />
      </div>
      <DiscreeteDropdown>
        <PictureUploadAction {... {id, backend, handleImageUrl}}/>
      </DiscreeteDropdown>
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)} />
              </div>
              <div className="modal-body">
                <p>Delete image {deleteTarget.internal ? `"${deleteTarget.name}"` : 'external'}?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
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
