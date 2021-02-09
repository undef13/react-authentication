// Dependencies
const express = require("express");
const passport = require("passport");
const passportConfig = require("../config/passport");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("1051398545639-mpgsb6eo4esvtvttqq7m9ts6g0du0hb3.apps.googleusercontent.com");

const response = (res, status, responseBody) => {
  return res.status(status).json(responseBody);
};

// POST => /accounts/register/
router.post("/register", async (req, res) => {
  const {
    email,
    password,
    passwordConfirm,
    givenName,
    familyName,
  } = req.body;
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
    const user = await User.findOne({ email });
    if (user) {
      return response(res, 400, {
        isError: true,
        message: "Email is already registered",
      });
    }

    const newUser = new User({
      email,
      password,
      givenName,
      familyName,
      provider: "Local"
    });
    
    const passwordHash = await bcrypt.hash(password, 10);
    newUser.password = passwordHash;

    await newUser.save();

    return response(res, 201, {
      isError: false,
      message: "Your account has been successfully created. Please, log in.",
    });
  } catch (error) {
    console.error(error);
    return response(res, 500, {
      isError: true,
      message: "Something went wrong... Please, try again later.",
    });
  }
});

// POST => /accounts/login
router.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
  const { _id, email, givenName, familyName } = req.user;
  const token = passportConfig.getToken({ _id });
  return res.status(200).json({
    isError: false,
    message: "Successfully logged in.",
    body: {
      isAuthenticated: true,
      user: { email, givenName, familyName },
      token
    },
  });
  }
);

// GET => /accounts/authenticated
router.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { email, givenName, familyName } = req.user;
    return response(res, 200, {
      isError: false,
      message: "",
      body: {
        isAuthenticated: true,
        user: { email, givenName, familyName }
      }
    });
  }
);

// POST => /accounts/google
router.post("/google", async (req, res) => {
  const { token } = req.body
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "1051398545639-mpgsb6eo4esvtvttqq7m9ts6g0du0hb3.apps.googleusercontent.com"
    });
    const { given_name: givenName, family_name: familyName, email } = ticket.getPayload();  

    const user = await User.findOne({ email });

    if(!user) {
      const newUser = new User({
        email,
        givenName,
        familyName,
        provider: "Google"
      });
      await newUser.save();
      const token = passportConfig.getToken({ _id: newUser._id });
      return res.status(201).json({
        isError: false,
        message: "Successfully logged in.",
        body: {
          isAuthenticated: true,
          user: { email, givenName, familyName },
          token
        }
      });
    } else {
      const { _id, givenName, familyName, email } = user;
      const token = passportConfig.getToken({ _id });
      return res.status(200).json({
        isError: false,
        message: "Successfully logged in.",
        body: {
          isAuthenticated: true,
          user: { email, givenName, familyName },
          token
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
 

  // const user = await db.user.upsert({ 
  //     where: { email: email },
  //     update: { name, picture },
  //     create: { name, email, picture }
  // })
  // res.status(201)
  // res.json(user)
})

module.exports = router;