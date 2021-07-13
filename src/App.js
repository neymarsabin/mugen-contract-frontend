import { useState } from "react";
import "./App.css";
import BetList from "./Body/BetList/BetList";
import TwitchLiveChat from "./Body/Twitch/TwitchLiveChat";
import TwitchVideo from "./Body/Twitch/TwitchVideo";
import Header from "./Header/index.jsx";
import Web3 from "web3";
import MugenBet from './contract/MugenBet.json';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
	const [account, setAccount] = useState("");
  const [contract, setContract] = useState(undefined);
  const [gameStatus, setGameStatus] = useState(false);
  const [balance, setBalance] = useState(0);

	const loadWeb3 = () => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			window.ethereum.enable();
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			window.alert(
				"Non-Ethereum browser detected, You Should consider trying Metamask!!"
			);
		}
    loadAccount();
	};

	const loadAccount = async () => {
		const web3 = window.web3;
		const accounts = await web3.eth.getAccounts();
		setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = MugenBet.networks[networkId];
    if(networkData) {
      const abi = MugenBet.abi;
      const address = networkData.address;
      const myContract = new web3.eth.Contract(abi, address);
      setContract(myContract);
      myContract.events.NewGame({}, {fromBlock: 'latest', toBlock: 'latest'}, (error, result) => {
        if(!error) {
          console.log("Result from the blockchain", result);
          setGameStatus(true);
        } else {
          console.log("Error: Something went wrong in the blockchain: ", error);
        }
      });
      myContract.events.NewBook({}, {fromBlock: 'latest', toBlock: 'latest'}, (error, result) => {
        if(!error) {
          console.log("Result from the blockchain", result);
          setGameStatus(true);
        } else {
          console.log("Error: Something went wrong in the blockchain: ", error);
        }
      });
      web3.eth.getBalance(accounts[0], (error, result) => {
        if(!error) {
          setBalance(web3.utils.fromWei(result, 'ether'));
        } else {
          console.log("Error: ", error);
        }
      });
    } else {
      window.alert("Smart Contract not deployed to detected network");
    }
	};

	return (
		<>
			<Header

        account={account}
        connectBlockChain={loadWeb3}
      />
      <Container fluid>
        <Row noGutters>
          <Col xs={3}>
				    <BetList />
          </Col>
          <Col xs={6}>
            <TwitchVideo
              contract={contract}
              gameStatus={gameStatus}
              balance={balance}
            />
          </Col>
          <Col xs={3}>
				    <TwitchLiveChat />
          </Col>
        </Row>
      </Container>
		</>
	);
}

export default App;
