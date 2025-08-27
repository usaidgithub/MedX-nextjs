import dbConnect from "@/lib/mongodb";   // adjust path
import Chat from "@/models/Chat";
import User from "@/models/User";          // make sure you have this model
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    // 🔑 Verify JWT
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Extract first message from frontend
    const { firstMessage } = req.body;
    if (!firstMessage || !firstMessage.content) {
      return res.status(400).json({ message: "First message is required" });
    }

    // 📝 Create new chat
    const chat = new Chat({
      userId: user._id,
      messages: [
        {
          role: firstMessage.role || "user",
          content: firstMessage.content,
        },
      ],
    });

    await chat.save();

    return res.status(201).json({
      message: "Chat created successfully",
      chatId: chat._id,
    });
  } catch (err) {
    console.error("Error creating chat:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
