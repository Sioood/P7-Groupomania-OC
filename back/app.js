const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const path = require("path");

const app = express();

// app use
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(helmet());
app.disable("x-powered-by");
app.use(helmet.hidePoweredBy());

// app.use("/images", express.static("images"));

app.use("/images", express.static(path.join(__dirname, "/images")));

// database

const database = require("./model");
database.sequelize
  .sync()
  .then(console.log("connected to the BDD"))
  .catch((error) => console.log(error));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  // Header for same source helmet images
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  next();
});

// paths routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

// base path for routes
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
