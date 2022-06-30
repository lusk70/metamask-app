import React, { useState, useEffect } from "react";

function App() {
  const [account, setAccount] = useState("-");
  const [chainId, setChainId] = useState("-");
  const [errorMessage, setErrorMessage] = useState(null);

  const ConnectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((result) => {
            setAccount(result[0]);
          });
        await window.ethereum
          .request({
            method: "eth_chainId",
          })
          .then((result) => {
            setChainId(result);
          });
      } catch (err) {
        setErrorMessage(err);
      }
    } else {
      setErrorMessage("Need to install Metamask!!");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", ConnectWalletHandler);
      window.ethereum.on("chainChanged", ConnectWalletHandler);
    }
  }, []);

  return (
    <div>
      <p>MetaMask Test</p>
      <button onClick={ConnectWalletHandler}>Connect Wallet</button>
      <p>Connected with: {account}</p>
      <p>chainId is: {chainId}</p>
      {errorMessage ? <p>Error: {errorMessage}</p> : null}
    </div>
  );
}

export default App;
