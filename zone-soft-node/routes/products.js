const express = require("express");
const axios = require("axios");
const { getAuthToken } = require("../config/authToken");
const { base_url, version } = require("../config/config");
const productsRoute = express.Router();

productsRoute.get("/all", (req, res) => {
  let data = `{\n    "auth_hash": "${getAuthToken()}",\n    "product": {\n}\n}`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${base_url}${version}/products/getInstances`,
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

productsRoute.get("/:productCode", (req, res) => {
  const productCode = req.params.productCode;

  let data = `{\n    "auth_hash": "${getAuthToken()}",\n    "product": {\n        "codigo": ${productCode}\n    }\n}`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${base_url}${version}/products/getInstance`,
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

productsRoute.get("/family/:familyCode", (req, res) => {
  const familyCode = req.params.familyCode;

  let data = `{\n    "auth_hash": "${getAuthToken()}",\n    "product": {}\n}`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${base_url}${version}/products/getInstances`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      res.json(
        response.data.Response.Content.product.filter(
          (product) => product.familia == familyCode
        )
      );
    })
    .catch((error) => {
      console.log(error);
    });
});


productsRoute.get("/subfamily/:subFamilyCode", (req, res) => {
    const subFamilyCode = req.params.subFamilyCode;
  
    let data = `{\n    "auth_hash": "${getAuthToken()}",\n    "product": {}\n}`;
  
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${base_url}${version}/products/getInstances`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        res.json(
          response.data.Response.Content.product.filter(
            (product) => product.subfam == subFamilyCode
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  });

module.exports = productsRoute;
