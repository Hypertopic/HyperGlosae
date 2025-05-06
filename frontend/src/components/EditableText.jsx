import '../styles/EditableText.css';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import FormattedText from './FormattedText';
import DiscreeteDropdown from './DiscreeteDropdown';
import PictureUploadAction from '../menu-items/PictureUploadAction';
import {v4 as uuid} from 'uuid';

function EditableText({id, text, rubric, isPartOf, links, fragment, setFragment, setHighlightedText, setSelectedText, backend, setLastUpdate}) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedDocument, setEditedDocument] = useState();
  const [editedText, setEditedText] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ src: '', internal: false, name: '' });
  const containerRef = useRef(null);
  const PASSAGE = useMemo(() => new RegExp(`\\{${rubric}} ?([^\\{]*)`), [rubric]);

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

  useEffect(() => {
    const attachTrash = () => {
      const root = containerRef.current;
      if (!root) return;
      root.querySelectorAll('figure').forEach(fig => {
        if (fig.querySelector('.trash-overlay')) return;
        const img = fig.querySelector('img');
        if (!img) return;
        const trash = document.createElement('div');
        trash.className = 'trash-overlay';
        trash.innerHTML = `
          <svg viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1z"/>
          </svg>`;
        fig.style.position = 'relative';
        fig.appendChild(trash);
        fig.addEventListener('mouseenter', () => (trash.style.opacity = '1'));
        fig.addEventListener('mouseleave', () => (trash.style.opacity = '0'));
        trash.addEventListener('click', () => {
          const src = img.src;
          const internal = src.includes(`/${id}/`);
          const name = internal
            ? decodeURIComponent(src.split(`${id}/`)[1])
            : src;
          setDeleteTarget({ src, internal, name });
          setShowDeleteModal(true);
        });
      });
    };

    const obs = new MutationObserver(attachTrash);
    if (containerRef.current) {
      obs.observe(containerRef.current, { childList: true, subtree: true });
    }
    attachTrash();
    return () => obs.disconnect();
  }, [backend, id, setLastUpdate, beingEdited]);

  const confirmDelete = () => {
    const { src, internal, name } = deleteTarget;
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const mdRx = new RegExp(`!?\\[[^\\]]*\\]\\(${esc(src)}\\)`, 'g');
    const clean = t => (t || '').replace(mdRx, '').replace(/\n{2,}/g, '\n\n').trim();

    if (internal) {
      backend.deleteAttachment(id, name, res => {
        if (!res.ok) return alert('Error deleting attachment.');
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
      <div className="formatted-text" onClick={handleClick} ref={containerRef}>
        <FormattedText {...{setHighlightedText, setSelectedText}}>
          {text || '&nbsp;'}
        </FormattedText>
      </div>
      <DiscreeteDropdown>
        <PictureUploadAction {...{id, backend, handleImageUrl}}/>
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
      <textarea className="form-control" rows="5" autoFocus value={editedText} onChange={handleChange} onBlur={handleBlur} />
    </form>
  );
}

export default EditableText;

