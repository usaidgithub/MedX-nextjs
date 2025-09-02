import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Phone, Clock, Star, Filter, Navigation } from 'lucide-react';

const HealthcareFacilityLocator = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [facilityType, setFacilityType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [markers, setMarkers] = useState([]);

  // Mock healthcare facilities data with reviews
  const mockFacilities = [
    {
      id: 1,
      name: "City General Hospital",
      type: "hospital",
      address: "123 Healthcare Ave, Medical District",
      phone: "+1 (555) 123-4567",
      hours: "24/7 Emergency",
      lat: 19.0760 + (Math.random() - 0.5) * 0.02,
      lng: 72.8777 + (Math.random() - 0.5) * 0.02,
      rating: 4.5,
      reviews: [
        { id: 1, user: "Sarah M.", rating: 5, comment: "Excellent emergency care and professional staff.", date: "2024-08-15" },
        { id: 2, user: "John D.", rating: 4, comment: "Clean facilities and efficient service.", date: "2024-08-10" }
      ],
      specialties: ["Emergency", "Cardiology", "Neurology"]
    },
    {
      id: 2,
      name: "MedPlus Pharmacy",
      type: "pharmacy",
      address: "456 Medicine Street, Downtown",
      phone: "+1 (555) 234-5678",
      hours: "8:00 AM - 10:00 PM",
      lat: 19.0760 + (Math.random() - 0.5) * 0.02,
      lng: 72.8777 + (Math.random() - 0.5) * 0.02,
      rating: 4.2,
      reviews: [
        { id: 1, user: "Maria G.", rating: 4, comment: "Good selection of medicines and helpful pharmacist.", date: "2024-08-20" },
        { id: 2, user: "Robert L.", rating: 4, comment: "Quick service and reasonable prices.", date: "2024-08-18" }
      ],
      services: ["Prescription Filling", "Health Consultations", "Medical Supplies"]
    },
    {
      id: 3,
      name: "Family Care Clinic",
      type: "clinic",
      address: "789 Wellness Road, Suburb",
      phone: "+1 (555) 345-6789",
      hours: "9:00 AM - 6:00 PM",
      lat: 19.0760 + (Math.random() - 0.5) * 0.02,
      lng: 72.8777 + (Math.random() - 0.5) * 0.02,
      rating: 4.7,
      reviews: [
        { id: 1, user: "Emily R.", rating: 5, comment: "Dr. Smith is amazing! Very thorough and caring.", date: "2024-08-22" },
        { id: 2, user: "Michael B.", rating: 4, comment: "Great family practice with short wait times.", date: "2024-08-19" }
      ],
      specialties: ["Family Medicine", "Pediatrics", "Preventive Care"]
    },
    {
      id: 4,
      name: "Metro Diagnostic Center",
      type: "diagnostic",
      address: "321 Lab Lane, Medical Park",
      phone: "+1 (555) 456-7890",
      hours: "7:00 AM - 7:00 PM",
      lat: 19.0760 + (Math.random() - 0.5) * 0.02,
      lng: 72.8777 + (Math.random() - 0.5) * 0.02,
      rating: 4.3,
      reviews: [
        { id: 1, user: "Lisa W.", rating: 4, comment: "Fast lab results and professional technicians.", date: "2024-08-21" },
        { id: 2, user: "David K.", rating: 4, comment: "Clean facility with modern equipment.", date: "2024-08-17" }
      ],
      services: ["Blood Tests", "X-Ray", "MRI", "Ultrasound"]
    },
    {
      id: 5,
      name: "Healing Hands Urgent Care",
      type: "urgent_care",
      address: "654 Quick Care Blvd, Central",
      phone: "+1 (555) 567-8901",
      hours: "8:00 AM - 8:00 PM",
      lat: 19.0760 + (Math.random() - 0.5) * 0.02,
      lng: 72.8777 + (Math.random() - 0.5) * 0.02,
      rating: 4.4,
      reviews: [
        { id: 1, user: "Jennifer T.", rating: 5, comment: "No appointment needed and very quick service!", date: "2024-08-23" },
        { id: 2, user: "Mark S.", rating: 4, comment: "Convenient location and friendly staff.", date: "2024-08-16" }
      ],
      specialties: ["Minor Injuries", "Illness Treatment", "Vaccinations"]
    }
  ];

  // Initialize map
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.js';
    script.onload = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css';
      document.head.appendChild(link);
      
      setTimeout(() => {
        if (mapRef.current && window.L) {
          const leafletMap = window.L.map(mapRef.current).setView([19.0760, 72.8777], 13);
          
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(leafletMap);
          
          setMap(leafletMap);
        }
      }, 100);
    };
    document.head.appendChild(script);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          if (map) {
            map.setView([latitude, longitude], 13);
            window.L.marker([latitude, longitude])
              .addTo(map)
              .bindPopup('Your Location')
              .openPopup();
          }
        },
        (error) => {
          console.log('Location access denied, using default location');
          setUserLocation({ lat: 19.0760, lng: 72.8777 });
        }
      );
    }
  }, [map]);

  // Load facilities
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFacilities(mockFacilities);
      setFilteredFacilities(mockFacilities);
      setLoading(false);
    }, 1000);
  }, []);

  // Add markers to map
  useEffect(() => {
    if (map && filteredFacilities.length > 0) {
      markers.forEach(marker => map.removeLayer(marker));
      
      const newMarkers = filteredFacilities.map(facility => {
        const icon = window.L.divIcon({
          html: `<div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">${getTypeIcon(facility.type)}</div>`,
          className: 'custom-marker',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        
        const marker = window.L.marker([facility.lat, facility.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div class="p-2">
              <h3 class="font-bold text-blue-900">${facility.name}</h3>
              <p class="text-sm text-gray-600">${facility.type}</p>
              <p class="text-xs">${facility.address}</p>
            </div>
          `);
        
        marker.on('click', () => setSelectedFacility(facility));
        return marker;
      });
      
      setMarkers(newMarkers);
    }
  }, [map, filteredFacilities]);

  const getTypeIcon = (type) => {
    const icons = {
      hospital: 'H',
      pharmacy: 'P',
      clinic: 'C',
      diagnostic: 'D',
      urgent_care: 'U'
    };
    return icons[type] || 'M';
  };

  const getTypeColor = (type) => {
    const colors = {
      hospital: 'bg-red-100 text-red-800',
      pharmacy: 'bg-green-100 text-green-800',
      clinic: 'bg-blue-100 text-blue-800',
      diagnostic: 'bg-purple-100 text-purple-800',
      urgent_care: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterFacilities(query, facilityType);
  };

  const handleTypeFilter = (type) => {
    setFacilityType(type);
    filterFacilities(searchQuery, type);
  };

  const filterFacilities = (query, type) => {
    let filtered = facilities;
    
    if (type !== 'all') {
      filtered = filtered.filter(facility => facility.type === type);
    }
    
    if (query) {
      filtered = filtered.filter(facility =>
        facility.name.toLowerCase().includes(query.toLowerCase()) ||
        facility.address.toLowerCase().includes(query.toLowerCase()) ||
        facility.type.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredFacilities(filtered);
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const FacilityCard = ({ facility }) => {
    const distance = userLocation 
      ? calculateDistance(userLocation.lat, userLocation.lng, facility.lat, facility.lng)
      : null;

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
           onClick={() => setSelectedFacility(facility)}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-blue-900">{facility.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(facility.type)}`}>
            {facility.type.replace('_', ' ')}
          </span>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-4">
            {renderStars(facility.rating)}
            <span className="ml-1 text-sm text-gray-600">({facility.rating})</span>
          </div>
          {distance && (
            <span className="text-sm text-blue-600 font-medium">{distance.toFixed(1)} km away</span>
          )}
        </div>
        
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            {facility.address}
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2 text-blue-500" />
            {facility.phone}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            {facility.hours}
          </div>
        </div>
        
        {facility.specialties && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {facility.specialties.slice(0, 3).map((specialty, index) => (
                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const FacilityDetails = ({ facility, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-blue-900">{facility.name}</h2>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getTypeColor(facility.type)}`}>
                  {facility.type.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    {facility.address}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-blue-500" />
                    {facility.phone}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    {facility.hours}
                  </div>
                </div>

                {(facility.specialties || facility.services) && (
                  <div className="mt-4">
                    <h4 className="font-medium text-blue-900 mb-2">
                      {facility.specialties ? 'Specialties' : 'Services'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(facility.specialties || facility.services).map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Reviews & Ratings</h3>
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    {renderStars(facility.rating)}
                    <span className="ml-2 text-lg font-semibold text-blue-900">{facility.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">({facility.reviews.length} reviews)</span>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {facility.reviews.map(review => (
                    <div key={review.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">{review.user}</span>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">{review.comment}</p>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </button>
              <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">Healthcare Facility Locator</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hospitals, clinics, pharmacies..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  value={facilityType}
                  onChange={(e) => handleTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="hospital">Hospitals</option>
                  <option value="clinic">Clinics</option>
                  <option value="pharmacy">Pharmacies</option>
                  <option value="diagnostic">Diagnostic Centers</option>
                  <option value="urgent_care">Urgent Care</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-full md:w-96 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-blue-900">
                Nearby Facilities ({filteredFacilities.length})
              </h2>
              {loading && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              )}
            </div>
            
            {filteredFacilities.length === 0 && !loading ? (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No facilities found matching your criteria.</p>
              </div>
            ) : (
              <div>
                {filteredFacilities.map(facility => (
                  <FacilityCard key={facility.id} facility={facility} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <div ref={mapRef} className="w-full h-full"></div>
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2">
            <button
              onClick={() => {
                if (userLocation && map) {
                  map.setView([userLocation.lat, userLocation.lng], 15);
                }
              }}
              className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <Navigation className="w-4 h-4 mr-2" />
              My Location
            </button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Legend</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs mr-2">H</div>
                Hospitals
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs mr-2">C</div>
                Clinics
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center text-white text-xs mr-2">P</div>
                Pharmacies
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs mr-2">D</div>
                Diagnostic
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs mr-2">U</div>
                Urgent Care
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Details Modal */}
      {selectedFacility && (
        <FacilityDetails
          facility={selectedFacility}
          onClose={() => setSelectedFacility(null)}
        />
      )}
    </div>
  );
};

export default HealthcareFacilityLocator;