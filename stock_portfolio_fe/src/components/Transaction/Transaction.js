import React from "react";

const Transaction = props => {
  const { ticker, amount, price } = props.asset;
  return (
    <div>
      <p>
        BUY({ticker}) {amount} @{Number.parseFloat(price).toFixed(2)}
      </p>
    </div>
  );
};

export default Transaction;
