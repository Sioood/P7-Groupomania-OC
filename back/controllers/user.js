const { Op } = require("sequelize");

const db = require("../model");
const User = db.user;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// verify token and throw

/**
 *  Check token saved in the local storage, similar back end like get user
 */

exports.token = (req, res) => {
  const id = req.auth.userId;
  var condition = { id: id };
  User.findAll({
    attributes: ["id", "admin", "email", "name", "lastname", "imgUrl", "job"],
    where: condition,
  })
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

// get all users

/**
 *  Get users, find all users with no conditions
 */

exports.users = (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// get one user with id or set other conditions later

/**
 * Get user with id and return only attributes selected
 */

exports.user = (req, res) => {
  const id = req.params.id;
  var condition = { id: id };
  User.findAll({
    attributes: ["id", "admin", "email", "name", "lastname", "imgUrl", "job"],
    where: condition,
  })
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

// signup

/**
 * Signup user, Created user in DataBase with hash for password
 */

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 13).then((hash) => {
    const user = {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
      job: req.body.job,
    };

    User.create(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      });
  });
};

// login

/**
 * Find the user with email,
 * Compare Password with bcrypt
 * and if right sign a token with jwt
 */

exports.login = (req, res, next) => {
  // find email for user
  const condition = { email: req.body.email };
  User.findOne({ where: condition })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "No such user !" });
      }
      // compare password
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(403).json({ error: "Wrong password !" });
          }
          // give a token which expire after 24h
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/**
 * Change password of a user
 */

exports.changePassword = (req, res) => {
  const id = req.query.id;

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  User.findByPk(req.auth.userId)
    .then((reqUser) => {
      /**
       * Check if right user or admin
       */
      if (reqUser.id != id && reqUser.admin !== true) {
        res
          .status(403)
          .send({ error: "you are not the good user for update this user" });
        return;
      }
      User.findByPk(id).then((user) => {
        /**
         * Get user and compare passwords
         */
        bcrypt.compare(oldPassword, user.password, (match) => {
          // bcrypt send match when user password and old password match
          if (!match) {
            res.status(406).json({ error: "Passwords don't matchs" });
          } else {
            /**
             * If passwords matchs give a new hash for new password
             */
            bcrypt.hash(newPassword, 13, function (err, bcryptNewPassword) {
              User.update(
                { password: bcryptNewPassword },
                { where: { id: id } }
              )
                .then(() =>
                  res.status(201).json({
                    confirmation: "change password with success",
                  })
                )
                .catch((err) => res.status(500).json(err));
            });
          }
        });
      });
    })
    .catch(() => res.status(500).json({ error: "error" }));
};

/**
 * Update user with the same process of update post
 * with the possibility of give a profile picture which can add at the signup
 */
exports.updateOne = (req, res) => {
  const id = req.query.id;
  if (!req.body) {
    res.status(500).send({
      error: "no body",
    });
    return;
  }

  User.findByPk(req.auth.userId)
    .then((reqUser) => {
      /**
       * Check right user or admin
       */
      if (reqUser.id != id && reqUser.admin != true) {
        res
          .status(403)
          .send({ error: "you are not the good user for update this user" });
        return;
      }
      User.findByPk(id).then((user) => {
        // const post = response.json()
        if (!user) {
          res.status(404).send({ message: "user not found" });
          return;
        }

        /**
         * Check file for hold the error of multer if no file
         */

        if (!req.file) {
          updateUser(undefined);
        } else {
          updateUser(`/images/${req.file.filename}`);
        }

        function updateUser(img) {
          User.update(
            {
              name: req.body.name,
              lastname: req.body.lastname,
              email: req.body.email,
              imgUrl: img,
              job: req.body.job,
            },
            { where: { id: id } }
          )
            .then(() => res.status(200).send({ message: "updated user" }))
            .catch(() =>
              res
                .status(400)
                .json({ error: "can't delete the user with this id=" + id })
            );
        }
      });
    })
    .catch(() => res.status(500).json({ error: "error" }));
};

/**
 * Delete one user with the same process of post
 */

exports.deleteOne = (req, res) => {
  const id = req.query.id;

  // // console.log(id);

  User.findByPk(req.auth.userId)
    .then((reqUser) => {
      User.findByPk(id)
        .then((user) => {
          // const post = response.json()
          if (!user) {
            res.status(404).send({ message: "user not found" });
            return;
          }

          /**
           * Check right user or admin
           */

          if (reqUser.id != id && reqUser.admin != true) {
            res.status(403).send({
              error: "you are not the good user for delete this user",
            });
            return;
          }

          /**
           * Delete User
           */

          User.destroy({ where: { id: id } })
            .then(() => res.status(200).send({ message: "deleted user" }))
            .catch((error) =>
              res.status(400).json({
                error: error + "can't delete the user with this id=" + id,
              })
            );

          /**
           * If user have a profile picture unlink of the server folder
           */

          if (req.file) {
            deleteImgUser(req.file.filename);
          }

          function deleteImgUser(img) {
            // delete file
            const filename = img.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              // delete post in the data base
              User.destroy({ where: { id: id } })
                .then(() => res.status(200).send({ message: "deleted user" }))
                .catch((error) =>
                  res.status(400).json({
                    error: error + "can't delete the user with this id=" + id,
                  })
                );
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch(() => res.status(500).json({ error: "error" }));
};
