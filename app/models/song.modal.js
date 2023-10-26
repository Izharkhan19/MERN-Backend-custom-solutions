const mongoose = require("mongoose");

const SongSchema = mongoose.Schema(
  {
    yourName: String,
    fileTitle: String,
    filelink: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Song", SongSchema);
