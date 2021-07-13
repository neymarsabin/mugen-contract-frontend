import { useEffect, useState, useCallback } from 'react';
import "./styles.css";
import { Row, Col } from "react-bootstrap";

const BetListRow = ({ address, option, amount }) => {
	return (
    <>
      { option === "0" &&
				<div style={{ display: "flex", justifyContent: "flex-start" }}>
					<strong className="bet-option-red">
						{address.substring(1, 8)}|{parseInt(amount)/10**18}
					</strong>
				</div>
      }
      { option === "1" &&
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
					<strong className="bet-option-blue">
            {address.substring(1, 9)}|{parseInt(amount)/10**18}
					</strong>
				</div>
      }
    </>
	);
};

const BetList = ({ contract }) => {
  const [newBets, setNewBets] = useState([]);

  const subscribeToNewBet = () => {
    contract.events.NewBet({}, { fromBlock: 'latest', toBlock: 'latest'}, (error, result) => {
      if(!error) {
        contract.methods.betTicketFromNFT(result.returnValues[0]).call().then((result2, error2) => {
          if(!error2) {
            setNewBets([...newBets, result2]);
          } else {
            console.log("Error while getting betting data from NFT", error2);
          }
        });
      } else {
        console.log("Cannot receive new bet event from blockchain:", error);
      }
    });
  };

  useEffect(() => {
    subscribeToNewBet();
  }, []);

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
        <Col className="red-col">
          {newBets.filter((s) => s.option === "0").map((sData) => {
				    return (
					    <BetListRow
						    address={sData[0]}
                option={sData.option}
                amount={sData.payout}
					    />
				    );
			    })}
        </Col>
        <Col className="blue-col">
          {newBets.filter((s) => s.option === "1").map((sData) => {
				    return (
					    <BetListRow
						    address={sData[0]}
                option={sData.option}
                amount={sData.payout}
					    />
				    );
			    })}
        </Col>
      </Row>
		</>
	);
};

export default BetList;
