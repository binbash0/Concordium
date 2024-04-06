import React, { useState } from 'react';
import { useWalletConnect } from '@walletconnect/web3';

const StoreMessage = ({ signedMessage }) => {
  const { connector, connected } = useWalletConnect();
  const [storing, setStoring] = useState(false);
  const [error, setError] = useState(null);

  const handleStoreMessage = async () => {
    if (!connected || !signedMessage) return;

    setStoring(true);
    setError(null); // Clear any previous error

    try {
      const response = await connector.sendCustomRequest({
        method: 'concordium_storeSignedMessage', // Replace with your smart contract function name
        params: [signedMessage],
      });

      if (response.error) {
        console.error('Error storing message:', response.error);
        setError('Failed to store message. Please try again.');
      } else {
        console.log('Message stored successfully!');
        // Consider displaying a success message to the user
      }
    } catch (err) {
      console.error('Error during storing:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setStoring(false);
    }
  };

  return (
    <div>
      <button onClick={handleStoreMessage} disabled={!connected || !signedMessage || storing}>
        {storing ? 'Storing...' : 'Store Signed Message'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default StoreMessage;
