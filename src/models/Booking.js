import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },

  doctor: {
    id: {
      type: Number, // ID from your doctor object
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    specialty: String,
    consultationFee: Number,
    location: String,
  },

  patientDetails: {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    medicalHistory: String,
    currentSymptoms: String,
    emergencyContact: String,
  },

  preferredDate: {
    type: Date,
    required: true,
  },

  preferredTime: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
