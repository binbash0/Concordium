import React, { useState, useEffect } from 'react';
import AuctionInfo from './components/AuctionInfo';
import ConnectWallet from './components/ConnectWallet';
import LocationVerification from './components/LocationVerification'; // (Optional)
import PurchaseTicket from './components/PurchaseTicket';
import ExitAuction from './components/ExitAuction';

function App() {
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [isEUResident, setIsEUResident] = useState(null); // Placeholder for location verification

  const onConnectWallet = (wallet) => {
    setConnectedWallet(wallet);
  };

  const onVerifyLocation = (isResident) => {
    setIsEUResident(isResident);
  };

  useEffect(() => {
    // (Optional) Fetch auction information from backend or smart contract
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Auction dApp</h1>
        <AuctionInfo />
        {connectedWallet ? (
          <>
            <LocationVerification onVerify={onVerifyLocation} />
            {isEUResident !== null && (
              <>
                {isEUResident ? (
                  <PurchaseTicket wallet={connectedWallet} />
                ) : (
                  <p>Auction participation limited to EU residents.</p>
                )}
                <ExitAuction wallet={connectedWallet} />
              </>
            )}
          </>
        ) : (
          <ConnectWallet onConnect={onConnectWallet} />
        )}
      </header>
    </div>
  );
}

export default App;
