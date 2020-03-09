import React from "react";
import PurchaseForm from "../PurchaseForm/PurchaseForm";
import { app as firebase } from "../../firebase";
import Assets from "../Assets/Assets";
import { getAssets, getTickerPrice } from "../../services/PortfolioReq";

class Portfolio extends React.Component {
  state = {
    idToken: "",
    ownedAssets: []
  };
  componentDidMount() {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        this.setState({ idToken });
        return getAssets(idToken);
      })
      .then(ownedAssets => {
        let assetsTickers = ownedAssets.map(e => getTickerPrice(e.ticker));
        this.setState({ ownedAssets });
        return Promise.all(assetsTickers);
      })
      .then(assets => {
        let latestAssetsInfo = {};
        console.log(assets);
        assets.length > 0 &&
          assets.forEach(e => {
            const {
              "01. symbol": ticker,
              "02. open": open,
              "05. price": price
            } = e.data["Global Quote"];
            latestAssetsInfo[ticker] = { open, price };
          });
        let ownedAssets = this.state.ownedAssets.map(e => {
          e.price = latestAssetsInfo[e.ticker].price;
          e.open = latestAssetsInfo[e.ticker].open;
          return e;
        });
        this.setState({ ownedAssets });
      });
  }
  render() {
    const { ownedAssets } = this.state;
    console.log(this.state);
    return (
      <div>
        <PurchaseForm />
        <Assets assets={ownedAssets} />
      </div>
    );
  }
}

export default Portfolio;
