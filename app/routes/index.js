const express = require("express");
const app = express();
// module.exports = (app) => {
app.use("/api", require("./note.routes"));
app.use("/api", require("./registeruser.routes"));
app.use("/api", require("./user.route"));
app.use("/api", require("./song.route"));
// };

module.exports = app;
