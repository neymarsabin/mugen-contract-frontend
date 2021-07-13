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

const BetList = ({ newBets }) => {
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
