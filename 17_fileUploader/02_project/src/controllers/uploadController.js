// const cloudinary = require("cloudinary");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// exports.uploadFile = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     //Upload to cloudinary
//     const result = await cloudinary.uploader.upload_stream(
//       { folder: "uploads" },
//       async (error, uploadedFile) => {
//         if (error) return res.status(500).json({ error });

//         //save the file URL to Prisma
//         const newFile = await prisma.file.create({
//           data: {
//             filename: req.file.originalname,
//             url: uploadedFile.secure_url,
//           },
//         });

//         res.json({ message: "File uploaded successfully", file: newFile });
//       }
//     );

//     req.file.stream.pipe(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const cloudinary = require("cloudinary");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// exports.uploadFile = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     const result = await cloudinary.uploader.upload_stream(
//       { folder: "uploads" },
//       async (error, uploadedFile) => {
//         if (error) return res.status(500).json({ error });

//         //save
//         const newFile = await prisma.file.create({
//           data: {
//             filename: req.file.originalname,
//             url: uploadedFile.secure_url,
//           },
//         });
//         res.json({ message: "File uploaded successfully", file: newFile });
//       }
//     );

//     //write the file buffer to the upload stream
//     req.file.stream.pipe(result);
//   } catch (error) {
//       res.status(500).json({error: error.message})
//   }
// };

// =================================== //
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = req.file.path;
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads", // optional: folder in Cloudinary
    });

    fs.unlinkSync(filePath); // remove local file after upload

    // res.status(200).json({
    //   message: "File uploaded successfully!",
    //   url: result.secure_url,
    // });
    // res.render("result", { imageUrl: result.secure_url });
    res.render("result", { title: "Upload Result", url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { upload, uploadFile };
