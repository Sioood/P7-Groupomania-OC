const db = require("../model");
const Post = db.post;

// get all posts

exports.getAll = (req, res) => {
  Post.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// get one post

exports.getOne = (req, res) => {
  const id = req.body.id;
  var condition = { id: id };
  Post.findAll({ where: condition})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Create

exports.create = (req, res) => {
  if (!req.body.caption) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const post = {
    id: null,
    caption: req.body.caption,
    imgUrl: req.body.imgUrl,
    UserId: req.body.userId,
    InCommentId: req.body.InCommentId
  };

  Post.create(post)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial.",
    });
  });
}

// Update?

// Delete