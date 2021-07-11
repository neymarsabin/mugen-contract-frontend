import { Row, Col, Button } from 'react-bootstrap';

const BettingAmountOptions = () => {
  return(
    <div style={{padding: '20px'}}>
      <Row>
        <Col>
          <Button variant="primary" size="sm"> 10% </Button>
        </Col>
        <Col>
          <Button variant="primary" size="sm"> 20% </Button>
        </Col>
        <Col>
          <Button variant="primary" size="sm"> 30% </Button>
        </Col>
        <Col>
          <Button variant="primary" size="sm"> 40% </Button>
        </Col>
        <Col>
          <Button variant="primary" size="sm"> 50% </Button>
        </Col>
        <Col>
          <Button variant="primary" size="sm"> 60% </Button>
        </Col>
        <Col>
          <Button variant="primary" size="sm"> 70% </Button>
        </Col>
        <Col>
          <Button variant="primary" size="sm"> 80% </Button>
        </Col>
        <Col>
          <Button variant="primary" size="sm"> 90% </Button>
        </Col>
        <Col>
          <Button variant="primary" size="sm"> All In </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BettingAmountOptions;
