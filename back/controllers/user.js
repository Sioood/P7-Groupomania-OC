const db = require("../model");
const User = db.user;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// verify token and throw

exports.token = (req, res) => {
  const id = req.auth.userId;
  var condition = { id: id };
  User.findAll({ where: condition })
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
  User.findAll({ where: condition })
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
