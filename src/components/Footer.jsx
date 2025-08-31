import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Socials */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-medical-primary rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-extrabold text-white">
                Cura<span className="text-medical-accent">AI</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Your trusted healthcare partner, providing quality medical care through innovative telemedicine solutions.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Facebook">
                <Facebook className="w-7 h-7 text-gray-400 hover:text-medical-primary transition-colors duration-300 transform hover:scale-110" />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter className="w-7 h-7 text-gray-400 hover:text-medical-primary transition-colors duration-300 transform hover:scale-110" />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram className="w-7 h-7 text-gray-400 hover:text-medical-primary transition-colors duration-300 transform hover:scale-110" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="w-7 h-7 text-gray-400 hover:text-medical-primary transition-colors duration-300 transform hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-400 hover:text-medical-primary transition-colors duration-300">Home</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-medical-primary transition-colors duration-300">Services</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-medical-primary transition-colors duration-300">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-medical-primary transition-colors duration-300">Contact</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-medical-primary transition-colors duration-300">FAQs</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-medical-primary transition-colors duration-300">Online Consultation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-medical-primary transition-colors duration-300">Report Analysis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-medical-primary transition-colors duration-300">Health Vault</a></li>
              <li><a href="#" className="text-gray-400 hover:text-medical-primary transition-colors duration-300">Emergency Care</a></li>
              <li><a href="#" className="text-gray-400 hover:text-medical-primary transition-colors duration-300">Facility Finder</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-medical-primary flex-shrink-0" />
                <span className="text-gray-400 hover:text-white transition-colors duration-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-medical-primary flex-shrink-0" />
                <span className="text-gray-400 hover:text-white transition-colors duration-300">contact@curai.healthcare</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-medical-primary flex-shrink-0 mt-1" />
                <span className="text-gray-400 hover:text-white transition-colors duration-300">123 Healthcare Blvd,<br />Medical District, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 text-center md:text-left mb-4 md:mb-0">
            © 2024 CuraAI Healthcare. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-2 md:space-y-0">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;