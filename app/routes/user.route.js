const express = require("express");
const app = express();
const users = require("../controllers/user.controller");

app.post("/users", users.create);

app.get("/users", users.findAll);

// app.get("/users", (req, res) => {
// let data =  users.findAll()
//   const { filters, sortBy, sortOrder, page, limit } = req.query;
//   console.log("data :",users.findAll(), filters, sortBy, sortOrder, page, limit);
// });

app.get("/users/:userId", users.findOne);

app.put("/users/:userId", users.update);

app.delete("/users/:userId", users.delete);

module.exports = app;
