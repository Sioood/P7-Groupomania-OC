const { Op } = require("sequelize");

const db = require("../model");
const User = db.user;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// verify token and throw

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

exports.users = (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  User.findAll()
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

// get one user with id or set other conditions later

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

exports.changePassword = (req, res) => {
  const id = req.query.id;

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  User.findByPk(req.auth.userId)
    .then((reqUser) => {
      if (reqUser.id != id && reqUser.admin !== true) {
        res
          .status(403)
          .send({ error: "you are not the good user for update this user" });
        return;
      }
      User.findByPk(id).then((user) => {
        bcrypt.compare(oldPassword, user.password, (match, different) => {
          // bcrypt send match when user password and old password match
          if (!match) {
            res.status(406).json({ error: "Passwords don't matchs" });
          } else {
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

          if (reqUser.id != id && reqUser.admin != true) {
            res.status(403).send({
              error: "you are not the good user for delete this user",
            });
            return;
          }

          User.destroy({ where: { id: id } })
            .then(() => res.status(200).send({ message: "deleted user" }))
            .catch((error) =>
              res
                .status(400)
                .json({ error: "can't delete the user with this id=" + id })
            );

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
                  res
                    .status(400)
                    .json({ error: "can't delete the user with this id=" + id })
                );
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch(() => res.status(500).json({ error: "error" }));
};
