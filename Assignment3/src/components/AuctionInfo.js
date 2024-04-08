import React from 'react';

function AuctionInfo({ auctionData }) {
  
  const { item, startingPrice, currentBid, ...otherInfo } = auctionData || {};

  return (
    <div className="auction-info">
      <h2>Auction Information</h2>
      <p>Item: {item}</p>
      <p>Starting Price: {startingPrice}</p>
      <p>Current Bid: {currentBid}</p>
    </div>
  );
}

export default AuctionInfo;
