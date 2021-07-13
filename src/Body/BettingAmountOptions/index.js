import { Row, Col, Button } from 'react-bootstrap';

const BettingAmountOptions = ({ contract }) => {
  if(contract) {
    return(
      <div style={{padding: '20px', backgroundColor: 'black'}}>
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
  } else {
    return <></>;
  }
};

export default BettingAmountOptions;
