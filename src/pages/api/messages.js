import dbConnect from "@/lib/mongodb";
import Chat from "@/models/Chat";
import User from "@/models/User";
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

    // ✅ Extract data from body
    const { chatId, sender, content } = req.body;

    if (!chatId || !sender || !content) {
      return res.status(400).json({ message: "chatId, sender and content are required" });
    }

    // 📝 Find chat
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    // 🔗 Ensure the chat belongs to this user
    if (String(chat.userId) !== String(user._id)) {
      return res.status(403).json({ message: "Not allowed to modify this chat" });
    }

    // ➕ Add message
    const newMessage = {
      role: sender, // "user" or "bot"
      content,
    };
    chat.messages.push(newMessage);
    chat.updatedAt = new Date();

    await chat.save();

    return res.status(201).json({
      message: "Message added successfully",
      newMessage,
    });
  } catch (err) {
    console.error("Error adding message:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
