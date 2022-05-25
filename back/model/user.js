"use strict";
module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define("User", {
    admin: { type: Datatypes.BOOLEAN, defaultValue: false, allowNull: true },
    email: { type: Datatypes.STRING, allowNull: false, unique: true },
    name: { type: Datatypes.STRING, allowNull: false },
    lastname: { type: Datatypes.STRING, allowNull: false },
    imgUrl: { type: Datatypes.STRING, allowNull: true },
    password: { type: Datatypes.STRING, allowNull: false },
    job: { type: Datatypes.STRING, allowNull: false },
    // column profile picture ?
  });
  return User;
};
