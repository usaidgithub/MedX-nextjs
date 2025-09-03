import React, { useState } from 'react';
import { Heart, Phone, Star, Users, MapPin, Target, TrendingDown, Clock, Shield, Award, FileText, Send, User, Mail, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
// Hero Section Component
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full border-4 border-white"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full border-2 border-white"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full border border-white"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-20 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Every Heartbeat Matters.
          <br />
          <span className="text-blue-200">Your Kindness Can Save Lives.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
          Behind every medical emergency is a family praying for a miracle. We're building this 
          platform to be that miracle - connecting your generosity with those who need it 
          most. Together, we can ensure that no one suffers in silence because they can't 
          afford healthcare.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button className="flex items-center space-x-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-lg transition-colors">
            <Heart className="w-5 h-5" />
            <span>Donate Now & Save Lives</span>
          </button>
          <button className="flex items-center space-x-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-700 rounded-lg font-semibold text-lg transition-colors">
            <span>See Our Impact Stories</span>
          </button>
        </div>
        
        {/* Donation Amount Selection */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-4 text-center">Select Donation Amount</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[500, 1000, 2500, 5000].map((amount) => (
              <button
                key={amount}
                className="bg-white/20 hover:bg-white hover:text-blue-700 text-white border border-white/30 rounded-lg py-3 px-4 font-semibold transition-all duration-300 hover:scale-105"
              >
                ₹{amount.toLocaleString()}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Enter custom amount"
                className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:bg-white focus:text-gray-800 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
            </div>
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors whitespace-nowrap">
              Proceed to Pay
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-blue-200">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-sm">Every donation is 100% secure and comes with tax benefits under Section 80G</span>
        </div>
      </div>
    </section>
  );
};

// Medical Cases Component
const MedicalCases = () => {
  const cases = [
    {
      id: 1,
      title: "Help! Security Guard's son needs brain surgery worth ₹22,80,000",
      fundsRequired: "₹22,80,000",
      daysLeft: "11 Days",
      peopleSupported: 194,
      progress: 65,
      image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 2,
      title: "He Has Tubes Attached To His Body, I Cannot See Him Suffer",
      fundsRequired: "₹6,00,000",
      daysLeft: "2 Days",
      peopleSupported: 99,
      progress: 80,
      image: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 3,
      title: "Help! She lost her husband, and has been suffering for 20 years",
      fundsRequired: "₹5,00,000",
      daysLeft: "5 Days",
      peopleSupported: 103,
      progress: 45,
      image: "https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Urgent Medical Cases</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These patients need immediate help. Your donation can save lives and provide hope 
            to families in crisis.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((medicalCase) => (
            <div key={medicalCase.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Tax Benefit Badge */}
              <div className="relative">
                <img 
                  src={medicalCase.image} 
                  alt="Medical case"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  TAX BENEFIT
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 line-clamp-2">
                  {medicalCase.title}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-gray-500">Funds Required</span>
                      <div className="font-bold text-lg text-gray-800">{medicalCase.fundsRequired}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500">Campaign ends in</span>
                      <div className="font-bold text-lg text-red-600 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {medicalCase.daysLeft}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div>
                    <div className="bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${medicalCase.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{medicalCase.peopleSupported} people donated</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <span>CONTRIBUTE NOW</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Impact Stats Component
const ImpactStats = () => {
  const stats = [
    {
      icon: Users,
      number: "25,000+",
      title: "Lives Impacted",
      description: "Patients helped through our AI-powered healthcare solutions"
    },
    {
      icon: MapPin,
      number: "150+",
      title: "Healthcare Centers",
      description: "Medical facilities using our technology"
    },
    {
      icon: Target,
      number: "95%",
      title: "Diagnostic Accuracy",
      description: "Improvement in early disease detection"
    },
    {
      icon: TrendingDown,
      number: "40%",
      title: "Cost Reduction",
      description: "Average healthcare cost savings for patients"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact So Far</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how your contributions are making a real difference in healthcare accessibility 
            and outcomes
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <stat.icon className="w-8 h-8 text-blue-600 group-hover:text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-700 mb-2">{stat.title}</div>
              <div className="text-sm text-gray-600 leading-relaxed">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Tax Benefits Component
const TaxBenefits = () => {
  const benefits = [
    {
      icon: FileText,
      title: "80G Tax Deduction",
      description: "Get 50% tax deduction under Section 80G of Income Tax Act"
    },
    {
      icon: Award,
      title: "Donor Recognition",
      description: "Annual recognition ceremony and donor wall of fame"
    },
    {
      icon: Shield,
      title: "Transparency Reports",
      description: "Detailed quarterly reports on fund utilization and impact"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tax Benefits & Recognition</h2>
          <p className="text-lg text-gray-600">Your generosity is recognized and rewarded</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// User Needs Form Component
const UserNeedsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    medicalCondition: '',
    urgency: 'medium',
    fundingNeeded: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Your request has been submitted. Our team will contact you soon.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Need Medical Assistance?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your medical needs and our team will help you get the support you require. 
            Every case is reviewed with care and compassion.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="City, State"
                />
              </div>
            </div>
            
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Medical Condition *
              </label>
              <input
                type="text"
                name="medicalCondition"
                value={formData.medicalCondition}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Brief description of medical condition"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Urgency Level *
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="low">Low - Can wait a few weeks</option>
                  <option value="medium">Medium - Needs attention soon</option>
                  <option value="high">High - Urgent care needed</option>
                  <option value="critical">Critical - Emergency</option>
                </select>
              </div>
              
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Estimated Funding Needed
                </label>
                <input
                  type="text"
                  name="fundingNeeded"
                  value={formData.fundingNeeded}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="₹ X,XX,XXX (if known)"
                />
              </div>
            </div>
            
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 mr-2" />
                Additional Information
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder="Please provide any additional details about your situation, current treatment, doctor recommendations, etc."
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>Submit Request</span>
              </button>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              <p>Your information is secure and confidential. Our medical team will review your case and contact you within 24 hours.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">curaAI</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Connecting generosity with healthcare needs through AI-powered solutions. 
              Making quality healthcare accessible to everyone.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tax Benefits</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span>support@cura-ai.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span>+91 80XXX XXXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 curaAI. All rights reserved. Registered under Section 80G.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <MedicalCases />
      <ImpactStats />
      <TaxBenefits />
      <UserNeedsForm />
      <Footer />
    </div>
  );
};

export default App;