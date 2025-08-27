// pages/api/check-auth.js
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ user: null });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await dbConnect();
    const user = await User.findById(decoded.userId).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ user: null });
  }
}
