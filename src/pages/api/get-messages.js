// pages/api/get-messages.js
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Chat from "@/models/Chat";
import User from "@/models/User";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        await dbConnect();

        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { chatId } = req.query; // <-- ✅ get chatId from query params
        if (!chatId) {
            return res.status(400).json({ success: false, message: "chatId is required" });
        }

        const chat = await Chat.findOne({ _id: chatId, userId: user._id }); 
        if (!chat) {
            return res.status(200).json({ success: true, messages: [] }); 
        }

        return res.status(200).json({ success: true, messages: chat.messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
