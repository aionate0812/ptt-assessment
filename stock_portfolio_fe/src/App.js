import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { app as firebase } from "./firebase";
import "bootstrap/dist/css/bootstrap.css";
// import "./app.css";
// import "./helper.css";

//====Context
import AuthContext from "./contexts/auth";

//===Components
import Signup from "./containers/Signup/Signup";
import Navbar from "./containers/Navbar/Navbar";
import Login from "./containers/Login/Login";
import Portfolio from "./containers/Portfolio/Portfolio";
import Transactions from "./containers/Transactions/Transactions";

class App extends Component {
  state = {
    user: null,
    authStatusCheck: false
  };

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log("user", user);
      if (user) {
        this.setState({ user, authStatusCheck: true });
      } else {
        console.log(user);
        this.setState({ user: null, authStatusCheck: true });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={this.state}>
          <Route path="/" component={Navbar} />
          <Switch>
            <Route path="/" exact>
              <Redirect to="/portfolio" />
            </Route>
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/portfolio" exact component={Portfolio} />
            <Route path="/transactions" exact component={Transactions} />
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
