import React from "react";
import { Redirect } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";
import AuthContext from "../../contexts/auth";
import SignupComponent from "../../components/Signup/Signup";

class Signup extends React.Component {
  state = {
    loading: true
  };

  Success = () => {
    return <Redirect to="/" />;
  };

  Fail = () => {
    if (!this.state.loading) return <SignupComponent />;
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

export default Signup;
