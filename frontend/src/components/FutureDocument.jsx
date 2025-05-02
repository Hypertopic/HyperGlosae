import '../styles/FutureDocument.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PlusLg, Link } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';
import DocumentList from './DocumentList';
import { NotificationManager } from 'react-notifications';

function FutureDocument({ relatedTo, setLastUpdate, backend, user }) {
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
          {...{ verb, setLastUpdate, backend, user }}
        />
        {!fixedType && (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-use-existing">Use an existing document as a glose…</Tooltip>
            }
          >
            <Link
              className="icon select-document ms-2 link-icon"
              onClick={() => setShowDocumentList(!showDocumentList)}
            />
          </OverlayTrigger>

        )}
      </Card.Body>
      {showDocumentList && (
        <Card.Body>
          <DocumentList {...{
            relatedTo, verb, setSelectedDocument,
            setShowDocumentList, setLastUpdate, backend, user
          }}
          />
        </Card.Body>
      )}
    </Card>
  );
}

function FutureDocumentIcon({ relatedTo, verb, setLastUpdate, backend, user }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const _id = uuid().replace(/-/g, '');
    const doc = {
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
      links: relatedTo.map(object => ({ verb, object }))
    })
      .then(() => {
        setLastUpdate(_id);
        // La notification d'information pour le feedback du découpage en passage
        NotificationManager.info('Découpage en passage effectué avec succès.');

        navigate((relatedTo.length ? '#' : `/${_id}#`) + _id);
      })
      .catch(console.error);
  };

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id="tooltip-create-doc">
          Create a document {relatedTo.length ? 'as a glose' : 'from scratch'}
        </Tooltip>
      }
    >
      <PlusLg
        className="icon create-document ms-2" onClick={handleClick}
      />
    </OverlayTrigger>

  );
}

export default FutureDocument;
