import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import BettingAmountOptions from '../BettingAmountOptions';
import "./styles.css";

const BettingConfirmationDialog = ({
  handleConfirmClick,
  handleCancelClick,
  bettingOdds,
}) => {
  return(
    <>
      <p> Your betting odds are: {bettingOdds} </p>
      <Button onClick={handleConfirmClick}> Place your bet </Button>
      <Button onClick={handleCancelClick}> Cancel </Button>
    </>
  );
};

function BettingForm({ contract, balance, bookHash, account }) {
  const [betAmount, setBetAmount] = useState(0);
  const [betOdds, setBetOdds] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [option, setOption] = useState(null);

  const handleButtonClick = (option) => {
    setOption(option);
    // Call GetOdds function
    contract.methods.getOdds(bookHash, option, betAmount).call().then((response) => {
      setBetOdds(response);
      setConfirmDialog(true);
    }).catch((error) => {
      console.log("error getting odds");
    });
  };

  const handleConfirmButtonClick = () => {
    // Call Place Bet Function
    contract.methods.placeBet(bookHash, option).send({ from: account, value: betOdds }).then((response) => {
      setConfirmDialog(false);
    }).catch((error) => {
      console.log("Error: ");
    });
  };

  if(confirmDialog) {
    return(
      <div className="betting-form-wrapper">
        <BettingConfirmationDialog
          handleCancelClick={() => setConfirmDialog(false)}
          handleConfirmClick={() => handleConfirmButtonClick()}
          bettingOdds={betOdds}
        />
      </div>
    );
  } else {
    return(
      <div className="betting-form-wrapper">
        <div className="betting-form-width">
          <Form>
            <Form.Group>
              <Form.Label>Balance: {balance} {balance && 'ETH'}</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Bet Amount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
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

        <BettingAmountOptions
          setBetAmount={setBetAmount}
          balance={balance}
          contract
        />
      </div>
    );
  }
}

export default BettingForm;
