import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import { setCurrentUser } from "../../actions/auth";

import ProtectedRoute from "../../hoc/protected-route";
import UnprotectedRoute from "../../hoc/unprotected-route";
import Navbar from "../navbar";
import Login from "../login"
import Register from "../register"
import Home from "../home";
import UserDisplay from "../user-display";

const App = ({ setCurrentUser }) => {
  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  return(
    <>
      <Navbar />
      <Route exact path="/" component={Home} />
      <UnprotectedRoute exact path="/login" component={Login} />
      <UnprotectedRoute exact path="/register" component={Register} />
      <ProtectedRoute path="/user" component={UserDisplay} />
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: () => dispatch(setCurrentUser())
  }
};

export default connect(null, mapDispatchToProps)(App);