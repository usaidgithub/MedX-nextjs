import React, { useState } from 'react';
import { Search, Calendar, Clock, MapPin, Star, User, Heart, Brain, Eye, Bone, Baby, Stethoscope } from 'lucide-react';

const Appointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    patientName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    medicalHistory: '',
    currentSymptoms: '',
    emergencyContact: ''
  });

  const specialties = [
    { id: 'all', name: 'All Specialties', icon: Stethoscope },
    { id: 'cardiology', name: 'Cardiology', icon: Heart },
    { id: 'general', name: 'General Medicine', icon: Stethoscope },
    { id: 'neurology', name: 'Neurology', icon: Brain },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: Eye },
    { id: 'orthopedics', name: 'Orthopedics', icon: Bone },
    { id: 'pediatrics', name: 'Pediatrics', icon: Baby }
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'cardiology',
      rating: 4.9,
      experience: 12,
      location: '2.5 km away',
      avatar: '/api/placeholder/60/60',
      consultationFee: 500,
      availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
      languages: ['English', 'Hindi']
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialty: 'general',
      rating: 4.7,
      experience: 15,
      location: '1.8 km away',
      avatar: '/api/placeholder/60/60',
      consultationFee: 400,
      availableSlots: ['10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'],
      languages: ['English', 'Hindi', 'Tamil']
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialty: 'neurology',
      rating: 4.8,
      experience: 10,
      location: '3.1 km away',
      avatar: '/api/placeholder/60/60',
      consultationFee: 600,
      availableSlots: ['09:30 AM', '11:30 AM', '02:30 PM','05:00 PM'],
      languages: ['English', 'Hindi']
    },
    {
      id: 4,
      name: 'Dr. Ahmed Hassan',
      specialty: 'ophthalmology',
      rating: 4.6,
      experience: 8,
      location: '4.2 km away',
      avatar: '/api/placeholder/60/60',
      consultationFee: 450,
      availableSlots: ['08:00 AM', '10:00 AM', '01:00 PM', '04:00 PM'],
      languages: ['English', 'Hindi', 'Urdu']
    },
    {
      id: 5,
      name: 'Dr. Anita Mehta',
      specialty: 'pediatrics',
      rating: 4.9,
      experience: 14,
      location: '1.5 km away',
      avatar: '/api/placeholder/60/60',
      consultationFee: 550,
      availableSlots: ['09:00 AM', '12:00 PM', '03:00 PM','05:00 PM'],
      languages: ['English', 'Hindi', 'Gujarati']
    },
     {
      id: 6,
      name: 'Dr. Rajesh Kumar',
      specialty: 'general',
      rating: 4.7,
      experience: 15,
      location: '1.8 km away',
      avatar: '/api/placeholder/60/60',
      consultationFee: 400,
      availableSlots: ['10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'],
      languages: ['English', 'Hindi', 'Tamil']
    },
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
  };

  const handleSubmitBooking = () => {
    // Here you would typically send the booking data to your backend
    if (bookingData.patientName && bookingData.age && bookingData.gender && 
        bookingData.phone && bookingData.email && bookingData.preferredDate && 
        bookingData.preferredTime) {
      alert(`Appointment booked successfully with ${selectedDoctor.name}!`);
      setShowBookingForm(false);
      setBookingData({
        patientName: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        preferredDate: '',
        preferredTime: '',
        medicalHistory: '',
        currentSymptoms: '',
        emergencyContact: ''
      });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Book Your Appointment</h1>
          <p className="text-gray-600 mt-2">Find and book appointments with qualified doctors near you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!showBookingForm ? (
          <>
            {/* Search and Filter Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-sky-100">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search doctors by name or specialty..."
                    className="w-full pl-10 pr-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Specialty Filter */}
                <select
                  className="px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-white min-w-48"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  {specialties.map(specialty => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Specialty Quick Filters */}
              <div className="flex flex-wrap gap-3 mt-6">
                {specialties.map(specialty => {
                  const Icon = specialty.icon;
                  return (
                    <button
                      key={specialty.id}
                      onClick={() => setSelectedSpecialty(specialty.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        selectedSpecialty === specialty.id
                          ? 'bg-sky-500 text-white shadow-md'
                          : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{specialty.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map(doctor => (
                <div key={doctor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-sky-100 overflow-hidden">
                  <div className="p-6">
                    {/* Doctor Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-sky-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                        <p className="text-sky-600 font-medium capitalize">{doctor.specialty.replace('_', ' ')}</p>
                      </div>
                    </div>

                    {/* Doctor Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold text-gray-700">{doctor.rating}</span>
                        </div>
                        <span className="text-gray-600">{doctor.experience} years exp.</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-sky-500" />
                        <span className="text-gray-600">{doctor.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-sky-600">₹{doctor.consultationFee}</span>
                        <span className="text-gray-500">consultation fee</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {doctor.languages.map(lang => (
                          <span key={lang} className="px-2 py-1 bg-sky-50 text-sky-600 text-xs rounded-full">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Available Slots */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-2">Available Today:</p>
                      <div className="flex flex-wrap gap-2">
                        {doctor.availableSlots.slice(0, 3).map(slot => (
                          <span key={slot} className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full border border-green-200">
                            {slot}
                          </span>
                        ))}
                        {doctor.availableSlots.length > 3 && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-500 text-sm rounded-full">
                            +{doctor.availableSlots.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleBookAppointment(doctor)}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-sky-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No doctors found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        ) : (
          /* Booking Form */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-6 text-white">
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-white/80 hover:text-white mb-4 flex items-center gap-2 transition-colors"
                >
                  ← Back to doctors
                </button>
                <h2 className="text-2xl font-bold mb-2">Book Appointment</h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">{selectedDoctor?.name}</p>
                    <p className="text-sky-100 capitalize">{selectedDoctor?.specialty} • {selectedDoctor?.location}</p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-sky-500" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="patientName"
                        value={bookingData.patientName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                      <input
                        type="number"
                        name="age"
                        value={bookingData.age}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select
                        name="gender"
                        value={bookingData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-sky-500" />
                    Appointment Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={bookingData.preferredDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
                      <select
                        name="preferredTime"
                        value={bookingData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                        required
                      >
                        <option value="">Select Time</option>
                        {selectedDoctor?.availableSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-sky-500" />
                    Medical Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Symptoms</label>
                      <textarea
                        name="currentSymptoms"
                        value={bookingData.currentSymptoms}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                        placeholder="Describe your current symptoms or concerns..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
                      <textarea
                        name="medicalHistory"
                        value={bookingData.medicalHistory}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                        placeholder="Any previous medical conditions, surgeries, medications, allergies..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={bookingData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                        placeholder="Emergency contact name and phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-6 border-t border-sky-100">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 px-6 py-3 border border-sky-200 text-sky-600 rounded-xl hover:bg-sky-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitBooking}
                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Confirm Appointment
                  </button>
                </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;