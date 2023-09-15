const express = require("express");
const axios = require("axios");
const { getAuthToken } = require("../config/authToken");
const { base_url, version } = require("../config/config");
const subFamilyRoute = express.Router();

subFamilyRoute.get("/all", (req, res) => {
  let data = `{\n    "auth_hash": "${getAuthToken()}",\n        "subfamily":{\n    \n    "order": "lastupdate;DESC"\n        }\n}`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${base_url}${version}/subfamilies/getInstances`,
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

subFamilyRoute.get("/:subFamilyCode", (req, res) => {
  const subFamilyCode = req.params.subFamilyCode;

  let data = `{\n    "auth_hash": "${getAuthToken()}",\n        "subfamily":   {\n           "codigo": ${subFamilyCode}\n        }\n}`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${base_url}${version}/subfamilies/getInstance`,
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
module.exports = subFamilyRoute;
