import React from "react";
import { app as firebase } from "../../firebase";
import { getTickerPrice, postOrder } from "../../services/PortfolioReq";

class PurchaseForm extends React.Component {
  state = {
    ticker: "",
    quantity: "",
    idToken: "",
    tickerError: "",
    quantityError: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlePurchase = e => {
    e.preventDefault();
    const { ticker, quantity } = this.state;
    if (quantity > 0) {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          this.setState({ idToken });
          return getTickerPrice(ticker);
        })
        .then(res => {
          if (res.data["Error Message"]) {
            this.setState({ tickerError: "Could not find symbol" });
            return;
          } else {
            const {
              "01. symbol": symbol,
              "02. open": open,
              "05. price": price
            } = res.data["Global Quote"];
            return postOrder(
              symbol,
              Number.parseInt(quantity),
              price,
              this.state.idToken
            );
          }
        })
        .then(orderResponse => {
          if (orderResponse) {
            this.props.refreshPortfolio(orderResponse.data);
            this.setState({ tickerError: "", quantityError: "" });
          }
        });
    } else {
      this.setState({ quantityError: "Quantity should be 1 or more" });
    }
  };

  render() {
    const { ticker, quantity, tickerError, quantityError } = this.state;
    return (
      <form>
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
        >
          Purchase
        </button>
      </form>
    );
  }
}

export default PurchaseForm;
