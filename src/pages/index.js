import React from "react"
import Link from 'next/link';
import {
  Heart,
  Calendar,
  Video,
  FileText,
  Bot,
  Shield,
  MapPin,
  Star,
  ChevronRight,
  Phone,
  Mail
} from "lucide-react"
import toast, { Toaster } from 'react-hot-toast';
const MedXLandingPage = () => {
  const services = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Appointment Booking",
      description:
        "Schedule appointments with certified healthcare professionals at your convenience. Easy online booking system available 24/7."
    },
    {
      icon: <Video className="w-8 h-8 text-blue-600" />,
      title: "Video Consultation",
      description:
        "Connect with certified doctors through secure video calls. Get professional medical advice from the comfort of your home."
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Report & MRI Analysis",
      description:
        "Advanced AI-powered analysis of your medical reports and MRI scans for accurate diagnosis and faster treatment recommendations."
    },
    {
      icon: <Bot className="w-8 h-8 text-blue-600" />,
      title: "AI Medical Assistant",
      description:
        "Get instant medical guidance with our AI-powered chatbot. Available 24/7 to answer your health questions and concerns."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure Health Vault",
      description:
        "Store and manage your medical records securely in the cloud with encrypted data protection and easy access anytime."
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: "Healthcare Facility Tracker",
      description:
        "Find nearby hospitals, clinics, and pharmacies with real-time availability and location-based healthcare services."
    }
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      image: "/api/placeholder/60/60",
      rating: 5,
      comment:
        "MedX has revolutionized how I connect with patients. The video consultation feature is seamless and the AI analysis tools are incredibly accurate."
    },
    {
      name: "Michael Chen",
      role: "Patient",
      image: "/api/placeholder/60/60",
      rating: 5,
      comment:
        "Booking appointments has never been easier. The platform is user-friendly and I love having all my medical records in one secure place."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Radiologist",
      image: "/api/placeholder/60/60",
      rating: 5,
      comment:
        "The MRI analysis feature saves me hours of work. The AI provides detailed insights that help me make faster, more accurate diagnoses."
    },
    {
      name: "Robert Thompson",
      role: "Patient",
      image: "/api/placeholder/60/60",
      rating: 5,
      comment:
        "The 24/7 AI assistant is a game-changer. I get instant answers to my health questions, and the real-time facility tracker helped me find urgent care quickly."
    }
  ]

  const stats = [
    { number: "500+", label: "Certified Doctors" },
    { number: "24/7", label: "Healthcare Support" },
    { number: "100%", label: "Secure & Encrypted" },
    { number: "10K+", label: "Happy Patients" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Toaster position="top-center" reverseOrder={false} />
      <nav className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">CuraAI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Emergency Dial</span>
            </button>
            <Link href="/register"><button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">
              Sign up / Login
            </button></Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Your Health,
                <br />
                Our Priority
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Experience comprehensive healthcare with our advanced digital
                platform. Connect with certified professionals, get AI-powered
                insights, and manage your health journey seamlessly.
              </p>
              <Link href="/register"><button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-colors flex items-center space-x-2 text-lg">
                <span>Get Started</span>
                <ChevronRight className="w-5 h-5" />
              </button></Link>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Quick Health Check
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-lg bg-white/20 backdrop-blur border border-white/30 placeholder-white/70 text-white"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-4 rounded-lg bg-white/20 backdrop-blur border border-white/30 placeholder-white/70 text-white"
                />
                <select className="w-full p-4 rounded-lg bg-white/20 backdrop-blur border border-white/30 text-white">
                  <option value="">Select Service</option>
                  <option value="consultation" className="text-black">Video Consultation</option>
                  <option value="appointment" className="text-black">Book Appointment</option>
                  <option value="analysis" className="text-black">Report Analysis</option>
                </select>
                <button  onClick={() => toast.success('This is just a demo form please login to access our services')} className="w-full bg-blue-800 hover:bg-blue-900 text-white py-4 rounded-lg font-semibold transition-colors">
                  Get Free Consultation
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience modern healthcare with our range of digital health
              services designed to keep you healthy and connected.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by healthcare professionals and patients worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of patients and healthcare providers who trust MedX
            for their medical needs.
          </p>
          <Link href="/login"><button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-colors text-lg inline-flex items-center space-x-2">
            <span>Get Started Today</span>
            <ChevronRight className="w-5 h-5" />
          </button></Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-16 px-6" id="contact">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">MedX</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted healthcare partner, providing quality medical care
              through innovative telemedicine solutions.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-colors">
                <span className="text-sm">f</span>
              </div>
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-colors">
                <span className="text-sm">t</span>
              </div>
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-colors">
                <span className="text-sm">in</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <div className="space-y-3">
              <a
                href="#home"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#services"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Services
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Find Doctors
              </a>
              <a
                href="#about"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </a>
              <a
                href="#contact"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Online Consultation
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Emergency Care
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Health Checkups
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Mental Health
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Prescription
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">contact@medx.healthcare</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <div className="text-gray-400">
                  <div>123 Healthcare Blvd,</div>
                  <div>Medical District, NY 10001</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 MedX Healthcare. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MedXLandingPage
