import { useState, useEffect } from 'react';
import "./App.css";
import Header from "./Header/index.jsx";
import Web3 from 'web3';

function App() {
  const [account, setAccount] = useState('');

  const loadWeb3 = () => {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Ethereum browser detected, You Should consider trying Metamask!!");
    }
  };

  const loadAccount = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  useEffect(() => {
    loadWeb3();
    loadAccount();
  }, []);

	return (
		<div className="App">
			<Header
        account={account}
      />
		</div>
	);
}

export default App;
