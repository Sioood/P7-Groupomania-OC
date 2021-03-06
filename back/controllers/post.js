const { Op } = require("sequelize");

const db = require("../model");
const Post = db.post;
const User = db.user;

const fs = require("fs");

// get all posts

exports.getAll = (req, res) => {
  /**
   * get users with query parameters, can combine multiple or run with one
   */

  let id = { [Op.not]: null };
  let UserId = { [Op.not]: null };
  let InCommentId = null;
  let limit = null;

  /**
   * check all query for implement in the where condition for sequelize
   */

  //id
  if (req.query.id && req.query.id != "null") {
    id = req.query.id;
  }

  // user id
  if (req.query.userId && req.query.userId != "null") {
    UserId = req.query.userId;
  }

  // comment
  if (!req.query.comment || req.query.comment == "false") {
    InCommentId = null;
  } else if (req.query.comment == "true") {
    InCommentId = { [Op.not]: null };
  } else if (req.query.comment !== "false" || req.query.comment !== "true") {
    InCommentId = req.query.comment;
  }

  // limit
  if (req.query.limit == "null") {
    limit = 0;
    // console.log(limit);
  } else if (
    req.query.limit &&
    req.query.limit != 0 &&
    req.query.limit != "null"
  ) {
    limit = Number(req.query.limit);
  }

  let where = { id: id, UserId: UserId, InCommentId: InCommentId };

  // // console.log(where);

  let conditions = {
    where: where,
    offset: 0,
    limit: limit,
    order: [["createdAt", "DESC"]],
  };

  Post.findAll(conditions)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving posts.",
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

  let file;

  /**
   * Check if file for hold the multer
   */

  if (req.file == undefined) {
    file = null;
  } else {
    // file = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    file = `/images/${req.file.filename}`;
  }

  // console.log(file);

  const post = {
    caption: req.body.caption,
    imgUrl: file,
    UserId: req.auth.userId,
    InCommentId: req.body.InCommentId,
  };

  // console.log(post);

  Post.create(post)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the post.",
      });
    });
};

// Update

exports.updateOne = (req, res) => {
  const id = req.query.id;
  if (!req.body) {
    res.status(500).send({
      error: "no body",
    });
    return;
  }

  /**
   * Find the user request an update then the post
   */

  User.findByPk(req.auth.userId)
    .then((user) => {
      Post.findByPk(id).then((post) => {
        if (!post) {
          res.status(404).send({ message: "post not found" });
          return;
        }

        /**
         * Check if right user or an admin, else drop error
         */

        // // console.log(user.admin !== true);
        if (user.id != post.UserId && user.admin !== true) {
          res
            .status(403)
            .send({ error: "you are not the good user for update this post" });
          return;
        }

        Post.update(
          {
            caption: req.body.caption,
            // don't give the possibility of modify img because post can have non sense

            // imgUrl: `${req.protocol}://${req.get("host")}/images/${
            //   req.file.filename
            // }`,
          },
          {
            where: { id: id },
          }
        )
          .then((post) => {
            if (post) {
              res
                .status(200)
                .send({ message: "Post was updated successfully" });
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
          .catch((error) => {
            res.status(500).send({
              error: error + "Error updating Post with id=" + id,
            });
          });
      });
    })
    .catch(() => res.status(500).json({ error: "error" }));
};

// Delete

exports.deleteOne = (req, res) => {
  const id = req.query.id;

  /**
   * Same process of update one
   * Find the user request an update then the post
   */

  User.findByPk(req.auth.userId)
    .then((user) => {
      Post.findByPk(id).then((post) => {
        // const post = response.json()
        if (!post) {
          res.status(404).send({ message: "post not found" });
          return;
        }

        /**
         * Same process of update one
         * Check if user request is admin or is the user created the post
         */

        // // console.log(user.admin !== true);
        if (user.id != post.UserId && user.admin !== true) {
          res
            .status(403)
            .send({ error: "you are not the good user for delete this post" });
          return;
        }

        function deletePost() {
          Post.destroy({ where: { id: id } })
            .then(() => res.status(200).send({ message: "deleted post" }))
            .catch(() =>
              res
                .status(400)
                .json({ error: "can't delete the post with this id=" + id })
            );
        }

        /**
         * Check if the post contain an image, if yes unlink of server folder
         */

        // delete file
        if (post.imgUrl) {
          const filename = post.imgUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            deletePost();
          });
        } else {
          deletePost();
        }
      });
    })
    .catch(() => res.status(500).json({ error: "error" }));
};
