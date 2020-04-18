import React from "react";
import { app as firebase } from "../../firebase";
import { getTickerPrice, postOrder } from "../../services/PortfolioReq";

class PurchaseForm extends React.Component {
  state = {
    ticker: "",
    quantity: "",
    idToken: "",
    tickerError: "",
    quantityError: "",
    balanceError: "",
    purchasing: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handlePurchase = (e) => {
    e.preventDefault();
    this.setState({ purchasing: true });
    const { ticker, quantity } = this.state;
    if (quantity > 0) {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          this.setState({ idToken });
          return getTickerPrice(ticker);
        })
        .then((res) => {
          if (res.data["Error Message"]) {
            this.setState({
              tickerError: "Could not find symbol",
              purchasing: false,
            });
            return;
          } else {
            const {
              "01. symbol": symbol,
              "02. open": open,
              "05. price": price,
            } = res.data["Global Quote"];
            return postOrder(
              symbol,
              Number.parseInt(quantity),
              price,
              this.state.idToken
            );
          }
        })
        .then((orderResponse) => {
          if (orderResponse) {
            if (orderResponse.data.balanceError) {
              this.setState({
                balanceError: orderResponse.data.balanceError,
                purchasing: false,
              });
              return;
            } else {
              this.props.refreshPortfolio(orderResponse.data);
              this.setState({
                tickerError: "",
                quantityError: "",
                balanceError: "",
                purchasing: false,
              });
            }
          }
        });
    } else {
      this.setState({
        quantityError: "Quantity should be 1 or more",
        purchasing: false,
      });
    }
  };

  render() {
    const {
      ticker,
      quantity,
      tickerError,
      quantityError,
      balanceError,
    } = this.state;
    return (
      <form>
        <label>{balanceError.length > 0 && balanceError}</label>
        <div className="form-group">
          <label htmlFor="ticker">Ticker</label>
          <input
            id="ticker"
            type="text"
            name="ticker"
            placeholder="AAPL"
            value={ticker}
            onChange={this.handleChange}
            className="form-control"
          />
          <small className="form-text text-muted">
            {tickerError.length > 0 && tickerError}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            placeholder="25"
            value={quantity}
            onChange={this.handleChange}
            className="form-control"
          />
          <small className="form-text text-muted">
            {quantityError.length > 0 && quantityError}
          </small>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handlePurchase}
          disabled={this.state.purchasing}
        >
          {this.state.purchasing ? "Purchasing..." : "Purchase"}
        </button>
      </form>
    );
  }
}

export default PurchaseForm;
