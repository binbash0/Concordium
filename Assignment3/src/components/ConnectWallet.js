import React, { useState, useEffect } from 'react';

function ConnectWallet({ onConnect }) {
  const [isConcordiumAvailable, setIsConcordiumAvailable] = useState(false);

  useEffect(() => {
    // Check for Concordium
    if (window.concordium) {
      setIsConcordiumAvailable(true);
    }
  }, []);

  const connectToWallet = async () => {
    if (!isConcordiumAvailable) {
      console.error("Concordium not available.");
      return;
    }

    const web3 = new Web3(window.concordium);
    const accounts = await web3.eth.requestAccounts(); 

    if (accounts.length > 0) {
      onConnect(web3); // Passing the connected web3 instance to the parent component
    } else {
      console.error("No wallet connected.");
    }
  };

  return (
    <div className="connect-wallet">
      {!isConcordiumAvailable && <p>Concordium not available.</p>}
      {isConcordiumAvailable && (
        <button onClick={connectToWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default ConnectWallet;
