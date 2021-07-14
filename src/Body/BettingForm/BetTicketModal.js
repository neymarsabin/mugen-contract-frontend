import { Modal, Button } from 'react-bootstrap';

const BetTicketModal = ({
  betTicket,
  toggleModal,
  open
}) => {
  return(
    <Modal show={open}>
      <Modal.Header>
        <Modal.Title>Bet Ticket ID</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your bet ticket id is:  <strong>{betTicket}</strong> , you will need this to collect your winnings.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BetTicketModal;
