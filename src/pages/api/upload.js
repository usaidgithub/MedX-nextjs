// pages/api/documents/upload.js
import dbConnect from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Document from "@/models/Document";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import * as formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res
        .status(500)
        .json({ message: "Form parsing error", error: err.message });
    }

    try {
      // 🔒 Authenticate user with JWT
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Normalize fields (Formidable returns arrays)
      const extractedFields = {};
      for (const key in fields) {
        if (Array.isArray(fields[key]) && fields[key].length > 0) {
          extractedFields[key] = fields[key][0];
        } else {
          extractedFields[key] = fields[key];
        }
      }

      // 🔍 Get uploaded PDF
      const uploadedFiles = files.file; // Expecting <input name="file">
      if (
        !uploadedFiles ||
        !Array.isArray(uploadedFiles) ||
        uploadedFiles.length === 0 ||
        !uploadedFiles[0].filepath
      ) {
        console.error("Upload Error: Missing or invalid file in request.");
        return res.status(400).json({
          message: "Missing required file (expected 'file')",
          name: "Error",
          http_code: 400,
        });
      }

      const pdfFile = uploadedFiles[0];

      // 🛡 Validate file type
      if (pdfFile.mimetype !== "application/pdf") {
        return res
          .status(400)
          .json({ message: "Only PDF files are allowed" });
      }

      // ☁️ Upload to Cloudinary
      const result = await cloudinary.uploader.upload(pdfFile.filepath, {
        folder: "medical_vault",
        resource_type: "raw", 
      });

      // 💾 Save document info to MongoDB
      const newDoc = new Document({
        userId: user._id,
        fileName: extractedFields.fileName || pdfFile.originalFilename,
        fileUrl: result.secure_url,
        size: pdfFile.size,
      });

      await newDoc.save();

      // 🧹 Clean up temp file
      fs.unlinkSync(pdfFile.filepath);

      return res
        .status(200)
        .json({ message: "File uploaded successfully", document: newDoc });
    } catch (error) {
      console.error("Upload Error:", error);
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
  });
}
