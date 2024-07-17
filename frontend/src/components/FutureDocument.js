import '../styles/FutureDocument.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form } from 'react-bootstrap';
import { PlusLg, Link, FolderPlus } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';
import DocumentList from './DocumentList';

function FutureDocument({relatedTo, verb = 'refersTo', setLastUpdate, backend, asSource = false}) {
  const [selectedVerb, setSelectedVerb] = useState(verb);
  const [showDocumentList, setShowDocumentList] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [userDocuments, setUserDocuments] = useState([]);
  const fixedType = relatedTo.length === 0 || verb === 'includes' || asSource;

  useEffect(() => {
    const fetchUserDocuments = async () => {
      backend.refreshDocuments((documents) => {
        setUserDocuments(documents);
      });
    };

    fetchUserDocuments();
  }, [backend]);

  const handleSelectChange = (event) => {
    setSelectedVerb(event.target.value);
  };

  return (
    <Card>
      <Card.Body className="d-flex justify-content-center align-items-center">
        {!fixedType && (
          <Form.Select aria-label="Select document type" onChange={handleSelectChange} defaultValue="refersTo" className="select-form" id="select-dropdown">
            <option value="refersTo">Commentary</option>
            <option value="isTranslationOf">Adaptation</option>
          </Form.Select>
        )}
        <FutureDocumentIcon
          relatedTo={selectedDocument ? [selectedDocument._id] : relatedTo}
          verb={selectedVerb}
          setLastUpdate={setLastUpdate}
          backend={backend}
          asSource={asSource}
        />
        {!fixedType && (
          <Link
            title="Select an existing document to add glose"
            className="icon select-document ms-2 link-icon"
            onClick={() => setShowDocumentList(!showDocumentList)}
          />
        )}
      </Card.Body>
      {showDocumentList && (
        <Card.Body>
          <DocumentList
            userDocuments={userDocuments}
            relatedTo={relatedTo}
            setSelectedDocument={setSelectedDocument}
            setShowDocumentList={setShowDocumentList}
            setLastUpdate={setLastUpdate}
            backend={backend}
          />
        </Card.Body>
      )}
    </Card>
  );
}

function FutureDocumentIcon({relatedTo, verb, setLastUpdate, backend, asSource = false}) {
  const navigate = useNavigate();

  let handleClick = async () => {
    let _id = uuid().replace(/-/g, '');
    let doc = {
      _id,
      editors: [backend.credentials.name],
      dc_creator: '<CREATOR>',
      dc_title: '<TITLE>',
      dc_issued: new Date(),
      dc_license: '',
      text: '<TEXT>'
    };

    if (asSource) {
      let gloseId = relatedTo[0];
      backend.putDocument(doc)
        .then(() => backend.getDocument(gloseId))
        .then(metaDocument => backend.putDocument({
          ...metaDocument,
          links: [...(metaDocument.links || []), {verb: 'refersTo', object: _id}]
        }))
        .then(() => backend.getView({view: 'content', gloseId, options: ['include_docs']}))
        .then(rows => rows
          .filter(row => row.value.isPartOf === gloseId)
          .map(row => row.id)
          .filter((rowId, i, array) => array.indexOf(rowId) === i) // Remove duplicates
          .map(rowId => backend.getDocument(rowId)
            .then(contentDocument => backend.putDocument({
              ...contentDocument,
              links: [...(contentDocument.links || []), {verb: 'refersTo', object: _id}]
            }))
          )
        )
        .then(promises => Promise.all(promises)) // Wait for all async operations to complete
        .then(() => navigate('/' + _id))
        .catch(console.error);
    } else {
      backend.putDocument({
        ...doc,
        links: relatedTo.map(object => ({verb, object}))
      })
        .then((x) => {
          setLastUpdate(_id);
          navigate((relatedTo.length ? '#' : '/blank#') + _id);
        })
        .catch(console.error);
    }
  };

  switch (verb) {
    case 'includes':
      return (
        <FolderPlus title="Create a collection from this document"
          className="icon create-collection" onClick={handleClick}
        />
      );
    default:
      return (
        <PlusLg title={`Create a document ${asSource ? 'as a source' : relatedTo.length ? 'as a glose' : 'from scratch'}`}
          className="icon create-document ms-2" onClick={handleClick}
        />
      );
  }
}

export default FutureDocument;
