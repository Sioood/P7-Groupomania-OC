'use strict';
module.exports = (sequelize, Datatypes) => {
  const Post = sequelize.define('Post', {
    caption: {type: Datatypes.TEXT('long'), allowNull: false},
    imgUrl: {type: Datatypes.STRING, allowNull: false},
    UserId: {type: Datatypes.STRING, allowNull: false},
    InCommentId: {type: Datatypes.STRING, allowNull: true},
  });
  return Post;
};