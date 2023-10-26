const express = require("express");
const app = express();
const regUser = require("../controllers/registeruser.controller.js");

// Create ;
app.post("/registeruser", regUser.create);

// Get all Reg. Users ;
app.get("/registeruserlist", regUser.findAll);

// Get User by ID ;
app.get("/registeruserById/:regUserId", regUser.findOne);

// Update by ID:
app.put("/registeruserUpdateById/:regUserId", regUser.update);

// Delete user By ID
app.delete("/registeruserDeleteById/:userId", regUser.delete);

module.exports = app;
