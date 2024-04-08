import React, { useState } from 'react';

function PurchaseTicket({ wallet }) {
  const [isPurchasing, setIsPurchasing] = useState(false); // Track purchase state

  const purchaseTicket = async () => {
    if (!wallet) {
      console.error("No wallet connected.");
      return;
    }

    setIsPurchasing(true); // Set loading state

    try {
      const auctionContractAddress = '42ABq7boRCdw6WZAnWPviSHDnfWhwoJBk4KvCE89GYeZTs1bvw';
      const methodName = 'purchaseTicket'; 
      const arguments = [10]; 

      const tx = await wallet.sendTransaction({
        contractAddress: auctionContractAddress,
        methodName,
        arguments,
      });
      console.log("Ticket purchase transaction:", tx);
      alert("Ticket purchase successful! Transaction ID: " + tx);
      setIsPurchasing(false); // Reset loading state
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      alert("Error purchasing ticket. Please try again.");
      setIsPurchasing(false); // Reset loading state
    }
  };

  return (
    <button onClick={purchaseTicket} disabled={isPurchasing}>
      {isPurchasing ? "Purchasing Ticket..." : "Purchase Ticket"}
    </button>
  );
}

export default PurchaseTicket;
