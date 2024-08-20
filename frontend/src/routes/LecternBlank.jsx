import '../styles/Lectern.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OpenedDocumentsBlank from '../components/OpenedDocumentsBlank';
import Container from 'react-bootstrap/Container';

function LecternBlank({ backend }) {
  let id = useLocation().hash.slice(1);
  const [sourceMetadata, setSourceMetadata] = useState();
  const [lectern, setLectern] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();
  const [metadata, setMetadata] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    backend.refreshMetadata(id, setMetadata);
    backend.refreshContent(id, setContent);
  }, [id, lastUpdate, backend]);

  let getText = ({ doc, value }) => {
    if (!doc) {
      return value.text;
    }
    let fragment = (value.inclusion !== 'whole' ? '#' + value.inclusion : '');
    let imageReference = /!\[[^\]]*\]\([^)]+/;
    return doc.text.replace(imageReference, '$&' + fragment);
  };

  useEffect(() => {
    if (metadata.length) {
      let focusedDocument = metadata.find(x => x._id === id);
      if (focusedDocument) {
        setSourceMetadata(focusedDocument);
      }
    }
  }, [id, metadata, lastUpdate]);

  useEffect(() => {
    if (content.length) {
      let passages = content
        .filter((passageDoc) => passageDoc.value.isPartOf === id)
        .reduce(({ whole, part }, passageDoc, i, { length }) => {
          whole.push({
            source: [],
            scholia: [{
              id: passageDoc.id,
              rubric: passageDoc.key[1],
              isPartOf: passageDoc.value.isPartOf,
              text: getText(passageDoc),
            }],
            rubric: passageDoc.key[1],
          });

          if (i === length - 1) {
            return [...whole];
          }
          return { whole, part };
        }, { whole: [], part: { source: [], scholia: [] } });
      passages = Array.isArray(passages) ? passages : [];
      setLectern(passages);
    }
  }, [id, content, lastUpdate]);

  return (
    <Container className="screen">
      <OpenedDocumentsBlank {...{ backend, lectern, sourceMetadata, setLastUpdate }}/>
    </Container>
  );
}

export default LecternBlank;
