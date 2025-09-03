import React, { useState } from 'react';
import { Search, MapPin, Globe, Phone, Mail, ExternalLink, FileText, Heart, Users, Building, Star } from 'lucide-react';
import Header from '@/components/Header';
const governmentSchemes = [
  {
    id: 1,
    name: "Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    description: "World's largest health insurance scheme providing coverage up to ₹5 lakh per family per year",
    eligibility: "Families covered under SECC-2011 database",
    coverage: "₹5,00,000 per family per year",
    benefits: ["Free treatment at empaneled hospitals", "Cashless transactions", "Pre and post hospitalization coverage"],
    applicationProcess: "Visit nearest Common Service Center or apply online through PM-JAY portal"
  },
  {
    id: 2,
    name: "Rashtriya Swasthya Bima Yojana (RSBY)",
    description: "Health insurance scheme for Below Poverty Line families",
    eligibility: "BPL families identified by respective state governments",
    coverage: "₹30,000 per family per year",
    benefits: ["Cashless treatment", "Pre-existing disease coverage", "Maternity benefits"],
    applicationProcess: "Register through state nodal agency or authorized centers"
  },
  {
    id: 3,
    name: "Employees' State Insurance Scheme (ESI)",
    description: "Medical care and cash benefits to employees and their dependents",
    eligibility: "Employees earning up to ₹25,000 per month",
    coverage: "Comprehensive medical care",
    benefits: ["Free medical treatment", "Disability benefits", "Maternity benefits"],
    applicationProcess: "Apply through employer or ESI branch office"
  },
  {
    id: 4,
    name: "Central Government Health Scheme (CGHS)",
    description: "Healthcare delivery system for central government employees",
    eligibility: "Central government employees and pensioners",
    coverage: "Comprehensive healthcare",
    benefits: ["Cashless treatment", "Specialist consultations", "Diagnostic services"],
    applicationProcess: "Apply through respective administrative office"
  },
  {
    id: 5,
    name: "Janani Suraksha Yojana (JSY)",
    description: "Safe motherhood intervention under National Health Mission",
    eligibility: "Pregnant women from BPL families",
    coverage: "Cash assistance for institutional delivery",
    benefits: ["Cash incentives", "Free delivery", "Postnatal care"],
    applicationProcess: "Register at nearest ASHA worker or health facility"
  }
];

const welfareOrganizations = [
  {
    id: 1,
    name: "Smile Foundation",
    type: "NGO",
    focus: "Healthcare & Education",
    location: "New Delhi, Pan-India",
    website: "www.smilefoundationindia.org",
    phone: "+91-11-43123700",
    email: "info@smilefoundationindia.org",
    services: ["Free medical camps", "Child healthcare", "Education support"],
    description: "Working towards providing healthcare and education to underprivileged children",
    rating: 4.8
  },
  {
    id: 2,
    name: "Helpage India",
    type: "NGO",
    focus: "Elder Care",
    location: "New Delhi, Multiple States",
    website: "www.helpageindia.org",
    phone: "+91-11-41688955",
    email: "info@helpageindia.org",
    services: ["Elder healthcare", "Cataract surgeries", "Physiotherapy"],
    description: "Dedicated to the cause and care of disadvantaged elderly",
    rating: 4.7
  },
  {
    id: 3,
    name: "Goonj",
    type: "NGO",
    focus: "Rural Development & Health",
    location: "New Delhi, Rural Areas",
    website: "www.goonj.org",
    phone: "+91-11-26972351",
    email: "info@goonj.org",
    services: ["Healthcare awareness", "Maternal health", "Disaster relief"],
    description: "Rural development organization working on health and welfare",
    rating: 4.9
  },
  {
    id: 4,
    name: "Akshaya Patra Foundation",
    type: "NGO",
    focus: "Nutrition & Health",
    location: "Bangalore, Pan-India",
    website: "www.akshayapatra.org",
    phone: "+91-80-30143400",
    email: "info@akshayapatra.org",
    services: ["Mid-day meals", "Nutrition programs", "Health camps"],
    description: "World's largest NGO-run mid-day meal programme",
    rating: 4.6
  },
  {
    id: 5,
    name: "CRY - Child Rights and You",
    type: "NGO",
    focus: "Child Health & Rights",
    location: "Mumbai, Pan-India",
    website: "www.cry.org",
    phone: "+91-22-67757777",
    email: "info@cry.org",
    services: ["Child healthcare", "Immunization drives", "Malnutrition programs"],
    description: "Working to ensure happier childhoods for underprivileged children",
    rating: 4.5
  },
  {
    id: 6,
    name: "Bharti Foundation",
    type: "Trust",
    focus: "Healthcare & Education",
    location: "New Delhi, Multiple States",
    website: "www.bhartifoundation.org",
    phone: "+91-124-4666100",
    email: "info@bhartifoundation.org",
    services: ["Satya Bharti Abhiyan", "Healthcare initiatives", "Rural development"],
    description: "Implementing programs in education and healthcare",
    rating: 4.4
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('schemes');

  const filteredSchemes = governmentSchemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrganizations = welfareOrganizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.focus.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 pt-20">
        <Header/>
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-600 to-blue-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Healthcare Support Directory
            </h1>
            <p className="text-xl text-sky-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive guide to government medical schemes and welfare organizations 
              dedicated to improving healthcare access across India
            </p>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('schemes')}
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                activeTab === 'schemes'
                  ? 'border-sky-500 text-sky-600 bg-sky-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="inline-block w-5 h-5 mr-2" />
              Government Medical Schemes
            </button>
            <button
              onClick={() => setActiveTab('organizations')}
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                activeTab === 'organizations'
                  ? 'border-sky-500 text-sky-600 bg-sky-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Heart className="inline-block w-5 h-5 mr-2" />
              Welfare Organizations
            </button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Search ${activeTab === 'schemes' ? 'medical schemes' : 'organizations'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300 shadow-sm"
          />
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'schemes' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Government Medical Schemes</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore various government healthcare schemes designed to provide affordable medical care to citizens across different categories
              </p>
            </div>

            <div className="grid gap-6 lg:gap-8">
              {filteredSchemes.map((scheme) => (
                <div key={scheme.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1 mb-6 lg:mb-0 lg:pr-8">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl lg:text-2xl font-bold text-gray-800">{scheme.name}</h3>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">{scheme.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-sky-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sky-800 mb-2">Coverage</h4>
                            <p className="text-sky-700">{scheme.coverage}</p>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-800 mb-2">Eligibility</h4>
                            <p className="text-blue-700">{scheme.eligibility}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-3">Key Benefits</h4>
                          <ul className="space-y-2">
                            {scheme.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center text-gray-600">
                                <div className="w-2 h-2 bg-sky-500 rounded-full mr-3 flex-shrink-0"></div>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Application Process</h4>
                          <p className="text-gray-600">{scheme.applicationProcess}</p>
                        </div>
                      </div>

                      <div className="lg:w-64 flex-shrink-0">
                        <button className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-sky-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                          Apply Now
                        </button>
                        <button className="w-full mt-3 bg-white border-2 border-sky-600 text-sky-600 py-3 px-6 rounded-lg font-semibold hover:bg-sky-50 transition-all duration-300">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'organizations' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Welfare Organizations & NGOs</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Connect with trusted welfare organizations and NGOs working to improve healthcare access and support communities in need
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredOrganizations.map((org) => (
                <div key={org.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                          {org.type === 'NGO' ? <Users className="w-6 h-6 text-white" /> : <Building className="w-6 h-6 text-white" />}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-sky-600 transition-colors duration-300">
                            {org.name}
                          </h3>
                          <span className="text-sm text-sky-600 bg-sky-100 px-2 py-1 rounded-full">{org.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-600">{org.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{org.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Heart className="w-4 h-4 text-sky-500 mr-3 flex-shrink-0" />
                        <span className="font-medium">Focus:</span>
                        <span className="ml-2">{org.focus}</span>
                      </div>
                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-sky-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{org.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Globe className="w-4 h-4 text-sky-500 mr-3 flex-shrink-0" />
                        <a href={`https://${org.website}`} className="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          {org.website}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-sky-500 mr-3 flex-shrink-0" />
                        <a href={`tel:${org.phone}`} className="text-sky-600 hover:underline">{org.phone}</a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-sky-500 mr-3 flex-shrink-0" />
                        <a href={`mailto:${org.email}`} className="text-sky-600 hover:underline">{org.email}</a>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Services Offered</h4>
                      <div className="flex flex-wrap gap-2">
                        {org.services.map((service, index) => (
                          <span key={index} className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-2 px-4 rounded-lg font-medium hover:from-sky-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 text-sm shadow-md hover:shadow-lg">
                        Contact Now
                      </button>
                      <a
                        href={`https://${org.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white border-2 border-sky-600 text-sky-600 py-2 px-4 rounded-lg font-medium hover:bg-sky-50 transition-all duration-300 text-sm text-center inline-flex items-center justify-center"
                      >
                        Visit Website
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {((activeTab === 'schemes' && filteredSchemes.length === 0) || 
          (activeTab === 'organizations' && filteredOrganizations.length === 0)) && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search terms or browse all available options</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Need Additional Help?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our healthcare support team is here to assist you in finding the right medical scheme or welfare organization for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-3 px-8 rounded-lg font-semibold hover:from-sky-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Contact Support
              </button>
              <button className="bg-transparent border-2 border-sky-400 text-sky-400 py-3 px-8 rounded-lg font-semibold hover:bg-sky-400 hover:text-white transition-all duration-300">
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;