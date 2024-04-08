import React from 'react';

function ExitAuction({ wallet }) {
  const handleExit = async () => {
    if (!wallet) {
      console.error("No wallet connected.");
      return;
    }

    // Replace with actual method name and logic (optional)
    console.log("Exiting auction...");
    alert("You have exited the auction.");
  };

  return (
    <button onClick={handleExit}>Exit Auction</button>
  );
}

export default ExitAuction;
