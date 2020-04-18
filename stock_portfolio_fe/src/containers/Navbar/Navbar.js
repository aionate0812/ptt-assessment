import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth";
import { app as firebase } from "../../firebase";

class Navbar extends React.Component {
  static contextType = AuthContext;

  componentDidMount = () => {};

  toLogout = (e) => {
    firebase.auth().signOut();
  };

  CheckLog = () => {
    if (this.context.authStatusCheck) {
      if (this.context.user) {
        return (
          <React.Fragment>
            <li className="nav-item">
              <Link className="nav-link" onClick={this.toLogout} to="/login">
                Logout
              </Link>
            </li>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </li>
          </React.Fragment>
        );
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <h3>
            <Link to="/">Stonks</Link>
          </h3>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-row-reverse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              {this.context.authStatusCheck && this.context.user ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/transactions">
                      Transactions
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/portfolio">
                      Portfolio
                    </Link>
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
