const pgp = require("pg-promise")({});
const db = pgp(
  process.env.DATABASE_URL || "postgres:localhost:5432/stock_portfolio"
);
module.exports = {
  db
};
