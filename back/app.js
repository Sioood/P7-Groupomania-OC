const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const helmet = require("helmet");

const database = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: ""

});

database.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

const app = express();

// app use
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.disable('x-powered-by')
app.use(helmet.hidePoweredBy()); 


// http headers
app.use((res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  // Header for same source helmet images
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
});

// base path for routes
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
