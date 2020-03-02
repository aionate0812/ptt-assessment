import React from "react";
import { app as firebase } from "../../firebase";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  handleInput = e => {
    const { name: inputName, value } = e.target;
    this.setState({ [inputName]: value });
  };

  handleCreateUser = e => {
    const { email, password } = this.state;
    e.preventDefault();
    console.log(e);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return firebase.auth().currentUser.getIdToken(true);
      })
      .then(idToken => {
        console.log(idToken);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { username, email, password } = this.state;
    console.log(this.state);
    return (
      <div>
        <form>
          <input
            type="text"
            value={username}
            name="username"
            onChange={this.handleInput}
          />
          <input
            type="email"
            value={email}
            name="email"
            onChange={this.handleInput}
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={this.handleInput}
          />
          <button type="submit" onClick={this.handleCreateUser}>
            Create Account
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
