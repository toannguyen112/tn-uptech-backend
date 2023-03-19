const dotenv = require("dotenv");
dotenv.config();
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

module.exports = {
  database: DB_NAME,
  dialect: "mysql",
  username: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
};
