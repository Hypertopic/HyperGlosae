import Graph from './Graph.jsx';
import FutureDocument from './FutureDocument.jsx';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function GraphContainer({data, createOn, setLastUpdate, backend, user}) {
  const docs = data
    .map((key) => [key._id, key.dc_title, key.links]);
  const displayedDocs = docs.flatMap(d => d[0]);

  return (
    <Row>
      <Col className="col-10">
        <Graph docs={docs} displayedDocs={displayedDocs} />
      </Col>
      {createOn &&
      <Col>
        <FutureDocument relatedTo={createOn} {...{setLastUpdate, backend, user}} />
      </Col>
      }
    </Row>
  );
}

export default GraphContainer;