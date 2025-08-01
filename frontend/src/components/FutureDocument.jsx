import '../styles/FutureDocument.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, Nav, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PlusLg, Link } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';
import DocumentList from './DocumentList';
import CheckboxList from './CheckboxList';

const FutureDocument = ({ relatedTo, setLastUpdate, backend, user }) => {
  const [activeTab, setActiveTab] = useState('create_glose');
  const [verb, setVerb] = useState('refersTo');

  const [showEditorList, setShowEditorList] = useState(false);
  const [availableEditors, setAvailableEditors] = useState([]);
  const [selectedEditors, setSelectedEditors] = useState([]);

  const [showMetadataList, setShowMetadataList] = useState(false);
  const [availableMetadata, setAvailableMetadata] = useState([]);
  const [selectedMetadata, setSelectedMetadata] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!relatedTo.length) return;
    backend.getDocument(relatedTo[0]).then((document) => {
      const filteredEditors = (document.editors || []).filter((editor) => editor !== user);
      const metadata = Object.entries(document).filter(([key, _]) => key.startsWith('dc_'));
      setAvailableMetadata(metadata);
      setAvailableEditors(filteredEditors);
    });
  }, [backend, relatedTo, user]);

  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  const handleSelectChange = (event) => {
    setVerb(event.target.value);
  };

  const handleCreateDocument = async () => {
    const _id = uuid().replace(/-/g, '');
    const doc = {
      _id,
      editors: [user, ...selectedEditors],
      dc_creator: '…',
      dc_title: '…',
      dc_issued: new Date(),
      dc_isPartOf: null,
      dc_license: null,
      dc_translator: null,
      dc_language: null,
      dc_publisher: null,
      dc_spatial: null,
      text: '…',
      ...Object.fromEntries(selectedMetadata),
    };

    try {
      await backend.putDocument({
        ...doc,
        links: (verb !== 'includes' && relatedTo.length)
          ? [{ verb, object: relatedTo[0] }]
          : relatedTo.map((object) => ({ verb, object }))
      });
      setLastUpdate(_id);
      navigate((relatedTo.length ? '#' : `/${_id}#`) + _id);
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  return relatedTo.length === 0 ? (
    <Card>
      <Card.Body className="d-flex justify-content-center align-items-center">
        <OverlayTrigger placement="top" overlay={
          <Tooltip id="tooltip-bookmark"> Create a document from scratch </Tooltip>
        }>
          <PlusLg
            className="icon create-document ms-2"
            onClick={handleCreateDocument}
          />
        </OverlayTrigger>
      </Card.Body>
    </Card>
  ) : (
    <Card>
      <Card.Header>
        <Nav variant="tabs" className="gap-2" activeKey={activeTab} onSelect={handleTabSelect}>
          <Nav.Item>
            <Nav.Link eventKey="create_glose">
              <PlusLg
                className="icon ms-2"
              /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="use_existing_document">
              <Link
                className="icon select-document ms-2 link-icon"
              />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        {activeTab === 'create_glose' && (
          <>
            <div>Create a document as a...</div>
            <Form.Select
              id="select-dropdown"
              className="select-form mt-3"
              aria-label="Select document type"
              onChange={handleSelectChange}
              defaultValue="refersTo"
            >
              <option value="refersTo">Commentary</option>
              <option value="adapts">Adaptation</option>
              <option value="includes">Quotation</option>
            </Form.Select>
            <>
              <Form.Switch
                className="open-metadata-list mt-3 mb-1"
                id="switch-metadata"
                label="Re use metadata"
                checked={showMetadataList}
                onChange={() => setShowMetadataList(!showMetadataList)}
              />
              {showMetadataList && (
                <CheckboxList availableItems={availableMetadata} selectedItems={selectedMetadata} setSelectedItems={setSelectedMetadata} type="metadata" />
              )}
            </>
            {
              availableEditors.length !== 0 && (
                <>
                  <Form.Switch
                    className="open-editor-list mt-3 mb-1"
                    id="switch-editors"
                    label="Re use editors"
                    checked={showEditorList}
                    onChange={() => setShowEditorList(!showEditorList)}
                  />
                  {showEditorList && (
                    <CheckboxList availableItems={availableEditors} selectedItems={selectedEditors} setSelectedItems={setSelectedEditors} type="editor"/>
                  )}
                </>
              )
            }
            <Button variant="outline-secondary" className="mt-3 create-document" onClick={handleCreateDocument}>Create</Button>
          </>
        )}
        {activeTab === 'use_existing_document' && (
          <>
            <div>Use an existing document as a...</div>
            <Form.Select
              id="select-dropdown"
              className="select-form mt-3 mb-3"
              aria-label="Select document type"
              onChange={handleSelectChange}
              defaultValue="refersTo"
            >
              <option value="refersTo">Commentary</option>
              <option value="adapts">Adaptation</option>
              <option value="includes">Quotation</option>
            </Form.Select>
            <DocumentList {...{relatedTo, verb, setLastUpdate, backend, user }} />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default FutureDocument;
