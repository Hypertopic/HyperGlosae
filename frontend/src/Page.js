import './Page.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftSquare } from 'react-bootstrap-icons';
import Metadata from './Metadata';

function Page() {

  const [page, setPage] = useState([]);
  const [margin, setMargin] = useState();
  const [metadata, setMetadata] = useState([]);
  let {id = "02ee00d85cdb11ed834c4fb9e3c972af"} = useParams();

  useEffect(() => {
    fetch(`http://localhost:5984/hyperglosae/_design/app/_view/metadata?startkey=["${id}"]&endkey=["${id}",{}]`)
      .then(x => x.json())
      .then(
        (result) => {
          setMetadata(
            result.rows.map(x => x.value)
          );
        }
      );
    fetch(`http://localhost:5984/hyperglosae/_design/app/_view/content?startkey=["${id}"]&endkey=["${id}",{}]`)
      .then(x => x.json())
      .then(
        (result) => {
          setMargin(null);
          let passages = result.rows.reduce(({whole, part}, x, i, {length}) => {
            if (part.rubric && (x.key[1] !== part.rubric)) {
              whole.push(part);
              part = {source:'', scholia:[]};
            }
            part.rubric = x.key[1];
            if (x.value.isPartOf === id) {
              part.source = x.value.text;
            } else {
              part.scholia = [...part.scholia || [], x.value.text];
              setMargin(x.value.isPartOf);
            }
            if (i === length - 1) {
              return [...whole, part];
            }
            return {whole, part};
          }, {whole: [], part: {source:'', scholia:[]}});
          setPage(passages);
        },
        (error) => {
          console.log(error.message)
        }
      )
  }, [id]);

  return (
      <Container className="page">
        <Row>
          <RunningHeadSource metadata={ metadata.find(x => (x.id === id)) } />
          <RunningHeadMargin metadata={ metadata.find(x => (x.id === margin)) } />
        </Row>
        {page.map(({rubric, source, scholia}) =>
          <Passage key={rubric} source={source} rubric={rubric} scholium={scholia[0]} hasMargin={!!margin} />)}
      </Container>
  );
}

function Passage({source, rubric, scholium, hasMargin}) {
  return (
    <Row>
      <Col xs={7} className="source">
        <Container>
          <Row>
            <Col>
              {source}
            </Col>
            <Col sm={1} className="rubric">{rubric}</Col>
          </Row>
        </Container>
      </Col>
      <PassageMargin text={scholium} active={hasMargin} />
    </Row>
  );
}

function PassageMargin({active, text}) {
  if (!active) return;
  return (
    <Col xs={5} className="scholium">
      {text}
    </Col>
  );
}

function RunningHeadSource({metadata}) {
  return (
    <Col xs={7} className="source">
      <Metadata metadata={metadata} />
    </Col>
  );
}

function RunningHeadMargin({metadata}) {
  if (!metadata) return;
  return (
    <Col xs={5} className="scholium">
      <Link to={`../${metadata.id}`} className="icon"> <ArrowLeftSquare title="Check its gloses" /> </Link>
      <Metadata metadata={metadata} />
    </Col>
  );
}

export default Page;
