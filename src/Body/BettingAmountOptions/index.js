import { Row, Col, Button } from 'react-bootstrap';

const BettingAmountOptions = ({ setBetAmount, balance, contract }) => {

  const calculateAmount = (value) => {
    const amount = balance * value;
    setBetAmount(amount.toFixed(0));
  };

  if(contract) {
    return(
      <div style={{padding: '20px', backgroundColor: 'black'}}>
        <Row>
          <Col>
            <Button
              variant="primary"
              size="sm"
              onClick={() => calculateAmount(0.1)}
            >
              10%
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              size="sm"
              onClick={() => calculateAmount(0.2)}
            >
              20%
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              size="sm"
              onClick={() => calculateAmount(0.3)}
            >
              30%
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              size="sm"
              onClick={() => calculateAmount(0.4)}
            >
              40%
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              size="sm"
              onClick={() => calculateAmount(0.5)}
            >
              50%
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              size="sm"
              onClick={() => calculateAmount(1)}
            >
              All In
            </Button>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <></>;
  }
};

export default BettingAmountOptions;
