import '../styles/FutureDocument.css';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { PlusLg, FolderPlus } from 'react-bootstrap-icons';
import { v4 as uuid } from 'uuid';

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
  const { t } = useTranslation();

  let handleClick = async () => {
    let _id = uuid();
    let editors = [backend.credentials.name];

    if (asSource) {
      let documentId = relatedTo[0];
      backend.putDocument({
        _id,
        editors,
        dc_creator: t('creator'),
        dc_title: t('title'),
        dc_issued: new Date(),
        dc_license: '',
        text: t('text'),
      }).then(() => {
        setLastUpdate(_id);
        backend.getDocument(documentId)
          .then((x) => {
            let updatedDocument = {
              ...Object.fromEntries(
                Object.entries(x)
              ),
              links: [{verb: 'refersTo', object: _id}]
            };

            backend.putDocument(updatedDocument)
              .then((x) => {
                setLastUpdate(documentId);
                navigate('/' + _id);
              });
          });
      });
    } else {
      let links = relatedTo.map(object => ({verb, object}));
      backend.putDocument({
        _id,
        editors,
        dc_creator: t('creator'),
        dc_title: t('title'),
        dc_issued: new Date(),
        dc_license: '',
        text: t('text'),
        links
      }).then((x) => {
        setLastUpdate(_id);
        navigate((relatedTo.length ? '#' : '/') + _id);
      });
    }
  };

  switch (verb) {
    case 'includes':
      return (
        <FolderPlus title= {`${t('collection')}`}
          className="icon create-collection" onClick={handleClick}
        />
      );
    default:
      return (
        <PlusLg title={`${t('document')} ${asSource ? t('source') : relatedTo.length ? t('glose') : t('scratch')}`} className="icon create-document" onClick={handleClick}
        />
      );
  }
}

export default FutureDocument;
