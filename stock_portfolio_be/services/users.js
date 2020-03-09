const { db } = require("./dbConnect");
const usersService = {};
const table = "users";

usersService.create = (username, email, token) => {
  return db.one(
    "INSERT INTO $1:name ($2:name) VALUES ($2:csv) RETURNING userid;",
    [
      table,
      {
        username,
        email,
        token
      }
    ]
  );
};

usersService.read = token => {
  return db.oneOrNone("SELECT * from $1:name WHERE token=$2", [table, token]);
};

module.exports = usersService;
