import dbConnect from "@/lib/mongodb";
import Document from "@/models/Document";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // 1. Get token from cookies
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // 3. Fetch documents uploaded by this user
      const documents = await Document.find({ userId: user._id }).sort({
        uploadedAt: -1, // latest first
      });

      return res.status(200).json({ success: true, documents });
    } catch (error) {
      console.error("Error fetching documents:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
