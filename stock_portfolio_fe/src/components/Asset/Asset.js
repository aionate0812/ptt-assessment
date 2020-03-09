import React from "react";

const Asset = props => {
  const { ticker, open, price, amount } = props.asset;
  return (
    <div>
      <p>
        {ticker} {amount} {(Number.parseFloat(price) * amount).toFixed(2)}
      </p>
    </div>
  );
};
export default Asset;
