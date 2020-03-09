import React from "react";
import { app as firebase } from "../../firebase";
import AuthContext from "../../contexts/auth";
import AuthWrapper from "../AuthWrapper";
import { Redirect, Link } from "react-router-dom";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    loading: true
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogIn = e => {
    e.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return null;
      })
      .catch(err => {
        const { message } = err;
        console.log(message);
      });
  };

  Forms = () => {
    return (
      <div>
        <form>
          <h6>Enter your email and password</h6>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <div>
            <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleLogIn}>Login</button>
          <div>
            <Link to="/signup">Create an account?</Link>
          </div>
        </form>
      </div>
    );
  };

  Success = () => {
    return <Redirect to="/" />;
  };

  Fail = () => {
    return this.state.loading ? <p>Loading</p> : <this.Forms />;
  };

  render() {
    console.log(this.state);
    return (
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
    );
  }
}
