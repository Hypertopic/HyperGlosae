import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Metadata from './Metadata';
import BrowseTools from './BrowseTools';
import FutureDocument from './FutureDocument';
import { TypeBadge } from './Type';

function DocumentsCards({docs, expandable, byRow, createOn, setLastUpdate, backend, user}) {
  return (
    <Row className="gy-4">
      {docs.map(x => x?._id && x?.dc_title &&
        <Col key={x._id} md={ byRow && (12 / byRow) }>
          <DocumentCard doc={x} expandable={expandable} />
        </Col>
      )}
      {createOn &&
        <Col>
          <Row>
            <Col>
              <FutureDocument relatedTo={createOn} {...{setLastUpdate, backend, user}} />
            </Col>
          </Row>
        </Col>
      }
    </Row>
  );
}

function DocumentCard({doc, expandable}) {
  return (
    <Card className="h-100">
      <Card.Body>
        <BrowseTools id={doc._id} openable={expandable} />
        <Metadata metadata={doc} />
        <TypeBadge type={doc?.type}/>
      </Card.Body>
    </Card>
  );
}

export default DocumentsCards;
