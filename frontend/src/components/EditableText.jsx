import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import '../styles/EditableText.css';
import FormattedText from './FormattedText';
import DiscreeteDropdown from './DiscreeteDropdown';
import PictureUploadAction from '../menu-items/PictureUploadAction';
import { v4 as uuid } from 'uuid';

export default function EditableText({
  id,
  text,
  rubric,
  isPartOf,
  links,
  fragment,
  setFragment,
  setHighlightedText,
  setSelectedText,
  backend,
  setLastUpdate
}) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedDocument, setEditedDocument] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ src: '', internal: false, name: '' });
  const containerRef = useRef(null);

  // Memoized regex to extract our passage
  const PASSAGE = useMemo(() => new RegExp(`\\{${rubric}} ?([^\\{]*)`), [rubric]);

  const parseFirstPassage = useCallback(raw => {
    const m = raw.match(/\{[^}]+} ?([^{]*)/);
    return m ? m[1] : raw;
  }, []);

  const parsePassage = useCallback(raw => {
    if (!rubric) return raw;
    const m = raw.match(PASSAGE);
    return m ? m[1] : '';
  }, [PASSAGE, rubric]);

  const updateEditedDocument = useCallback(() => {
    return backend.getDocument(id).then(doc => {
      if (doc.error) {
        doc = { _id: uuid(), text: `{${rubric}}`, isPartOf, links };
      }
      setEditedDocument(doc);
      return doc;
    });
  }, [backend, id, isPartOf, links, rubric]);

  // incoming fragment
  useEffect(() => {
    if (!fragment) return;
    updateEditedDocument().then(doc => {
      const first = parseFirstPassage(doc.text);
      setEditedText((first ? `${first}\n\n` : '') + fragment + '<COMMENT>');
      setBeingEdited(true);
      setFragment();
    });
  }, [fragment, parseFirstPassage, setFragment, updateEditedDocument]);

  const handleClick = () => {
    setBeingEdited(true);
    updateEditedDocument().then(doc => {
      setEditedText(parsePassage(doc.text));
    });
  };

  const handleImageUrl = imageTag => {
    backend.getDocument(id).then(doc => {
      const parsed = parsePassage(doc.text) + imageTag;
      const updated = rubric
        ? doc.text.replace(PASSAGE, `{${rubric}} ${parsed}`)
        : parsed;
      backend.putDocument({ ...doc, text: updated })
        .then(res => {
          setLastUpdate(res.rev);
          setEditedDocument({ ...doc, text: updated, _rev: res.rev });
          setEditedText(parsed);
        })
        .catch(console.error);
    });
  };

  const handleChange = e => {
    setEditedText(e.target.value);
  };

  const handleBlur = () => {
    const first = parseFirstPassage(editedText);
    const updated = rubric
      ? editedDocument.text.replace(PASSAGE, `{${rubric}} ${first}`)
      : editedText;
    backend.putDocument({ ...editedDocument, text: updated })
      .then(res => {
        setLastUpdate(res.rev);
        setEditedDocument({ ...editedDocument, text: updated, _rev: res.rev });
        setBeingEdited(false);
        setHighlightedText();
      })
      .catch(err => {
        if (err.message.includes('conflict')) {
          alert('Conflit de mise à jour. Rechargez.');
        } else {
          console.error(err);
        }
      });
  };

  // Attach trash icons on every render and re-attach when exiting edit mode
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
        Object.assign(trash.style, {
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          width: '24px',
          height: '24px',
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: '0',
          transition: 'opacity 0.2s ease',
          zIndex: '10'
        });
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
    const pattern = esc(src);
    const mdRx = new RegExp(`!?\\[[^\\]]*\\]\\(${pattern}\\)`, 'g');
    const clean = t => (t || '').replace(mdRx, '').replace(/\n{2,}/g, '\n\n').trim();

    if (internal) {
      backend.deleteAttachment(id, name, res => {
        if (!res.ok) return alert('Erreur lors de la suppression.');
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

  return beingEdited ? (
    <form>
      <textarea
        className="form-control"
        rows={5}
        autoFocus
        value={editedText}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmer la suppression</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>
                  Supprimer l’image{' '}
                  {deleteTarget.internal ? `"${deleteTarget.name}"` : 'externe'} ?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  ) : (
    <>
      <div
        className="editable content position-relative"
        title="Edit content…"
      >
        <div
          className="formatted-text"
          ref={containerRef}
          onClick={handleClick}
        >
          <FormattedText
            setHighlightedText={setHighlightedText}
            setSelectedText={setSelectedText}
          >
            {text || '\u00A0'}
          </FormattedText>
        </div>
        <DiscreeteDropdown>
          <PictureUploadAction
            id={id}
            backend={backend}
            handleImageUrl={handleImageUrl}
          />
        </DiscreeteDropdown>
      </div>
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmer la suppression</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>
                  Supprimer l’image{' '}
                  {deleteTarget.internal ? `"${deleteTarget.name}"` : 'externe'} ?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}