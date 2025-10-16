// const express = require("express");
// const router = express.Router();
// const upload = require("../controllers/uploadController");
// const { uploadFile } = require("../controllers/uploadController");

// router.post("/upload", upload.single("file"), uploadFile);

// module.exports = router;

// ======================================= //

// const express = require("express"); //c
// const router = express.Router(); //c
// const upload = require("../middleware/upload"); // -- wrong
// const { uploadFile } = require("../controllers/uploadController"); //c

// router.post("/upload", upload.single("file"), uploadFile);

// module.exports = router;

// ====================================== //
const express = require("express");
const router = express.Router();
const { upload, uploadFile } = require("../controllers/uploadController");

router.get("/", (req, res) => res.render("index", { title: "Upload File" }));

router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
