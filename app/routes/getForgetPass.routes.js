const express = require("express");
const getUserForgetPass = require("../controllers/getForgetPass.controller");
const app = express();
userForgetPass;

app.post("/getforgetpassword", getUserForgetPass);

module.exports = app;
