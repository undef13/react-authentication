// Dependencies
const express = require("express");
const passport = require("passport");
const passportConfig = require("../config/passport");
const User = require("../models/User");
const JWT = require("jsonwebtoken");
const router = express.Router();

const response = (res, status, responseBody) => {
  return res.status(status).json(responseBody);
};

// /accounts/register/
router.post("/register", async (req, res) => {
  const {
    username,
    password,
    passwordConfirm,
    givenName,
    familyName,
  } = req.body;
  
  if(username.length < 6) {
    return response(res, 400, {
      isError: true,
      message: "Username must be at least 6 characters."
    });
  }else if (!/^[a-z0-9]+$/i.test(username)) {
    return response(res, 400, {
      isError: true,
      message: "Username must contain only numbers and letters."
    });
  }

  if(givenName.length < 3 || givenName.length > 15) {
    return response(res, 400, {
      isError: true,
      message: "Name must be between 6 and 15 characters long."
    });
  } else if(familyName.length < 3 || familyName.length > 15) {
    return response(res, 400, {
      isError: true,
      message: "Last name must be between 6 and 15 characters long."
    });
  } else if(!/^[a-z-]+$/i.test(givenName)) {
    return response(res, 400, {
      isError: true,
      message: "Name must contain only letters and special character (-)."
    });
  } else if(!/^[a-z]+$/i.test(familyName)) {
    return response(res, 400, {
      isError: true,
      message: "Last name must contain only letters."
    });
  }

  if(password.length < 6 || password.length > 15) {
    return response(res, 400, {
      isError: true,
      message: "Password must be between 6 and 15 characters long."
    });
  } else if(!/^[0-9A-Za-z-_]+$/.test(password)) {
    return response(res, 400, {
      isError: true,
      message: "Password must contain only letters, numbers and special character (-, _)."
    });
  } else if(password.toString() !== passwordConfirm.toString()) {
    return response(res, 400, {
      isError: true,
      message: "Passwords do not match."
    });
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      return response(res, 400, {
        isError: true,
        message: "Username is already taken",
      });
    }

    const newUser = new User({
      username,
      password,
      givenName,
      familyName,
    });

    await newUser.save();

    return response(res, 201, {
      isError: false,
      message: "Your account has been successfully created. Please, log in.",
    });
  } catch (error) {
    return response(res, 500, {
      isError: true,
      message: "Something went wrong... Please, try again later.",
    });
  }
});

// /accounts/login
router.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
  const { _id, username, givenName, familyName } = req.user;
    const token = passportConfig.getToken({ _id });
    return res.status(200).json({
      isError: false,
      message: "Successfully logged in.",
      body: {
        isAuthenticated: true,
        user: { username, givenName, familyName },
        token
      },
    });

  }
);

// /accounts/authenticated
router.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { username, givenName, familyName } = req.user;
    return response(res, 200, {
      isError: false,
      message: "",
      body: {
        isAuthenticated: true,
        user: { username, givenName, familyName }
      }
    });
  }
);

module.exports = router;