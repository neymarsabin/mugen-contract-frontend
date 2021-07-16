import { useEffect, useState } from 'react';
import "./styles.css";
import { Row, Col } from "react-bootstrap";
import web3 from 'web3';
const { toWei, fromWei } = web3.utils;

const BetListRow = ({ ticketId, address, option, amount }) => {
	return (
		<div style={{ display: "flex", justifyContent: option === "0" ? 'flex-start' : 'flex-end' }}>
			<strong className={option === "0" ? 'bet-option-red' : 'bet-option-blue'}>
				{ticketId}|{address.substring(0,8)}|{fromWei(amount, 'Ether')} {' '}ETH
			</strong>
		</div>
	);
};

const BetList = ({ contract }) => {
  const [newBets, setNewBets] = useState({});
  const [newBetTickets, setNewBetTickets] = useState([]);

  const subscribeToNewBet = () => {
    contract.events.NewBet({}, { fromBlock: 'latest', toBlock: 'latest'}, (error, result) => {
      if(!error) {
        getNewBetTickets(result.returnValues[2]);
      } else {
        console.log("Cannot receive new bet event from blockchain:", error);
      }
    });
  };

  const getNewBetTickets = (bookHash) => {
    contract.methods.getBetTickets(bookHash).call().then((result, error) => {
      setNewBetTickets(result);
    });
  };

  useEffect(() => {
    subscribeToNewBet();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const newBetsCopy = [];
    if(newBetTickets.length > 0) {
      newBetTickets.forEach((i) => {
        contract.methods.betTicketFromNFT(i).call().then((result, error) => {
          newBetsCopy[i] = result;
          setNewBets(newBetsCopy);
        });
      });
    }
  }, [newBetTickets, contract.methods]);

	return (
		<>
			<Row className="fighter-header">
				<Col className="fighter-1">
					<div style={{ display: "flex", justifyContent: "flex-start" }}>
						<strong>Option A</strong>
					</div>
				</Col>
				<Col className="fighter-2">
					<div style={{ display: "flex", justifyContent: "flex-end" }}>
						<strong>Option B</strong>
					</div>
				</Col>
			</Row>
      <Row>
        <Col xs={12} sm={6} className="red-col">
          {Object.keys(newBets).filter((betKey) => newBets[betKey].option === "0").map((betKey) => {
				    return (
					    <BetListRow
                ticketId={betKey}
						    address={newBets[betKey][0]}
                option={newBets[betKey].option}
                amount={newBets[betKey].payout}
					    />
				    );
			    })}
        </Col>
        <Col xs={12} sm={6} className="blue-col">
          {Object.keys(newBets).filter((betKey) => newBets[betKey].option === "1").map((betKey) => {
				    return (
					    <BetListRow
                ticketId={betKey}
						    address={newBets[betKey][0]}
                option={newBets[betKey].option}
                amount={newBets[betKey].payout}
					    />
				    );
			    })}
        </Col>
      </Row>
		</>
	);
};

export default BetList;
