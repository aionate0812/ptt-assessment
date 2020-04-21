const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { checkFirebase } = require("./firebase/firebaseAuth");

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

//Routes
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");
const portfolioRouter = require("./routes/portfolio");

//API
app.use("/users", checkFirebase, usersRouter);
app.use("/orders", checkFirebase, ordersRouter);
app.use("/portfolio", checkFirebase, portfolioRouter);

module.exports = { app };
