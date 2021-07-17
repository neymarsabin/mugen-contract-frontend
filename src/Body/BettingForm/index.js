import { useState } from 'react';
import BettingAmountOptions from '../BettingAmountOptions';
import "./styles.css";
import BetTicketModal from './BetTicketModal';
import web3 from 'web3';
const { toWei, fromWei } = web3.utils;

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

function BettingForm({
  contract,
  balance,
  bookHash,
  account,
  setBalance
}) {
  const [betAmount, setBetAmount] = useState(0);
  const [betOddsFirst, setBetOddsFirst] = useState(0);
  const [betOddsSecond, setBetOddsSecond] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [option, setOption] = useState(null);
  const [openBetTicketModal, setOpenBetTicketModal] = useState(false);
  const [betTicket, setBetTicket] = useState("");
  const [error, setError] = useState("");

  const handleOptionButtonClick = async (option) => {
    if(betAmount === "") {
      setError("Can't be blank");
      return;
    }
    setOption(option);
    const betAmountWei = toWei(betAmount, 'Ether');
    const firstOdds = await contract.methods.getOdds(bookHash, "0", betAmountWei).call();
    const firstOddsRatio = fromWei(firstOdds, 'Ether')/fromWei(betAmountWei, 'Ether');
    const secondOdds = await contract.methods.getOdds(bookHash, "1", betAmountWei).call();
    const secondOddsRatio = fromWei(secondOdds, 'Ether')/fromWei(betAmountWei, 'Ether');
    setBetOddsFirst(firstOddsRatio);
    setBetOddsSecond(secondOddsRatio);
    setConfirmDialog(true);
  };

  const handleConfirmButtonClick = () => {
    // Call Place Bet Function
    contract.methods.placeBet(bookHash, option).send({ from: account, value: web3.utils.toWei(betAmount.toString(), 'ether') }).then((response) => {
      setConfirmDialog(false);
      setBetTicket(response.events.NewBet.returnValues[0]);
      setOpenBetTicketModal(true);
      setBalance(balance - betAmount);
    }).catch((error) => {
      window.alert("Error: ", error);
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
