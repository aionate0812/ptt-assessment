import React from "react";

const Transaction = (props) => {
  const { ticker, amount, price } = props.asset;
  return (
    <div className="col-5 border-bottom border-dark pl-0 pt-3">
      <p>
        <span className="font-weight-bold">BUY</span>(
        <span className="font-italic">{ticker}</span>) - {amount} Shares @ $
        {Number.parseFloat(price).toFixed(2)}
      </p>
    </div>
  );
};

export default Transaction;
