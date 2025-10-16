// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: "/uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extreme(file.originalname));
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;

const multer = require("multer"); //c
const path = require("path"); //c

const storage = multer.diskStorage({
  destination: "/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extreme(file.originalname)); //c
  },
});

const upload = multer({ storage }); //c

module.exports = upload; //c
