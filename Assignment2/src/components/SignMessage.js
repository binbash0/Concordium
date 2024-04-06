import React, { useState } from 'react';
import { useWalletConnect } from '@walletconnect/web3';

const SignMessage = () => {
  const { connector, connected, accounts } = useWalletConnect();
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState(null);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState(null);

  const handleSignMessage = async () => {
    if (!connected || !message) return;

    setSigning(true);
    setError(null); // Clear any previous error

    try {
      const response = await connector.sendCustomRequest({
        method: 'concordium_sendMessageToSign', // Replace with your smart contract function name
        params: [message],
      });

      if (response.error) {
        console.error('Error signing message:', response.error);
        setError('Failed to sign message. Please try again.');
      } else {
        setSignedMessage(response.result);
      }
    } catch (err) {
      console.error('Error during signing:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setSigning(false);
    }
  };

  return (
    <div>
      <textarea placeholder="Enter message to sign" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSignMessage} disabled={!connected || !message || signing}>
        {signing ? 'Signing...' : 'Sign Message'}
      </button>
      {signedMessage && <p>Signed Message: {signedMessage}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SignMessage;
