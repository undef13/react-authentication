import React from "react";

import { Link } from "react-router-dom";

const UnauthoritativeNavbar = () => {
  return (
    <ul>
      <Link to="/">
        <li>
          Home
        </li>
      </Link>
      <Link to="/login">
        <li>
          Login
        </li>
      </Link>
      <Link to="/register">
        <li>
          Register
        </li>
      </Link>
    </ul>
  )
}

export default UnauthoritativeNavbar;