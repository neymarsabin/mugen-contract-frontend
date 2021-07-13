import { Button, Form } from 'react-bootstrap';
import "./styles.css";

function BettingForm({ contract, balance, bookHash, account }) {
  const handleButtonClick = async (option) => {
    const response = await contract.methods.placeBet(bookHash, option).send({ from: account });
    console.log("Response after placing bet: ", response);
  };

  return(
    <div className="betting-form-wrapper">
      <div className="betting-form-width">
        <Form>
          <Form.Group>
            <Form.Label>Enter Bet Amount: Your Balance: {balance} {balance && 'ETH'}</Form.Label>
            <Form.Control
              type="number"
              placeholder="0.0"
            />
          </Form.Group>
        </Form>
      </div>
      <div className="betting-form-button-group">
        <Button variant="danger" size="md" onClick={() => handleButtonClick(0)}>
          Option A
        </Button>
        <Button variant="primary" size="md" onClick={() => handleButtonClick(1)}>
          Option B
        </Button>
      </div>
    </div>
  );
}

export default BettingForm;
