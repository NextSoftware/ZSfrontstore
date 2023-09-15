const express = require("express");
const axios = require("axios");
const { setAuthToken } = require("../config/authToken");
const authRoute = express.Router();
const {
  nif,
  name,
  password,
  store,
  base_url,
  version,
} = require("../config/config");
//converter em json e returnar
authRoute.get("/", (req, res) => {
  let data = `{"user":{"nif":"${nif}","nome":"${name}","password":"${password}","loja":"${store}"}}`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${base_url}${version}/auth/authenticate`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    data: data,
  };

  axios
    .request(config)
    .then(async (response) => {
      await setAuthToken(await response.data.Response.Content.auth_hash);
      res.json("API KEY deployed!");
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = authRoute;
