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

exports.updateOne = (req, res) => {
  const id = req.query.id;
  console.log(id + " " + JSON.stringify(req.body));
  if (!req.body) {
    res.status(500).send({
      error: "no body",
    });
    return;
  }

  User.findByPk(req.auth.userId)
    .then((reqUser) => {
      console.log(reqUser.id != id);
      if (reqUser.id != id && reqUser.admin !== true) {
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
          updateUser(null);
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

  // User.update(
  //   {
  //     name: req.body.name,
  //     lastname: req.body.lastname,
  //     email: req.body.email,
  //     job: req.body.job,
  //   },
  //   {
  //     where: { id: id },
  //   }
  // )
  //   .then((user) => {
  //     if (user) {
  //       res.status(200).send({ message: "User was updated successfully" });
  //     } else {
  //       res.status(500).send({
  //         error: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       error: "Error updating Post with id=" + id,
  //     });
  //   });
};

exports.deleteOne = (req, res) => {
  const id = req.query.id;

  User.findByPk(id)
    .then((user) => {
      // const post = response.json()
      if (!user) {
        res.status(404).send({ message: "user not found" });
        return;
      }

      if (req.auth.userId !== user.id) {
        res
          .status(403)
          .send({ error: "you are not the good user for delete this user" });
        return;
      }

      User.destroy({ where: { id: id } })
        .then(() => res.status(200).send({ message: "deleted user" }))
        .catch((error) =>
          res
            .status(400)
            .json({ error: "can't delete the user with this id=" + id })
        );

      // delete file
      // const filename = user.imgUrl.split("/images/")[1];
      // fs.unlink(`images/${filename}`, () => {
      //   // delete post in the data base
      //   User.destroy({ where: { id: id } })
      //     .then(() => res.status(200).send({ message: "deleted user" }))
      //     .catch((error) =>
      //       res
      //         .status(400)
      //         .json({ error: "can't delete the user with this id=" + id })
      //     );
      // });
    })
    .catch((error) => res.status(500).json({ error }));
};
