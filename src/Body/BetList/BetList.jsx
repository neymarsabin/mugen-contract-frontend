import "./styles.css";
import { Container, Row, Col } from 'react-bootstrap';

const BetListRow = ({ blueLabel, redLabel }) => {
  return(
    <Row className="justify-content-space-between">
      <Col>
        <span className="bet-option-blue">{blueLabel}</span>
      </Col>
      <Col>
        <span className="bet-option-red">{blueLabel}</span>
      </Col>
    </Row>
  );
};

const sampleData = [
  {
    blueLabel: 'Option 1',
    redLabel: 'Option 2'
  },
  {
    blueLabel: 'Option 1',
    redLabel: 'Option 2'
  }
];

const BetList = () => {
  return (
    <Container>
      { sampleData.map((sData) => {
        return(
          <BetListRow
            blueLabel={sData.blueLabel}
            redLabel={sData.redLabel}
          />
        );
      })}
    </Container>
  );
};

export default BetList;
