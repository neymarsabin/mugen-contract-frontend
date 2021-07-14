import { useState } from 'react';
import BettingAmountOptions from '../BettingAmountOptions';
import "./styles.css";
import BetTicketModal from './BetTicketModal';
import web3 from 'web3';

const BettingConfirmationDialog = ({
  handleConfirmClick,
  handleCancelClick,
  option
}) => {
  return(
    <div className="betting-confirm-dialog-wrapper">
      <button
        onClick={handleConfirmClick}
        className="place-bet-button"
      >
        Place bet for { option === 0 ? "Option A" : "Option B"}
      </button>
      <button
        onClick={handleCancelClick}
        className="cancel-button"
      >
        Cancel
      </button>
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
  const [error, setError] = useState("");

  const handleOptionButtonClick = (option) => {
    if(betAmount === "") {
      setError("Can't be blank");
      return;
    }
    setOption(option);
    // Call GetOdds function
    // bet odds for option 1
    contract.methods.getOdds(bookHash, option, parseFloat(betAmount)).call().then((response) => {
      setBetOddsFirst(response);
      contract.methods.getOdds(bookHash, option, parseFloat(betAmount)).call().then((response2) => {
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
        <form>
          <span className="balance-span">{balance > 0 ? parseFloat(balance).toFixed(2) : balance } </span>
          <input
            type="number"
            placeholder="Enter Bet Amount"
            value={betAmount}
            onChange={(e) => {
              setError("");
              setBetAmount(e.target.value);
            }}
            className="betting-form-input"
          />
          <span className="show-odds"> {betOddsFirst}:{betOddsSecond} </span>
        </form>
        { error && <span className="input-error"> Error: can't be blank </span>}
      </div>
      <div>
        <div className="betting-form-button-group">
          <button className="option-a-button" onClick={() => handleOptionButtonClick(0)}> Option A </button>
          <button className="option-b-button" onClick={() => handleOptionButtonClick(1)}> Option B </button>
        </div>
      </div>

      { confirmDialog &&
        <BettingConfirmationDialog
          handleCancelClick={() => setConfirmDialog(false)}
          handleConfirmClick={() => handleConfirmButtonClick()}
          bettingOddsFirst={betOddsFirst}
          bettingOddsSecond={betOddsSecond}
          option={option}
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
