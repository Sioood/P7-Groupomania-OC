const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const postCtrl = require("../controllers/post");

router.post("/create", auth, postCtrl.create);
router.get("/", auth, postCtrl.getAll);
router.get("/:id", auth, postCtrl.getOne);
router.put("/update", auth, postCtrl.updateOne);
router.delete("/delete", auth, postCtrl.deleteOne);

module.exports = router;
