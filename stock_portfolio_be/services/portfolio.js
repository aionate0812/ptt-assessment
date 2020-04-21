const { db } = require("./dbConnect");
const portfolioService = {};
const users = "users";
const orders = "orders";
const portfolio = "portfolio";

portfolioService.read = (token) => {
  return db.tx((t) => {
    return t
      .oneOrNone(
        "SELECT users.userid, portfolio.portfolioid FROM users INNER JOIN portfolio ON users.userid = portfolio.userid WHERE users.token = $1",
        [token]
      )
      .then((account) => {
        return t.manyOrNone("SELECT * FROM $1:name WHERE portfolioid = $2", [
          orders,
          account.portfolioid,
        ]);
      });
  });
};

portfolioService.readBalance = (token) => {
  return db.oneOrNone(
    "SELECT $1:name.userid, $2:name.portfolioid, $2:name.balance FROM $1:name INNER JOIN $2:name ON $1:name.userid = $2:name.userid WHERE token=$3",
    [users, portfolio, token]
  );
};

module.exports = portfolioService;
