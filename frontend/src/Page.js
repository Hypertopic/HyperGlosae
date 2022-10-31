import './Page.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Page() {
  const source = ["Il estoit une fois une veuve qui avoit deux filles : l’aînée luy ressembloit si fort et d’humeur et de visage que qui la voyoit voyoit la mere. Elles estoient toutes deux si desagréables et si orgueilleuses qu’on ne pouvoit vivre avec elles. La cadette, qui estoit le vray portrait de son pere pour la douceur et l’honnesteté, estoit avec cela une des plus belles filles qu’on eust sceu voir. Comme on aime naturellement son semblable, cette mere estoit folle de sa fille aînée, et, en même temps, avoit une aversion effroyable pour la cadette. Elle la faisoit manger à la cuisine et travailler sans cesse.", "Il falloit, entre autre-chose, que cette pauvre enfant allast, deux fois le jour, puiser de l’eau à une grande demy-lieuë du logis, et qu’elle en raportast plein une grande cruche. Un jour qu’elle estoit à cette fontaine, il vint à elle une pauvre femme qui la pria de luy donner à boire.", "« Ouy da, ma bonne mere », dit cette belle fille ; et, rinçant aussi tost sa cruche, elle puisa de l’eau au plus bel endroit de la fontaine et la lui presenta, soûtenant toûjours la cruche, afin qu’elle bût plus aisément."];
  const scholium = ["Il était une fois une veuve qui avait deux filles ; l'aînée lui ressemblait si fort et d'humeur et de visage que, qui la voyait, voyait la mère. Elles étaient toutes deux si désagréables et si orgueilleuses qu'on ne pouvait vivre avec elles. La cadette, qui était le vrai portrait de son père pour la douceur et l'honnêteté, était avec cela une des plus belles filles qu'on eût su voir. Comme on aime naturellement son semblable, cette mère était folle de sa fille aînée, et en même temps avait une aversion effroyable pour la cadette. Elle la faisait manger à la cuisine et travailler sans cesse.", "Il fallait, entre autres choses, que cette pauvre enfant allât, deux fois le jour, puiser de l’eau à une grande demi-lieue du logis, et qu’elle en rapportât plein une grande cruche. Un jour qu’elle était à cette fontaine, il vint à elle une pauvre femme qui la pria de lui donner à boire.", "« Oui dà, ma bonne mère, » lui dit la jeune fille ; et, rinçant aussitôt sa cruche, elle puisa de l’eau au plus bel endroit de la fontaine et la lui présenta, soutenant toujours la cruche, afin qu’elle bût plus aisément."];
  return (
      <Container className="page">
        {source.map((x, i) => <Passage key={i} source={x} rubric={i+1} scholium={scholium[i]} />)}
      </Container>
  );
}

function Passage({source, rubric, scholium}) {
  return (
    <Row>
      <Col xs={7}>
        <Container>
          <Row>
            <Col>
              {source}
            </Col>
            <Col sm={1} className="rubric">{rubric}</Col>
          </Row>
        </Container>
      </Col>
      <Col xs={5} className="scholium">
        {scholium}
      </Col>
    </Row>
  );
}

export default Page;
