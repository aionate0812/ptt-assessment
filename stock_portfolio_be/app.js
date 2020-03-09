const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { checkFirebase } = require("./firebase/firebaseAuth");

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Routes
const usersRouter = require("./routes/users");

//API
app.use("/users", checkFirebase, usersRouter);

module.exports = { app };
