const db = require("../model");
const Post = db.post;

const fs = require("fs");

// get all posts

exports.getAll = (req, res) => {
  const limit = Number(req.query.limit);
  function comment() {
    if (req.query.comment == 0) {
      return null;
    } else if (req.query.comment == 1) {
      return !null;
    }
  }
  const conditions = { InCommentId: comment() };
  Post.findAll({
    where: conditions,
    offset: 0,
    limit: limit,
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts.",
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
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const post = {
    caption: req.body.caption,
    imgUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    UserId: req.auth.userId,
    InCommentId: req.body.InCommentId,
  };

  console.log(post);

  Post.create(post)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the post.",
      });
    });
};

// Update?

exports.updateOne = (req, res) => {
  const id = req.query.id;
  console.log(id + " " + JSON.stringify(req.body));
  if (!req.body) {
    res.status(500).send({
      error: "no body",
    });
    return;
  }
  Post.update(
    {
      // id: id,
      caption: req.body.caption,
      // imgUrl: `${req.protocol}://${req.get("host")}/images/${
      //   req.file.filename
      // }`,
      // UserId: req.auth.userId,
      // InCommentId: req.body.InCommentId,
    },
    {
      where: { id: id },
    }
  )
    .then((post) => {
      if (post) {
        res.status(200).send({ message: "Post was updated successfully" });
        // res.send({
        //   message: "Post was updated successfully.",
        // });
      } else {
        res.status(500).send({
          error: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
        // res.send({
        //   error: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
        // });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error updating Post with id=" + id,
      });
    });
};

// Delete

exports.deleteOne = (req, res) => {
  const id = req.query.id;

  // Post.findAll({
  //   where: { id: id },
  // })
  //   .then((post) => {
  //     if (post) {
  //       // delete post in the data base
  //       Post.destroy({ id: id })
  //         .then(() => res.status(200).json({ message: "deleted post" }))
  //         .catch((error) =>
  //           res.status(400).json({ error: "error with delete"})
  //         );

  //       // .then(() => res.status(200).json({ message: "deleted post" }))
  //       // .catch((error) => res.status(400).send({ error: "error with delete" }));
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error deleting post with id=" + id,
  //     });
  //   });

  Post.findByPk(id)
    .then((post) => {
      // const post = response.json()
      if (!post) {
        res.status(404).send({ message: "post not found" });
        return;
      }

      if (req.auth.userId !== post.UserId) {
        res
          .status(403)
          .send({ error: "you are not the good user for delete this post" });
        return;
      }

      // delete file
      const filename = post.imgUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        // delete post in the data base
        Post.destroy({ where: { id: id } })
          .then(() => res.status(200).send({ message: "deleted post" }))
          .catch((error) =>
            res
              .status(400)
              .json({ error: "can't delete the post with this id=" + id })
          );
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
