import { Link } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Metadata from './Metadata';
import BrowseTools from './BrowseTools';
import FutureDocument from './FutureDocument';
import FutureCollection from './FutureCollection';
import { TypeBadge } from './Type';
import DeleteReferenceButton from './DeleteReferenceButton';

function DocumentsCards({docs, expandable, byRow, isDeletable, createOn, setLastUpdate, backend}) {
  return (
    <Row className="gy-4">
      {docs.map(x =>
        <Col key={x._id} md={ byRow && (12 / byRow) }>
          <DocumentCard doc={x} expandable={expandable} isDeletable={isDeletable} ref_id={createOn} {...{setLastUpdate, backend}}/>
        </Col>
      )}
      {createOn &&
        <Col>
          <Row>
            <Col>
              <FutureDocument relatedTo={createOn} {...{setLastUpdate, backend}} />
            </Col>
            {(createOn.length > 0) &&
              <Col>
                <FutureCollection relatedTo={createOn} {...{setLastUpdate, backend}} />
              </Col>
            }
          </Row>
        </Col>
      }
    </Row>
  );
}

function DocumentCard({doc, expandable, isDeletable, ref_id, setLastUpdate, backend}) {
  const collectionId = useMemo(() => {
    if (doc?.links?.length > 1) {
      return doc.links.every((item) => {
        return item.verb === 'includes';
      }) ? doc._id : undefined;
    };
    return undefined;
  }, [doc]);
  const windowWidth = useRef(window.innerWidth);

  return (
    <Card className="h-100">
      {isDeletable && (
        <Card.Header className="d-flex justify-content-end">
          <DeleteReferenceButton doc={doc} ref_id={ref_id} setLastUpdate={setLastUpdate} backend={backend}/>
        </Card.Header>
      )}
      <Card.Body>
        <BrowseTools
          id={collectionId ? doc.links.length && windowWidth.current < 820 ? doc.links[0].object : doc._id : doc._id}
          openable={expandable}
          collectionId={collectionId}
        />
        <Metadata metadata={doc} />
        <TypeBadge type={doc?.type}/>
      </Card.Body>
      <References doc={doc} />
    </Card>
  );
}

function References({doc}) {
  if (doc.referenced) return (
    <Card.Footer>
      referenced by {doc.referenced} document(s)
    </Card.Footer>
  );
}

export default DocumentsCards;
