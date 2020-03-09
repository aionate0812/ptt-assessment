import React from "react";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../../contexts/auth";
import { app as firebase } from "../../firebase";

class Navbar extends React.Component {
  static contextType = AuthContext;

  componentDidMount = () => {};

  toLogout = e => {
    firebase.auth().signOut();
  };

  CheckLog = () => {
    if (this.context.authStatusCheck) {
      if (this.context.user) {
        return (
          <React.Fragment>
            <li>
              <Link onClick={this.toLogout} to="/login">
                Logout
              </Link>
            </li>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </React.Fragment>
        );
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <nav>
          <div>
            <Link to="/">Logo</Link>
            <ul>
              {this.context.authStatusCheck && this.context.user ? (
                <React.Fragment>
                  <li>
                    <Link to="/">Transactions</Link>
                  </li>
                  <li>
                    <Link to="/portfolio">Portfolio</Link>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              {this.CheckLog()}
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
