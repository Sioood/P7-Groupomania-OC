'use strict';
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    email: {type: Sequelize.STRING, allowNull: false, unique: true},
    name: {type: Sequelize.STRING, allowNull: false},
    lastname: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false},
    // column poste dand l'entreprise?
  });
  return User;
};