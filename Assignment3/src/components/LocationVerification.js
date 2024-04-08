import React, { useState } from 'react';

function LocationVerification({ onVerify }) {
  const [isEUResident, setIsEUResident] = useState(null); // User-declared or API-derived

  const handleVerification = (isResident) => {
    setIsEUResident(isResident);
    onVerify(isResident); // Pass verification result to parent component
  };

  const verifyWithInput = () => {
    const userSelection = prompt(
      "Are you a resident of the European Union (EU)? (yes/no)",
      ""
    );
    const isResident = userSelection.toLowerCase() === 'yes';
    handleVerification(isResident);
  };

  return (
    <div className="location-verification">
      <h2>Location Verification</h2>
      <p>
        Auction participation is limited to residents of the European Union (EU).
      </p>
      <button onClick={verifyWithInput}>Declare EU Residency</button>
    </div>
  );
}

export default LocationVerification;
