const { db } = require("./dbConnect");
const usersService = {};
const users = "users";
const portfolio = "portfolio";

usersService.create = (username, email, token) => {
  return db.tx(t => {
    return t
      .one("INSERT INTO $1:name ($2:name) VALUES ($2:csv) RETURNING userid;", [
        users,
        {
          username,
          email,
          token
        }
      ])
      .then(user => {
        return t.one(
          "INSERT INTO $1:name ($2:name) VALUES ($2:csv) RETURNING userid",
          [portfolio, { userid: user.userid }]
        );
      });
  });
};

usersService.read = token => {
  return db.oneOrNone("SELECT * from $1:name WHERE token=$2", [table, token]);
};

module.exports = usersService;
