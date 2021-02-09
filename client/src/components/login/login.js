// Dependencies
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";

// Actions
import { userLogin, userGoogleLogin } from "../../actions/auth";

const Login = ({ userLogin, userGoogleLogin, isAuthenticated, history }) => {

  const [user, setUser] = useState({ email: "", password: "" });

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

  const handleLogin = async googleData => {
    userGoogleLogin(googleData);
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={user.email} type="text" name="email" placeholder="Input email" />
        <input onChange={onChange} value={user.password} type="password" name="password" placeholder="Input password" />
        <button type="submit">Submit</button>
      </form>
      <GoogleLogin 
        clientId="1051398545639-mpgsb6eo4esvtvttqq7m9ts6g0du0hb3.apps.googleusercontent.com"
        buttonText="Log In with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
      />
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
    userLogin: (user) => dispatch(userLogin(user)),
    userGoogleLogin: (googleData) => dispatch(userGoogleLogin(googleData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);