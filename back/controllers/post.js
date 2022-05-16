const db = require("../model");
const Post = db.post;

// get all posts

exports.getAll = (req, res) => {
  const limit = Number(req.query.limit);
  Post.findAll({offset: 0, limit: limit, order:[
    ["createdAt","DESC"]
],})
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
  const id = req.params.id;
  var condition = { id: id };
  Post.findAll({ where: condition })
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
      message: "Content can not be empty!",
    });
    return;
  }
  const post = {
    caption: req.body.caption,
    imgUrl: req.body.imgUrl,
    UserId: req.auth.userId,
    InCommentId: req.body.InCommentId,
  };

  Post.create(post)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Update?

exports.updateOne = (req, res) => {
  const id = req.body.id;
  Post.update(req.body, {
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "Post was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Post with id=" + id,
      });
    });
};

// Delete

exports.deleteOne = (req, res) => {
  const id = req.body.id;
  Post.destroy({
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "Post was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id,
      });
    });
};
