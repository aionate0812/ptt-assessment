const express = require("express");
const ordersRouter = express.Router();
const OrdersService = require("../services/orders");

// POST - CREATE
ordersRouter.post("/orders", (req, res) => {
  const { uid: token } = res.locals;
  let { ticker, amount, price } = req.body;
  OrdersService.create(ticker, amount, price, token)
    .then(data => {
      res.status(201);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.send({
        Message: err
      });
    });
});

// GET - READ
// usersRouter.get("/", (req, res) => {
//   const { uid: token } = res.locals;
//   UsersService.read(token)
//     .then(data => {
//       res.status(200);
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(400);
//       res.send({
//         Message: err
//       });
//     });
// });

module.exports = ordersRouter;
