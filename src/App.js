import { useState } from "react";
import "./App.css";
import BetList from "./Body/BetList/BetList";
import TwitchLiveChat from "./Body/Twitch/TwitchLiveChat";
import TwitchVideo from "./Body/Twitch/TwitchVideo";
import Header from "./Header/index.jsx";
import Web3 from "web3";
import MugenBet from './contract/MugenBet.json';

function App() {
	const [account, setAccount] = useState("");

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
    const abi = [];
    const networkId = await web3.eth.net.getId();
    const networkData = MugenBet.networks[networkId];
    if(networkData) {
      const address = networkData.address;
      const myContract = new web3.eth.Contract(abi, address);
      console.log("all events in the blockchain: ", myContract.events);
      // subscribing to NewGame event in blockchain::::
      myContract.events.NewGame({}, (error, data) => {
        if(error) {
          console.log("This is an error: ");
        } else {
          console.log("Log Data: ", + data);
        }
      });
    } else {
      window.alert("Smart Contract not deployed to detected network");
    }
	};

	return (
		<div className="App">
			<Header
        account={account}
        connectBlockChain={loadWeb3}
      />
			<div className="body">
				<BetList />
				<TwitchVideo />
				<TwitchLiveChat />
			</div>
		</div>
	);
}

export default App;
