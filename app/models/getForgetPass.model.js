const { default: mongoose } = require("mongoose");

const getForgetPassSchema = mongoose.Schema(
  {
    email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GetForgetPass", getForgetPassSchema);
