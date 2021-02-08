import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { userLogin } from "../../actions/auth";

const Login = ({ userLogin, isAuthenticated, history }) => {

  const [user, setUser] = useState({ username: "", password: "" });

  const onSubmit = e => {
    e.preventDefault();
    userLogin(user);
  }

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);


  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={user.username} type="text" name="username" placeholder="Input username" />
        <input onChange={onChange} value={user.password} type="password" name="password" placeholder="Input password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;
  return {
    isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (user) => dispatch(userLogin(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);