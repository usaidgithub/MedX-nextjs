import { useState } from "react";
import { ArrowRight, Users, ShieldCheck, Clock } from "lucide-react";

const Hero = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section className="bg-gradient-to-br from-blue-900 to-indigo-900 min-h-[90vh] flex items-center font-['Inter',sans-serif] text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <div className="bg-dots-pattern w-full h-full opacity-10"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
              Your Health, <br />
              <span className="text-medical-accent">Our Priority</span>
            </h1>

            <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Connect with certified healthcare professionals from the comfort of your home. Secure EHR, AI-driven report summaries, and teleconsultations — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
              <button
                className="bg-white text-blue-800 hover:bg-gray-100 px-7 py-3 rounded-full font-semibold text-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
              >
                Book Appointment
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>

            {/* Quick Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-10 text-white/90 text-sm md:text-base">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-medical-accent" />
                <div>
                  <div className="font-semibold text-white">500+ Doctors</div>
                  <div className="text-sm text-gray-200">Certified Network</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-medical-accent" />
                <div>
                  <div className="font-semibold text-white">24/7 Care</div>
                  <div className="text-sm text-gray-200">Always Available</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-medical-accent" />
                <div>
                  <div className="font-semibold text-white">Secure</div>
                  <div className="text-sm text-gray-200">Encrypted EHR</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Booking Card */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="rounded-3xl p-6 md:p-8 backdrop-blur-md border border-white/20 shadow-2xl transition-transform transform hover:scale-105"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                maxWidth: "460px",
                width: "100%",
              }}
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-200">
                <h3 className="text-center text-xl md:text-2xl font-bold text-blue-700 mb-6">
                  Book a Free Consultation
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Patient Name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <input
                    type="text"
                    placeholder="Preferred Time (e.g., Today 5:00 PM)"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <textarea
                    placeholder="Any message (optional)"
                    rows="3"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-semibold text-lg transition-all"
                  >
                    Book Now
                  </button>

                  {submitted && (
                    <div className="mt-3 text-sm text-green-600 text-center">
                      ✅ Request submitted — Dr. Sarah will contact you shortly.
                    </div>
                  )}
                </form>

                <div className="my-5 border-t border-gray-100" />
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{
                      background: "linear-gradient(135deg,#1e90ff,#4f46e5)",
                      boxShadow: "0 6px 18px rgba(20, 60, 120, 0.15)",
                    }}
                  >
                    Dr
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-base">
                      Dr. Sarah Johnson
                    </div>
                    <div className="text-sm text-gray-500">
                      “I’m available for online consultations. Book now and I’ll review your details.”
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;