import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import User from "@/models/User";

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
   // ✅ Fetch all appointments
  if (req.method === "GET") {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if user exists
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Fetch only this user's appointments
      const bookings = await Booking.find({ user: user._id }).sort({ preferredDate: 1 });

      return res.status(200).json({ bookings });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // 1. Check JWT
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await dbConnect();

    // Verify user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log('The required body is', req.body);
    // 2. Extract booking details
    const { doctor, patientDetails, preferredDate, preferredTime } = req.body;

    if (!doctor?.id || !patientDetails?.patientName || !preferredDate || !preferredTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 3. Save booking
    const newBooking = await Booking.create({
      user: user._id,
      doctor,
      patientDetails,
      preferredDate,
      preferredTime,
    });

    return res.status(201).json({
      message: "Appointment booked successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
