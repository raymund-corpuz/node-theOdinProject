const cloudinary = require("../config/cloudinary");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No File Upload" });

    //Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      async (error, uploadedFile) => {
        if (error) return res.status(500).json({ error });

        //Save the file URL to Prisma
        const newFile = await prisma.file.create({
          data: {
            filename: req.file.originalname,
            url: uploadedFile.secure_url,
          },
        });

        res.json({ message: "File updloaded successfully", file: newFile });
      }
    );

    //Write the file buffer to the upload stream

    req.file.stream.pipe(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
