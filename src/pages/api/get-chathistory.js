// pages/api/get-chats.js
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Chat from "@/models/Chat";
import User from "@/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Fetch all chats by user
      const chats = await Chat.find({ userId: user._id })
        .populate("userId")
        .sort({ createdAt: -1 });

      // Extract only the first message as preview
      const chatPreviews = chats.map(chat => {
        const firstMessage = chat.messages.length > 0 ? chat.messages[0].content : "No messages yet";
        return {
          chatId: chat._id,
          preview: firstMessage.length > 40 ? firstMessage.slice(0, 40) + "..." : firstMessage,
          createdAt: chat.createdAt
        };
      });

      return res.status(200).json({ success: true, chats: chatPreviews });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
