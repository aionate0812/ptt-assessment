const express = require("express");
const portfolioRouter = express.Router();
const PortfolioService = require("../services/portfolio");

// POST - CREATE
// ordersRouter.post("/", (req, res) => {
//   const { uid: token } = res.locals;
//   let { ticker, amount, price } = req.body;
//   OrdersService.create(ticker, amount, price, token)
//     .then(data => {
//       res.status(201);
//       res.send(data);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(400);
//       res.send({
//         Message: err
//       });
//     });
// });

// GET - READ
portfolioRouter.get("/assets/", (req, res) => {
  const { uid: token } = res.locals;
  PortfolioService.read(token)
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
      res.status(400);
      res.send({
        Message: err
      });
    });
});

module.exports = portfolioRouter;
