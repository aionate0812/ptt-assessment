import React from "react";
import { app as firebase } from "../../firebase";
import { getAllAssets } from "../../services/TransactionsReq";
import Transaction from "../Transaction/Transaction";

class Transactions extends React.Component {
  state = {
    idToken: "",
    ownedAssets: [],
  };
  componentDidMount() {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then((idToken) => {
        this.setState({ idToken });
        return getAllAssets(idToken);
      })
      .then((ownedAssets) => {
        this.setState({ ownedAssets });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { ownedAssets } = this.state;
    return (
      <div className="container">
        <h1>
          <u>Transactions</u>
        </h1>
        <div className="py-4">
          {ownedAssets.map((asset, i) => (
            <Transaction key={i} asset={asset} />
          ))}
        </div>
      </div>
    );
  }
}

export default Transactions;
