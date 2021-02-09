import React from "react";

import { Link } from "react-router-dom";

const AuthoritativeNavbar = ({ user, logoutHandler }) => {
  const { givenName, familyName, email } = user;
  return (
    <ul>
      <Link to="/">
        <li>
          Home
        </li>
      </Link>
      <li>You are: {`${givenName} ${familyName}`}</li>
      <li>Your email: {`${email}`}</li>
      <div>
        <button type="button" onClick={logoutHandler}>Logout</button>
      </div>
    </ul>
  );
}

export default AuthoritativeNavbar;