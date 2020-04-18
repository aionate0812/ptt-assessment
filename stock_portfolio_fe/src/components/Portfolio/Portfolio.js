import React from "react";
import PurchaseForm from "../PurchaseForm/PurchaseForm";
import { app as firebase } from "../../firebase";
import Assets from "../Assets/Assets";
import {
  getAssets,
  getTickerPrice,
  getBalance,
} from "../../services/PortfolioReq";

class Portfolio extends React.Component {
  state = {
    idToken: "",
    ownedAssets: [],
    availableBalance: "",
  };
  componentDidMount() {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then((idToken) => {
        this.setState({ idToken });
        return getAssets(idToken);
      })
      .then((ownedAssets) => {
        console.log(ownedAssets);
        let assetsTickers = ownedAssets.map((e) => getTickerPrice(e.ticker));
        this.setState({ ownedAssets });
        return Promise.all(assetsTickers);
      })
      .then((assets) => {
        console.log(assets);
        let latestAssetsInfo = {};
        assets.length > 0 &&
          assets.forEach((e) => {
            const {
              "01. symbol": ticker,
              "02. open": open,
              "05. price": price,
            } = e.data["Global Quote"];
            latestAssetsInfo[ticker] = { open, price };
          });
        let ownedAssets = this.state.ownedAssets.map((e) => {
          e.price = latestAssetsInfo[e.ticker].price;
          e.open = latestAssetsInfo[e.ticker].open;
          return e;
        });
        this.setState({ ownedAssets });
        return getBalance(this.state.idToken);
      })
      .then((balance) => {
        this.setState({ availableBalance: balance.balance });
      });
  }

  refreshPortfolio = (ownedAssets) => {
    console.log(ownedAssets);
    let assetsTickers = ownedAssets.map((e) => getTickerPrice(e.ticker));
    this.setState({ ownedAssets });
    Promise.all(assetsTickers).then((assets) => {
      console.log(assets);
      let latestAssetsInfo = {};
      assets.length > 0 &&
        assets.forEach((e) => {
          console.log(e);
          const {
            "01. symbol": ticker,
            "02. open": open,
            "05. price": price,
          } = e.data["Global Quote"];
          latestAssetsInfo[ticker] = { open, price };
        });
      let ownedAssets = this.state.ownedAssets.map((e) => {
        e.price = latestAssetsInfo[e.ticker].price;
        e.open = latestAssetsInfo[e.ticker].open;
        return e;
      });
      getBalance(this.state.idToken).then((balance) => {
        this.setState({ availableBalance: balance.balance, ownedAssets });
      });
    });
  };

  render() {
    const { ownedAssets, availableBalance } = this.state;
    return (
      <div className="container">
        <h2 className="mt-3">
          <u>Portfolio</u>
        </h2>
        <div className="d-flex">
          <div className="col-8 pl-0 mt-5">
            <Assets assets={ownedAssets} />
          </div>
          <div className="card col-4 p-3 mt-5">
            <h3>Available Balance ${availableBalance}</h3>
            <PurchaseForm refreshPortfolio={this.refreshPortfolio} />
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
