import React from "react";
import { app as firebase } from "../../firebase";
import { insertUser } from "../../services/SignupReq";
import "bootstrap/dist/css/bootstrap.css";
import { Redirect } from "react-router-dom";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    errorMessage: "",
    signupSuccess: false,
  };

  handleInput = (e) => {
    const { name: inputName, value } = e.target;
    this.setState({ [inputName]: value });
  };

  handleCreateUser = (e) => {
    const { username, email, password } = this.state;
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return firebase.auth().currentUser.getIdToken(true);
      })
      .then((idToken) => {
        return insertUser(username, email, idToken);
      })
      .then((res) => {
        if (res.data.portfolioid) {
          this.setState({ signupSuccess: true });
        }
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          this.setState({ errorMessage: err.message });
        }
      });
  };

  render() {
    const {
      username,
      email,
      password,
      errorMessage,
      signupSuccess,
    } = this.state;
    return signupSuccess ? (
      <Redirect to="/login" />
    ) : (
      <div className="container d-flex justify-content-center">
        <div className="card p-3 mt-5 col-8">
          <h2 className="text-center">Registration</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input
                id="username"
                type="text"
                placeholder="alex"
                value={username}
                name="username"
                onChange={this.handleInput}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="email@ttp.com"
                value={email}
                name="email"
                onChange={this.handleInput}
                className="form-control"
              />
              <small className="form-text text-muted">
                {errorMessage.length > 0 && errorMessage}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="******"
                name="password"
                onChange={this.handleInput}
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleCreateUser}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
