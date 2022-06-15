const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

// check token
router.get("/token", auth, userCtrl.token);
// get specific user
router.get("/user/:id", userCtrl.user);
// get all user
router.get("/user", userCtrl.users);
// signup
router.post("/signup", userCtrl.signup);
// login
router.post("/login", userCtrl.login);
// update one user
router.put("/user/update", auth, multer, userCtrl.updateOne);
// update password of a user
router.put("/user/password", auth, userCtrl.changePassword);
// delete one user
router.delete("/user/delete", auth, multer, userCtrl.deleteOne);

module.exports = router;
