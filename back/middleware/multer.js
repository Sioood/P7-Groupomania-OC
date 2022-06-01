const multer = require("multer");

// set accepted extensions
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const length = file.originalname.split(".").length;
    const name = file.originalname.split(".", length - 1).join("-");
    const extension = MIME_TYPES[file.mimetype];
    const date = new Date();
    // name the file for the storage
    callback(
      null,
      name +
        "_" +
        date.toLocaleDateString("fr").split("/").join("-") +
        "_" +
        date.toLocaleTimeString("fr").split(":").join("-") +
        "." +
        extension
    );
  },
});

// single("name of all input need multer") watch out
module.exports = multer({ storage: storage }).single("file");
