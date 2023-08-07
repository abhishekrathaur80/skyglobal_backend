const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./route/auth.route");
const dbURI = "mongodb://127.0.0.1:27017/auth";
require("dotenv").config();

app.use(express.json());

//connecting to DataBase
mongoose
  .connect(dbURI, {
    UseNewUrlParser: true,
  })
  .then((conn) => {
    console.log("DB Connection Successful ! :)");
  });

app.use("/v1", routes);

app.listen(3000, () => {
  console.log("listening port no 3000");
});
