const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

const auth = require("../middleware/auth");

router.get("/token", auth, userCtrl.token);
router.get("/user/:id", userCtrl.user);
router.get("/user", userCtrl.users);
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/user/update", auth, userCtrl.updateOne);
router.delete("/user/delete", auth, userCtrl.deleteOne);

module.exports = router;
