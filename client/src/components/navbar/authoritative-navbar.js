import React from "react";

import { Link } from "react-router-dom";

const AuthoritativeNavbar = ({ user, logoutHandler }) => {
  return (
    <ul>
      <Link to="/">
        <li>
          Home
        </li>
      </Link>
      <li>You are: {`${user.givenName} "${user.username}" ${user.familyName}`}</li>
      <div>
        <button type="button" onClick={logoutHandler}>Logout</button>
      </div>
    </ul>
  );
}

export default AuthoritativeNavbar;