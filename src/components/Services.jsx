"use client";
import { Bot, Scan, FileText, Video, Shield, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

const services = [
  {
    icon: Bot,
    title: "AI Chatbot & Virtual Assistant",
    description:
      "Get instant medical guidance with our AI-powered chatbot. Available 24/7 to answer your health questions.",
    color: "text-medical-primary",
    link: "/chatbot", // 👈 Added navigation link
  },
  {
    icon: Scan,
    title: "MRI Analysis",
    description:
      "Advanced AI-powered MRI scan analysis for accurate diagnosis and faster treatment recommendations.",
    color: "text-medical-secondary",
  },
  {
    icon: FileText,
    title: "Report Analysis",
    description:
      "Comprehensive analysis of your medical reports with detailed insights and treatment suggestions.",
    color: "text-medical-primary",
    link:"/reportanalyse",
  },
  {
    icon: Video,
    title: "Video Consultation",
    description:
      "Connect with certified doctors through secure video calls. Get professional medical advice from home.",
    color: "text-medical-primary",
    link:"/video"
  },
  {
    icon: Shield,
    title: "Secure Health Vault",
    description:
      "Store and manage your medical records securely in the cloud with encrypted data protection.",
    color: "text-medical-secondary",
        link:"/medicalVault"

  },
  {
    icon: MapPin,
    title: "Real-time Healthcare Facility Tracking",
    description:
      "Find nearby hospitals, clinics, and pharmacies with real-time availability and directions.",
    color: "text-destructive",
    link: "/mapfacility"
  },
];

const Services = () => {
  const router = useRouter();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-100 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Comprehensive Healthcare Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Experience modern healthcare with our range of digital health
            services designed to keep you healthy and connected.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => service.link && router.push(service.link)} // 👈 Navigate only if link exists
              className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 relative z-10 overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Background Overlay */}
              <div
                className={`absolute top-0 left-0 w-24 h-24 rounded-full opacity-20 transform -translate-x-1/3 -translate-y-1/3 transition-all duration-500 group-hover:scale-150 group-hover:opacity-40`}
                style={{
                  backgroundColor: `var(--color-${service.color.replace(
                    "text-",
                    ""
                  )})`,
                }}
              />

              <div
                className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${service.color} transition-all duration-500 transform group-hover:rotate-[15deg]`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-current/10">
                  <service.icon className="w-7 h-7" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
