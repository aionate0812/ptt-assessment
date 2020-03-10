const { db } = require("./dbConnect");
const ordersService = {};
const users = "users";
const orders = "orders";
const portfolio = "portfolio";

ordersService.create = (ticker, amount, price, newBalance, token) => {
  let portfolioid = "";
  return db.tx(t => {
    return t
      .oneOrNone(
        "SELECT $1:name.userid, $2:name.portfolioid, $2:name.balance FROM $1:name INNER JOIN $2:name ON $1:name.userid = $2:name.userid WHERE token=$3",
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
        return t.one(
          "UPDATE $1:name SET balance=$2 WHERE portfolioid=$3 returning balance",
          [portfolio, newBalance, portfolioid]
        );
      })
      .then(balance => {
        console.log(balance);
        return t.manyOrNone("SELECT * FROM $1:name WHERE portfolioid = $2", [
          orders,
          portfolioid
        ]);
      });
  });
};

module.exports = ordersService;
