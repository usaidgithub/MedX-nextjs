// pages/api/send-message.js
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Chat from "@/models/Chat";
import User from "@/models/User";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await dbConnect();

        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { content } = req.body;
        if (!content) return res.status(400).json({ message: "Message is required" });

        // Find or create chat
        let chat = await Chat.findOne({ userId: user._id });
        if (!chat) {
            chat = new Chat({ userId: user._id, messages: [] });
        }

        // Push user message
        chat.messages.push({
            role: "user",
            content,
        });

        // (Later here we’ll integrate AI/logic to push bot reply automatically)
        // For now, just send a dummy bot response
        const botMessage = {
            role: "bot",
            content: "Thanks for your message, our AI doctor will reply soon.",
        };

        chat.messages.push(botMessage);

        chat.updatedAt = Date.now();
        await chat.save();

        return res.status(200).json({ success: true, reply: botMessage.content });
    } catch (error) {
        console.error("Send Message API error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
