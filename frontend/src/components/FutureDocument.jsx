import '../styles/FutureDocument.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form} from 'react-bootstrap';
import { PlusLg, Link } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';
import DocumentList from './DocumentList';

function FutureDocument({relatedTo, setLastUpdate, backend, user, documentSubPartsIds}) {
  const [verb, setVerb] = useState('refersTo');
  const [showDocumentList, setShowDocumentList] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const fixedType = relatedTo.length === 0;

  const handleSelectChange = (event) => {
    setVerb(event.target.value);
  };

  return (
    <Card>
      <Card.Body className="d-flex justify-content-center align-items-center">
        {!fixedType && (
          <Form.Select aria-label="Select document type" onChange={handleSelectChange} defaultValue="refersTo" className="select-form" id="select-dropdown">
            <option value="refersTo">Commentary</option>
            <option value="adapts">Adaptation</option>
            <option value="includes">Quotation</option>
          </Form.Select>
        )}
        <FutureDocumentIcon
          relatedTo={selectedDocument ? [selectedDocument._id] : relatedTo}
          {...{verb, setLastUpdate, backend, user, documentSubPartsIds}}
        />
        {!fixedType && (
          <Link
            title="Use an existing document as a glose..."
            className="icon select-document ms-2 link-icon"
            onClick={() => setShowDocumentList(!showDocumentList)}
          />
        )}
      </Card.Body>
      {showDocumentList && (
        <Card.Body>
          <DocumentList {...{ relatedTo, verb, setSelectedDocument,
            setShowDocumentList, setLastUpdate, backend, user }}
          />
        </Card.Body>
      )}
    </Card>
  );
}

function FutureDocumentIcon({relatedTo, verb, setLastUpdate, backend, user, documentSubPartsIds}) {
  const navigate = useNavigate();

  let handleClick = async () => {
    let _id = uuid().replace(/-/g, '');
    let doc = {
      _id,
      editors: [user],
      dc_creator: '<CREATOR>',
      dc_title: '<TITLE>',
      dc_issued: new Date(),
      dc_license: '',
      text: '<TEXT>'
    };
    backend.putDocument({
      ...doc,
      links: relatedTo.map(object => ({verb, object }))
    })
      .then(() => {
        setLastUpdate(_id);
        navigate((relatedTo.length ? '#' : `/${_id}#`) + _id);
      })
      .catch(console.error);
  };

  return (
    <PlusLg title={`Create a document ${relatedTo.length ? 'as a glose' : 'from scratch'}`}
      className="icon create-document ms-2" onClick={handleClick}
    />
  );
}

export default FutureDocument;
