const express = require("express");
const ordersRouter = express.Router();
const OrdersService = require("../services/orders");
const PortfolioService = require("../services/portfolio");

// POST - CREATE
ordersRouter.post("/", (req, res) => {
  const { uid: token } = res.locals;
  let { ticker, amount, price } = req.body;
  PortfolioService.readBalance(token)
    .then(portfolioInfo => {
      if (portfolioInfo.balance > amount * price) {
        let newBalance = portfolioInfo.balance - amount * price;
        OrdersService.create(ticker, amount, price, newBalance, token)
          .then(assets => {
            let uniqueAssets = {};
            for (let i = 0; i < assets.length; i++) {
              if (!uniqueAssets[assets[i].ticker]) {
                uniqueAssets[assets[i].ticker] = {
                  ticker: assets[i].ticker,
                  amount: assets[i].amount,
                  price: assets[i].price
                };
              } else {
                let { amount } = uniqueAssets[assets[i].ticker];
                amount = amount + assets[i].amount;
                uniqueAssets[assets[i].ticker].amount = amount;
              }
            }
            res.status(200);
            res.send(Object.values(uniqueAssets));
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        res.status(200);
        res.send({ balanceError: "Insuficient Funds" });
      }
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
