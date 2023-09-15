const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  nif: process.env.NIF,
  name: process.env.NAME,
  password: process.env.PASSWORD,
  store: process.env.STORE,
  base_url: process.env.BASE_URL,
  version: process.env.VERSION,
};
