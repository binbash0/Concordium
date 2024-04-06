import React, { useState } from 'react';
import { useWalletConnect } from '@walletconnect/web3';

const TransferCCD = () => {
  const { connector, connected, accounts } = useWalletConnect();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [transferring, setTransferring] = useState(false);
  const [error, setError] = useState(null);

  const handleTransferCCD = async () => {
    if (!connected || !recipientAddress || !amount || amount <= 0) return;

    setTransferring(true);
    setError(null); // Clear any previous error

    try {
      const response = await connector.sendCustomRequest({
        method: 'concordium_transferCCD', // Replace with your smart contract function name
        params: [recipientAddress, amount],
      });

      if (response.error) {
        console.error('Error transferring CCD:', response.error);
        setError('Failed to transfer CCD. Please try again.');
      } else {
        console.log('CCD transfer successful!');
        // Consider displaying a success message to the user
        setRecipientAddress('');
        setAmount(0); // Clear input fields after successful transfer
      }
    } catch (err) {
      console.error('Error during transfer:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setTransferring(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <input type="number" placeholder="CCD Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleTransferCCD} disabled={!connected || transferring || amount <= 0}>
        {transferring ? 'Transferring...' : 'Transfer CCD'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TransferCCD;
