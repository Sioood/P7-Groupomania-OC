const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

const postCtrl = require("../controllers/post");

// create a post
router.post("/create", auth, multer, postCtrl.create);
// get post with query conditions
router.get("/", auth, postCtrl.getAll);
// update a post
router.put("/update", auth, multer, postCtrl.updateOne);
// delete one post
router.delete("/delete", auth, multer, postCtrl.deleteOne);

module.exports = router;
