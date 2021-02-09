import React, { useState } from "react";
import { connect } from "react-redux";

import { userRegister } from "../../actions/auth";

const Register = (props) => {

  const [userRegister, setUserRegister] = useState({
    givenName: "",
    familyName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const onSubmit = (e) => {
    e.preventDefault();
    props.userRegister(userRegister);
    props.history.push("/login");
  }

  const onChange = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <input name="givenName" placeholder="Name" type="text" onChange={onChange} />
        <input name="familyName" placeholder="Last name" type="text" onChange={onChange} />
        <input name="email" placeholder="Email" type="text" onChange={onChange} />
        <input name="password" placeholder="Password" type="password" onChange={onChange} />
        <input name="passwordConfirm" placeholder="Confirm password" type="password" onChange={onChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    userRegister: (user) => dispatch(userRegister(user))
  }
}

export default connect(null, mapDispatchToProps)(Register);