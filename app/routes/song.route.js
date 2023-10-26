const express = require("express");
const app = express();
const songs = require("../controllers/song.controller");

app.post("/songs", songs.create);

app.get("/songs", songs.findAll);

// app.get("/users/:userId", users.findOne);

// app.put("/users/:userId", users.update);

app.delete("/songs/:songId", songs.delete);

module.exports = app;
