import '../styles/FutureDocument.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { PlusLg, FolderPlus } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';
import Form from 'react-bootstrap/Form';

function FutureDocument({relatedTo, verb = 'refersTo', setLastUpdate, backend, asSource = false}) {
  return (
    <Card>
      <Card.Body className="text-center">
        <FutureDocumentIcon {...{relatedTo, verb, setLastUpdate, backend, asSource}} />
      </Card.Body>
    </Card>
  );
}

function FutureDocumentIcon({relatedTo, verb, setLastUpdate, backend, asSource = false}) {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [gloseType, setGloseType] = useState('commentary');

  const getVerb = () => {
    switch (gloseType) {
      case 'commentary':
        return 'refersTo';
      case 'adaptation':
        return 'isTranslationOf';
      case 'quotation':
        return 'includes';
      default:
        return 'refersTo';
    }
  };

  let handleClick = async () => {
    let _id = uuid();
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
        .then((x) => backend.putDocument({
          ...x,
          links: [{verb: 'refersTo', object: _id}]
        }))
        .then((x) => {
          navigate('/' + _id);
        })
        .catch(console.error);
    } else {
      backend.putDocument({
        ...doc,
        links: relatedTo.map(object => ({verb: getVerb(), object}))
      })
        .then((x) => {
          setLastUpdate(_id);
          navigate((relatedTo.length ? '#' : '/blank#') + _id);
        })
        .catch(console.error);
    }
  };

  return (
    <div
      onMouseEnter={() => !asSource && relatedTo.length > 0 && verb === 'refersTo' && setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      className="future-document-icon-container"
    >
      {showOptions && (
        <Form.Select
          aria-label="Select glose type"
          onChange={(e) => setGloseType(e.target.value)}
          className="mb-3"
        >
          <option value="commentary">Commentary</option>
          <option value="adaptation">Adaptation</option>
          <option value="quotation">Quotation</option>
        </Form.Select>
      )}
      {verb === 'includes' ? (
        <FolderPlus title="Create a collection from this document"
          className="icon create-collection" onClick={handleClick}
        />
      ) : (
        <PlusLg title={`Create a document ${asSource ? 'as a source' : relatedTo.length ? 'as a glose' : 'from scratch'}`}
          className="icon create-document" onClick={handleClick}
        />
      )}
    </div>
  );
}

export default FutureDocument;
