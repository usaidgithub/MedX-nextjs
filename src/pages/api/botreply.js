import dbConnect from "@/lib/mongodb";
import Chat from "@/models/Chat";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import axios from "axios";
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

    // ✅ Extract userMessage + chatId
    const { chatId, userMessage } = req.body;
    if (!chatId || !userMessage) {
      return res.status(400).json({ message: "chatId and userMessage are required" });
    }

    // 📝 (Optional) Validate chat exists
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

     // 🔗 Forward request to Python server
    const response = await axios.post(
      "http://localhost:8080/get",
      { msg: userMessage },
      { headers: { "Content-Type": "application/json" } }
    );
    const botReply = response.data.answer;
    return res.status(200).json({
      reply: botReply,
    });
  } catch (err) {
    console.error("Error generating bot reply:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
