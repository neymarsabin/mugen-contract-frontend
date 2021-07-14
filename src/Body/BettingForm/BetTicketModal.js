import { Modal, Button } from 'react-bootstrap';

const BetTicketModal = ({
  betTicket,
  toggleModal,
  open
}) => {
  return(
    <Modal show={open}>
      <Modal.Header closeButton>
        <Modal.Title>Bet Ticket ID</Modal.Title>
      </Modal.Header>
      <Modal.Body>Copy your bet ticket id: {betTicket}, you will need this to collect your winnings.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BetTicketModal;
