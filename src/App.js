import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [connectButtonText, setConnButtonText] = useState("Connect Wallet");

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const handleWalletConnect = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log(result);
          accountChangedhandler(result[0]);
          setConnButtonText("Connected");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Need to install Metamask!");
    }
  };

  const accountChangedhandler = (account) => {
    console.log(`Current account: ${account}`);
    setCurrentAccount(account);
    updateEthers();
  };

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(tempProvider);
    setProvider(tempProvider);
    setSigner(tempProvider.getSigner());
    let network = await tempProvider.getNetwork();
    console.log(network);
  };

  return (
    <div>
      <h1>Metamask Authentication</h1>
      <button onClick={handleWalletConnect}>{connectButtonText}</button>
      <h3>Address: {currentAccount ?? ""}</h3>
    </div>
  );
}

export default App;
