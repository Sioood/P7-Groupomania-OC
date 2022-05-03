const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();

// app use
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.disable('x-powered-by')
app.use(helmet.hidePoweredBy()); 

// database

const database = require("./model");
database.sequelize.sync()
.then((console.log("connected to the BDD")))
.catch(error => console.log(error))

// paths routes
const userRoutes = require("./routes/user");
// const postRoutes = require("./routes/post");

// base path for routes
app.use("/api/auth", userRoutes);
// app.use("/api/post", postRoutes);

module.exports = app;
