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
const ordersRouter = require("./routes/orders");

//API
app.use("/users", checkFirebase, usersRouter);
app.use("/portfolio", checkFirebase, ordersRouter);

module.exports = { app };
