import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import BettingAmountOptions from '../BettingAmountOptions';
import "./styles.css";
import BetTicketModal from './BetTicketModal';
import web3 from 'web3';

const BettingConfirmationDialog = ({
  handleConfirmClick,
  handleCancelClick,
}) => {
  return(
    <div className="betting-confirm-dialog-wrapper">
      <Button onClick={handleConfirmClick}> Place your bet </Button>
      <Button onClick={handleCancelClick}> Cancel </Button>
    </div>
  );
};

function BettingForm({ contract, balance, bookHash, account }) {
  const [betAmount, setBetAmount] = useState(0);
  const [betOddsFirst, setBetOddsFirst] = useState(0);
  const [betOddsSecond, setBetOddsSecond] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [option, setOption] = useState(null);
  const [openBetTicketModal, setOpenBetTicketModal] = useState(false);
  const [betTicket, setBetTicket] = useState("");

  const handleOptionButtonClick = (option) => {
    setOption(option);
    // Call GetOdds function
    // bet odds for option 1
    contract.methods.getOdds(bookHash, option, betAmount).call().then((response) => {
      setBetOddsFirst(response);
      contract.methods.getOdds(bookHash, option, betAmount).call().then((response2) => {
        setBetOddsSecond(response2);
        setConfirmDialog(true);
      }).catch((errror) => {
        console.log("Error getting odds");
      });
    }).catch((error) => {
      console.log("error getting odds");
    });
  };

  const handleConfirmButtonClick = () => {
    // Call Place Bet Function
    contract.methods.placeBet(bookHash, option).send({ from: account, value: web3.utils.toWei(betAmount.toString(), 'ether') }).then((response) => {
      setConfirmDialog(false);
      setBetTicket(response.events.NewBet.returnValues[0]);
      setOpenBetTicketModal(true);
    }).catch((error) => {
      console.log("Error: ");
    });
  };

  const toggleModal = () => {
    setOpenBetTicketModal(!openBetTicketModal);
  };

  return(
    <div className="betting-form-wrapper">
      <BetTicketModal
        open={openBetTicketModal}
        toggleModal={toggleModal}
        betTicket={betTicket}
      />
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
      <div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div>
            Option A Bet Odds: {betOddsFirst}
          </div>
          <div>
            Option B Bet Odds: {betOddsSecond}
          </div>
        </div>
        <div className="betting-form-button-group">
          <Button variant="danger" size="md" onClick={() => handleOptionButtonClick(0)}>
            Option A
          </Button>

          <Button variant="primary" size="md" onClick={() => handleOptionButtonClick(1)}>
            Option B
          </Button>
        </div>
      </div>

      { confirmDialog &&
        <BettingConfirmationDialog
          handleCancelClick={() => setConfirmDialog(false)}
          handleConfirmClick={() => handleConfirmButtonClick()}
          bettingOddsFirst={betOddsFirst}
          bettingOddsSecond={betOddsSecond}
        />
      }

      <BettingAmountOptions
        setBetAmount={setBetAmount}
        balance={balance}
        contract
      />
    </div>
  );
}

export default BettingForm;
