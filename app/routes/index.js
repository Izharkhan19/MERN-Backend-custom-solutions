const express = require("express");
const app = express();
const getUserForgetPass = require("../controllers/getForgetPass.controller");
// module.exports = (app) => {
app.use("/api", require("./note.routes"));
app.use("/api", require("./registeruser.routes"));
app.use("/api", require("./user.route"));
app.use("/api", require("./song.route"));
app.use("/api", require("./product.route"));
app.use("/api", getUserForgetPass);
// };

module.exports = app;
