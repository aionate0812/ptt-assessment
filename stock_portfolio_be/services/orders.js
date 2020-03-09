const { db } = require("./dbConnect");
const ordersService = {};
const users = "users";
const orders = "orders";
const portfolio = "portfolio";

ordersService.create = (ticker, amount, price, token) => {
  let portfolioid = "";
  return db.tx(t => {
    return t
      .oneOrNone(
        "SELECT $1:name.userid, $2:name.portfolioid FROM $1:name INNER JOIN $2:name ON $1:name.userid = $2:name.userid WHERE token=$3",
        [users, portfolio, token]
      )
      .then(res => {
        portfolioid = res.portfolioid;
        return t.oneOrNone(
          "INSERT INTO $1:name ($2:name) VALUES ($2:csv) RETURNING orderid",
          [orders, { portfolioid: res.portfolioid, ticker, amount, price }]
        );
      })
      .then(() => {
        return t.manyOrNone("SELECT * FROM $1:name WHERE portfolioid = $2", [
          orders,
          portfolioid
        ]);
      });
  });
};

module.exports = ordersService;
