const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const allRoutes = require("./app/routes/index.js");

const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
  res.send("Hey this is my API running 🥳");
});

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

app.use(allRoutes);

// require("./app/routes/index.js")(app);
// Require Notes routes
// require("./app/routes/note.routes.js")(app);
// require("./app/routes/user.route.js")(app);
// require("./app/routes/registeruser.routes.js")(app);
