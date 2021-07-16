import { useState } from "react";
import "./App.css";
import BetList from "./Body/BetList/BetList";
import TwitchLiveChat from "./Body/Twitch/TwitchLiveChat";
import TwitchVideo from "./Body/Twitch/TwitchVideo";
import Header from "./Header/index.jsx";
import web3 from "web3";
import MugenBet from './contract/MugenBet.json';
import { Container, Row, Col } from 'react-bootstrap';
import CollectBetForm from './Body/CollectBetForm';

function App() {
	const [account, setAccount] = useState("");
  const [contract, setContract] = useState(undefined);
  const [gameStatus, setGameStatus] = useState(false);
  const [bookHash, setBookHash] = useState("");
  const [showCollectButton, setShowCollectButton] = useState(false);
  const [collectModal, setCollectModal] = useState(false);

	const loadWeb3 = async () => {
		if (window.ethereum) {
			window.web3 = new web3(window.ethereum);
			window.ethereum.enable();
		} else if (window.web3) {
			window.web3 = new web3(window.web3.currentProvider);
		} else {
			window.alert(
				"Non-Ethereum browser detected, You Should consider trying Metamask!!"
			);
		}
    loadAccount();
	};

  const subscribeToNewGame = (myContract) => {
    myContract.events.NewGame({}, {fromBlock: 'latest', toBlock: 'latest'}, (error, result) => {
      if(!error) {
        setGameStatus(true);
        setCollectModal(false);
      } else {
        window.alert("Error: Something went wrong in the blockchain: ", error);
      }
    });
  };

  const subscribeToNewBook = async (myContract) => {
    let latestBlock;
    if(myContract) {
      latestBlock = await window.web3.eth.getBlockNumber();
    }
    myContract.events.NewBook({}, {fromBlock: latestBlock, toBlock: 'latest'}, (error, result) => {
      if(!error) {
        setBookHash(result.returnValues[1]);
        setGameStatus(true);
      } else {
        window.alert("Error: Something went wrong in the blockchain: ", error);
      }
    });
  };

  const subscribeToGameOver = (myContract) => {
    myContract.events.GameOver({}, { fromBlock: 'latest', toBlock: 'latest'}, (error, result) => {
      if(!error) {
        setGameStatus(false);
        setBookHash("");
        setShowCollectButton(true);
      } else {
        window.alert("Error cannot recieve game over event: ", error);
      }
    });
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
      // checkIfAGameIsRunning(myContract);
      subscribeToNewGame(myContract);
      subscribeToNewBook(myContract);
      subscribeToGameOver(myContract);
    } else {
      window.alert("Smart Contract not deployed to detected network");
    }
	};

	return (
		<>
      { collectModal &&
        <CollectBetForm
          open={collectModal}
          toggleCollectBetModal={() => setCollectModal(!collectModal)}
          contract={contract}
        />
      }
			<Header
        account={account}
        connectBlockChain={loadWeb3}
        showCollectButton={showCollectButton}
        handleCollectBetClick={() => setCollectModal(true)}
      />
      <Container fluid>
        <Row noGutters>
          <Col xs={3}>
            { contract &&
				      <BetList
                contract={contract}
                gameStatus={gameStatus}
              />
            }
          </Col>
          <Col xs={6}>
            <TwitchVideo
              contract={contract}
              gameStatus={gameStatus}
              bookHash={bookHash}
              account={account}
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
