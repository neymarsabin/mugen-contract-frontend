import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './styles.css';

const CollectBetForm = ({
  open,
  toggleCollectBetModal,
  contract
}) => {

  const [betTicketId, setBetTicketId] = useState(0);
  const [error, setError] = useState(false);

  const handleSubmit = (id) => {
    if(id === "") {
      setError(true);
      return;
    }
    contract.methods.settleBet(parseInt(id)).call().then((result, error) => {
      if(!error) {
        console.log("You have won the bet");
      } else {
        setError(true);
      }
    });
  };

  return(
    <Modal show={open}>
      <Modal.Header>
        <Modal.Title>
          Collect Bet
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { !error && <span className="notification-text"> You will receive your odds if you have won the bet:</span> }
        { error && <span className="error"> Error:  </span> }
        <form>
          <div> bet ticket id: </div>
          <input
            type="number"
            placeholder="Enter bet ticket id: "
            className="collect-bet-form"
            value={betTicketId}
            onChange={(e) => {
              setError(false);
              setBetTicketId(e.target.value);
            }}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => handleSubmit(betTicketId)}>
          Submit
        </Button>
        <Button variant="secondary" onClick={toggleCollectBetModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CollectBetForm;
