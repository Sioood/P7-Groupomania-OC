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
    // const name = file.originalname.split(" ").join("_");
    const name = file.originalname;
    const extension = MIME_TYPES[file.mimetype];
    // name the file for the storage
    callback(null, name + Date.now() + "." + extension);
  },
});

// single("name of all input need multer") watch out
module.exports = multer({ storage: storage }).single("file");
