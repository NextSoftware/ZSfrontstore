const express = require("express");
const cors = require("cors");
const axios = require("axios");

const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const familyRoute = require("./routes/family");
const subFamilyRoute = require("./routes/subfamily");
const PORT = 4700;
const HOST_NAME = "localhost";


const { setAuthToken } = require("./config/authToken");

const {
    nif,
    name,
    password,
    store,
    base_url,
    version,
  } = require("./config/config");

const app = express();

// Configure CORS middleware before defining routes
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS middleware here

app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/family", familyRoute);
app.use("/subfamily", subFamilyRoute);

app.listen(PORT, HOST_NAME, () => {
  console.log(`Server running at ${HOST_NAME}:${PORT}`);
  setApiKey();
});

const setApiKey = () =>{
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
        console.log("API KEY deployed!");
      })
      .catch((error) => {
        console.log(error);
      });
}

