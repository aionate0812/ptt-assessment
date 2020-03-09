import React from "react";
import { app as firebase } from "../../firebase";
import { getTickerPrice, postOrder } from "../../services/PortfolioReq";

class PurchaseForm extends React.Component {
  state = {
    ticker: "",
    quantity: 0,
    idToken: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlePurchase = e => {
    e.preventDefault();
    const { ticker, quantity } = this.state;
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        this.setState({ idToken });
        return getTickerPrice(ticker);
      })
      .then(res => {
        if (res.data["Error Message"]) {
          console.log("Could not find symbol");
          return;
        }
        const {
          "01. symbol": symbol,
          "02. open": open,
          "05. price": price
        } = res.data["Global Quote"];
        return postOrder(symbol, quantity, price, this.state.idToken);
      })
      .then(orderResponse => {
        console.log(orderResponse);
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 404) {
          console.log({ symbol: null, message: err.response.data });
        }
      });
  };

  render() {
    const { ticker, quantity } = this.state;
    return (
      <form>
        <label>Ticker</label>
        <input
          type="text"
          name="ticker"
          value={ticker}
          onChange={this.handleChange}
        />
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handlePurchase}>
          Purchase
        </button>
      </form>
    );
  }
}

export default PurchaseForm;
