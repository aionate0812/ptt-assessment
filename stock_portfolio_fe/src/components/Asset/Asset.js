import React from "react";

const Asset = (props) => {
  const { ticker, open, price, amount } = props.asset;
  let priceColor =
    Number.parseFloat(price) > Number.parseFloat(open)
      ? "text-success"
      : Number.parseFloat(price) < Number.parseFloat(open)
      ? "text-danger"
      : "text-muted";
  return (
    <div className="d-flex justify-content-between col-8 border-bottom border-dark px-0 pt-3">
      <div className="col-6 px-0">
        <p>
          <span className="font-weight-bold">{ticker}</span> - {amount} Shares
        </p>
      </div>
      <div className="col-4 px-0">
        <p className={priceColor}>
          ${(Number.parseFloat(price) * amount).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
export default Asset;
