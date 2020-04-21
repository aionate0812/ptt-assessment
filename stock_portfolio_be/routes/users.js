const express = require("express");
const usersRouter = express.Router();
const UsersService = require("../services/users");

// POST - CREATE
usersRouter.post("/", (req, res) => {
  const { uid: token } = res.locals;
  let { username, email } = req.body;
  UsersService.create(username, email, token)
    .then((data) => {
      res.status(201);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
      res.send({
        Message: err,
      });
    });
});

// GET - READ
usersRouter.get("/", (req, res) => {
  const { uid: token } = res.locals;
  UsersService.read(token)
    .then((data) => {
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      res.status(400);
      res.send({
        Message: err,
      });
    });
});

module.exports = usersRouter;
