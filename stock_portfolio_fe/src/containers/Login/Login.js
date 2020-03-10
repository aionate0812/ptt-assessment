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
      <div className="container d-flex justify-content-center">
        <div className="card p-3 mt-5 col-8">
          <form>
            <h2 className="text-center">Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email@ttp.com"
                value={this.state.email}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                value={this.state.password}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <button className="btn btn-primary" onClick={this.handleLogIn}>
              Login
            </button>
            <div className="mt-2">
              <Link to="/signup">Create an account?</Link>
            </div>
          </form>
        </div>
      </div>
    );
  };

  Success = () => {
    return <Redirect to="/" />;
  };

  Fail = () => {
    return this.state.loading ? <></> : <this.Forms />;
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
