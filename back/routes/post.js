const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

const postCtrl = require("../controllers/post");

router.post("/create", auth, multer, postCtrl.create);
router.get("/", auth, postCtrl.getAll);
router.get("/:id", auth, postCtrl.getOne);
router.put("/update", auth, multer, postCtrl.updateOne);
router.delete("/delete", auth, multer, postCtrl.deleteOne);

module.exports = router;
