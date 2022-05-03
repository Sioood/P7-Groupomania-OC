// const mysql = require('mysql2')
const { Sequelize } = require('sequelize');

require('dotenv').config();

const sqlUser = process.env.SQL_USER;
const sqlPassword = process.env.SQL_PASSWORD;

const sequelize = new Sequelize("groupomania", sqlUser, sqlPassword, {
  dialect: "mysql",
  host: "localhost"
});

// try {
//   sequelize.authenticate();
//   console.log('Connecté à la base de données MySQL!');
//   sequelize.query("SELECT * FROM `user` WHERE `id` = 1").then(([results, metadata]) => {
//       console.log(results);
//     })
// } catch (error) {
//   console.error('Impossible de se connecter, erreur suivante :', error);
// }

// exports database
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user")(sequelize, Sequelize);
module.exports = db;