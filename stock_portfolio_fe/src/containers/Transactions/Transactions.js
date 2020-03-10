import React from "react";
import AuthWrapper from "../AuthWrapper";
import AuthContext from "../../contexts/auth";
import TransactionsComponent from "../../components/Transactions/Transactions";
import { Redirect } from "react-router-dom";

class Transactions extends React.Component {
  state = {
    loading: true
  };

  Success = () => {
    return <TransactionsComponent />;
  };

  Fail = () => {
    if (!this.state.loading) return <Redirect to="/signup" />;
    else {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }
    return <></>;
  };
  render() {
    return (
      <>
        <AuthContext.Consumer>
          {user => {
            return (
              <AuthWrapper
                user={user}
                success={<this.Success user={user} />}
                fail={<this.Fail />}
              />
            );
          }}
        </AuthContext.Consumer>
      </>
    );
  }
}

export default Transactions;
