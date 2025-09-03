// pages/userappoint.jsx
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import {
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  IndianRupee,
  CalendarCheck,
  Package,
} from "lucide-react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Function to format dates
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetch("/api/book-appointment")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data.bookings || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-medium text-blue-600 animate-pulse">
          Loading appointments...
        </p>
      </div>
    );

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            My Appointments
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            View and manage all your upcoming and past bookings.
          </p>
        </header>

        {appointments.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-200">
            <Package size={48} className="mx-auto text-blue-400 mb-4" />
            <p className="text-xl font-semibold text-gray-600">
              No appointments booked yet.
            </p>
            <p className="mt-2 text-gray-500">
              Book a new appointment to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent transition-all duration-300 hover:border-blue-500 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <Stethoscope
                      size={28}
                      className="text-blue-600 flex-shrink-0"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {appt.doctor.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {appt.doctor.specialty}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <div className="flex items-center space-x-2">
                    <CalendarDays size={20} className="text-blue-500" />
                    <span className="font-semibold">Appointment Date:</span>
                    <span>{formatDate(appt.preferredDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={20} className="text-blue-500" />
                    <span className="font-semibold">Time:</span>
                    <span>{appt.preferredTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User size={20} className="text-blue-500" />
                    <span className="font-semibold">Patient:</span>
                    <span>{appt.patientDetails.patientName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IndianRupee size={20} className="text-blue-500" />
                    <span className="font-semibold">Fee:</span>
                    <span>₹{appt.doctor.consultationFee}</span>
                  </div>
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <CalendarCheck size={20} className="text-blue-500" />
                    <span className="font-semibold">Booked On:</span>
                    <span>{formatDate(appt.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}