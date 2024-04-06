import React, { useState, useEffect } from 'react';
import { useWalletConnect } from '@walletconnect/web3';

const ConnectWallet = () => {
  const { connector, accounts, connected, connect, killSession } = useWalletConnect();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (connected && error) {
      setError(null); // Clear error message upon successful connection
    }
  }, [connected, error]);

  const handleConnect = async () => {
    setConnecting(true);
    setError(null); // Clear any previous error

    try {
      await connect();
    } catch (err) {
      console.error(err);
      setError('Connection failed. Please try again.');
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await killSession();
    } catch (err) {
      console.error(err);
      setError('Disconnection failed. Please try again.');
    }
  };

  return (
    <div>
      {connected ? (
        <button onClick={handleDisconnect}>Disconnect Wallet</button>
      ) : (
        <button onClick={handleConnect} disabled={connecting}>
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
      {connected && <p>Connected Account: {accounts[0]}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ConnectWallet;
