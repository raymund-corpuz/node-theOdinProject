const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadToCloudinary } = require("../utils/cloudStorage");

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await uploadToCloudinary(req.file.buffer, "uploads");
    res.json({
      message: "File Uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
