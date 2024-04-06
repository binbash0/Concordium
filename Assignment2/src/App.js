import React, { useState, useEffect } from 'react';
import ConnectWallet from './components/ConnectWallet';
import SignMessage from './components/SignMessage'; // Placeholder
import StoreMessage from './components/StoreMessage'; // Placeholder
import TransferCCD from './components/TransferCCD'; // Placeholder

const App = () => {
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const handleConnect = (payload) => {
      setConnected(true);
      setAccounts(payload.params[0].accounts);
    };

    const handleDisconnect = () => {
      setConnected(false);
      setAccounts([]);
    };

    // Subscribe to WalletConnect events (if using a library like @walletconnect/web3)
    window.walletConnect.on('connect', handleConnect);
    window.walletConnect.on('disconnect', handleDisconnect);

    // Unsubscribe on component unmount
    return () => {
      window.walletConnect.off('connect', handleConnect);
      window.walletConnect.off('disconnect', handleDisconnect);
    };
  }, []);

  return (
    <div className="App">
      <h1>Concordium dApp with WalletConnect</h1>
      <ConnectWallet />
      {connected && (
        <>
          <p>Connected Account: {accounts[0]}</p>
          <SignMessage /> {/* Placeholder for signing functionality */}
          <StoreMessage /> {/* Placeholder for storing signed message*/}
          <TransferCCD /> {/* Placeholder for transferring CCDs */}
        </>
      )}
    </div>
  );
};

export default App;
