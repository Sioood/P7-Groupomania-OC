
"use strict";
module.exports = (sequelize, Datatypes) => {
  const Post = sequelize.define("Post", {
    caption: { type: Datatypes.TEXT("long"), allowNull: false },
    imgUrl: { type: Datatypes.STRING, allowNull: true },
    UserId: { type: Datatypes.INTEGER, allowNull: false },
    InCommentId: { type: Datatypes.INTEGER, allowNull: true, default: 0 },
  });
  return Post;
};