const express = require("express");
const axios = require("axios");
const { getAuthToken } = require("../config/authToken");
const { store, base_url, version } = require("../config/config");
const familyRoute = express.Router();

familyRoute.get("/all", (req, res) => {
  let data = `{\n    "auth_hash": "${getAuthToken()}",\n        "family":{\n    \n    "order": "lastupdate;DESC"\n        }\n}`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${base_url}${version}/families/getInstances`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

familyRoute.get("/:familyCode", (req, res) => {
  const familyCode = req.params.familyCode;

  let data = `{\n    "auth_hash":"${getAuthToken()}",\n        "family":{\n    "codigo":${familyCode} ,\n    "loja": ${store}\n        }\n}`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${base_url}${version}/families/getInstance`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = familyRoute;
