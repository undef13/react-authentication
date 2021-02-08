// Dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// App
const app = express();

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json());

// Routes
app.use("/accounts", require("./routes/auth"));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/react-auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log(`Successfully connected to database.`))
  .catch(e => console.log(`Error: ${e}`));

// Server startup
app.listen(3001, () => {
  console.log(`Server is up and running (Port: ${3001})`);
})