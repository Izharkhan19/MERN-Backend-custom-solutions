const mongoose = require("mongoose");

const RegisterUserSchema = mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("RegisterUser", RegisterUserSchema);
