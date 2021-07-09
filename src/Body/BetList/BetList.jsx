import "./styles.css";
import { Container, Row, Col } from "react-bootstrap";

const BetListRow = ({ blueLabel, redLabel, cash }) => {
	return (
		<Row>
			<Col className="red-col">
				<div style={{ display: "flex", justifyContent: "flex-start" }}>
					<strong className="bet-option-red">
						{cash}|{redLabel}
					</strong>
				</div>
			</Col>
			<Col className="blue-col">
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<strong className="bet-option-blue">
						{blueLabel}|{cash}
					</strong>
				</div>
			</Col>
		</Row>
	);
};

const sampleData = [
	{
		blueLabel: "Option 1",
		redLabel: "Option 2",
		cash: "$2.5k",
	},
	{
		blueLabel: "Option 1",
		redLabel: "Option 2",
		cash: "$2.5k",
	},
	{
		blueLabel: "Option 1",
		redLabel: "Option 2",
		cash: "$2.5k",
	},
	{
		blueLabel: "Option 1",
		redLabel: "Option 2",
		cash: "$2.5k",
	},
];

const BetList = () => {
	return (
		<Container style={{ width: "30%" }}>
			<Row className="fighter-header">
				<Col className="fighter-1">
					<div style={{ display: "flex", justifyContent: "flex-start" }}>
						<strong>Fighter 1</strong>
					</div>
				</Col>
				<Col className="fighter-2">
					<div style={{ display: "flex", justifyContent: "flex-end" }}>
						<strong>Fighter 2</strong>
					</div>
				</Col>
			</Row>
			{sampleData.map((sData) => {
				return (
					<BetListRow
						blueLabel={sData.blueLabel}
						redLabel={sData.redLabel}
						cash={sData.cash}
					/>
				);
			})}
		</Container>
	);
};

export default BetList;
