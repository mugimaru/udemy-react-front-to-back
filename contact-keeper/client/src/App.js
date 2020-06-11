import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import AlertState from "./context/alert/AlertState";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";

import Alerts from "./components/layout/Alerts";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const App = () => {
  return (
    <div className="App">
      <AuthState>
        <ContactState>
          <AlertState>
            <Router>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Router>
          </AlertState>
        </ContactState>
      </AuthState>
    </div>
  );
};

export default App;
