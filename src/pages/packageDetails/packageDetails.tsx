import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Users, Check, X, ChevronLeft, ChevronRight} from 'lucide-react';
// import { getApi } from '@/api/api';
import { Main_loader } from '../../components/mainloader/main_loader';
import { getApi } from '../../api/api';

// Define the Package type
interface Package {
  packageId: string;
  id: number;
  title: string;
  destination: string;
  description: string;
  longDescription: string;
  duration: string;
  groupSize: string;
  price: string;
  realPrice: string;
  rating: number;
  reviewCount: number;
  images: string[];
  included: string[];
  notIncluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    image?: string;
  }[];
  highlights: string[];
  amenities: {
    icon: string;
    name: string;
  }[];
}

// Sample data - replace with your actual data or API call
const SAMPLE_PACKAGES: Package[] = [
  {
    id: 1,
    packageId: "bali-1",
    title: 'Romantic Honeymoon in Bali',
    destination: 'Bali, Indonesia',
    description: 'Enjoy 5 nights and 6 days in beautiful Bali with your loved one.',
    longDescription: 'Experience the ultimate romantic getaway in the paradise island of Bali. This carefully crafted package combines luxury accommodations, private experiences, and the natural beauty of Bali.',
    duration: '6 days, 5 nights',
    groupSize: '2 people',
    price: '$1,500',
    realPrice: '$2,000',
    rating: 4.8,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b',
      'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8',
      'https://images.unsplash.com/photo-1542897644-e04428948020'
    ],
    included: [
      'Luxury villa accommodation',
      'Daily breakfast and dinner',
      'Private airport transfers',
      'Couple spa treatment'
    ],
    notIncluded: [
      'International flights',
      'Personal expenses',
      'Travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Welcome',
        description: 'Arrive at Denpasar International Airport. Private transfer to your luxury villa.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4'
      },
      {
        day: 2,
        title: 'Ubud Exploration',
        description: 'Guided tour of Ubud. Visit the Monkey Forest and local markets.',
        image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b'
      }
    ],
    highlights: [
      'Private villa with pool',
      'Romantic sunset dinner cruise',
      'Couple spa treatment',
      'Guided cultural tours'
    ],
    amenities: [
      { icon: 'wifi', name: 'Free WiFi' },
      { icon: 'coffee', name: 'Breakfast Included' },
      { icon: 'car', name: 'Airport Transfer' }
    ]
  }
];

const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [currentPackage, setCurrentPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const [activeItineraryDay, setActiveItineraryDay] = useState(1);
  const locationTabRef = useRef<HTMLDivElement>(null); // Ref for the location tab content

const fetchPackages = async () => {
  try {
    setLoading(true);
    const packages = await getApi(`packages/${id}`);
    
    if (packages && !Array.isArray(packages)) {
      setCurrentPackage(packages);
      console.log("Selected package:", packages);
    } else if (packages && Array.isArray(packages)) {
      const selectedPackage = packages.find(pkg => 
        pkg.id === Number(id) || pkg.packageId === id
      );
      
      if (selectedPackage) {
        setCurrentPackage(selectedPackage);
        console.log("Selected package:", selectedPackage);
      } else {
        // Use sample data if package not found in API response
        const samplePackage = SAMPLE_PACKAGES.find(pkg => 
          pkg.id === Number(id) || pkg.packageId === id
        );
        if (samplePackage) {
          console.log("Using sample package data");
          setCurrentPackage(samplePackage);
        } else {
          console.log("Package not found in sample data");
          navigate('/not-found');
        }
      }
    } else {
      // Use sample data if API response is invalid
      const samplePackage = SAMPLE_PACKAGES.find(pkg => 
        pkg.id === Number(id) || pkg.packageId === id
      );
      if (samplePackage) {
        console.log("Using sample package data");
        setCurrentPackage(samplePackage);
      } else {
        console.log("Package not found in sample data");
        navigate('/not-found');
      }
    }
  } catch (error) {
    console.error('Error fetching packages:', error);
    // Use sample data if API call fails
    const samplePackage = SAMPLE_PACKAGES.find(pkg => 
      pkg.id === Number(id) || pkg.packageId === id
    );
    if (samplePackage) {
      console.log("Using sample package data due to API error");
      setCurrentPackage(samplePackage);
    } else {
      console.log("Package not found in sample data");
      navigate('/not-found');
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (id) {
      fetchPackages();
    }
  }, [id]); // Add id to dependency array

  const handlePrevImage = () => {
    if (!currentPackage) return;
    setActiveImageIndex(prev => 
      prev === 0 ? currentPackage.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!currentPackage) return;
    setActiveImageIndex(prev => 
      prev === currentPackage.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleViewOnMap = () => {
    setActiveTab('location');
    // Scroll to the location section after a short delay to allow tab content to render
    setTimeout(() => {
      locationTabRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); // Adjust delay if needed
  };

  if (loading) {
    return <Main_loader />;
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!currentPackage || !currentPackage.price) return '$0.00';
    const basePrice = parseFloat(currentPackage.price.replace('$', '').replace(',', ''));
    const taxesAndFees = 150; // Example fixed tax
    if (isNaN(basePrice)) return currentPackage.price; // Fallback if price is not a number
    return `$${(basePrice + taxesAndFees).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section with Image Gallery */}
      <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        {/* Main Image */}
        <motion.div
          key={activeImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img 
            src={currentPackage?.images[activeImageIndex]} 
            alt={`${currentPackage?.title} - view ${activeImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
        </motion.div>

        {/* Navigation Arrows */}
        <button 
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Package Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center text-white text-sm mb-2">
              <MapPin size={16} className="mr-1" />
              <span>{currentPackage?.destination}</span>
              <span className="mx-2">•</span>
              <Clock size={16} className="mr-1" />
              <span>{currentPackage?.duration}</span>
              <span className="mx-2">•</span>
              <Users size={16} className="mr-1" />
              <span>{currentPackage?.groupSize}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{currentPackage?.title}</h1>
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-white">{currentPackage?.rating}</span>
                <span className="text-white/70 ml-1">({currentPackage?.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery - Placed below the hero for better UX */}
      {currentPackage && currentPackage.images.length > 1 && (
        <div className="bg-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
              {currentPackage.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 transition-all duration-300 ease-in-out
                              ${activeImageIndex === index ? 'border-blue-500 scale-105' : 'border-transparent hover:border-gray-400'}`}
                  whileHover={{ scale: activeImageIndex === index ? 1.05 : 1.02 }}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Package Details */}
          <div className="lg:w-2/3">
            {/* Navigation Tabs */}
            <div className="mb-6">
              <div className="relative border-b border-gray-200">
                <div className="flex space-x-1 overflow-x-auto hide-scrollbar -mb-px">
                  {[
                    { key: 'overview', label: 'Overview' },
                    { key: 'itinerary', label: 'Itinerary' },
                    { key: 'location', label: 'Location' },
                    { key: 'included', label: "What's Included" },
                    { key: 'reviews', label: 'Reviews' },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => handleTabChange(tab.key)}
                      className={`relative whitespace-nowrap py-3 px-4 font-medium text-sm focus:outline-none transition-colors duration-200
                        ${
                          activeTab === tab.key
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                    >
                      {tab.label}
                      {activeTab === tab.key && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                          layoutId="activeTabIndicator" // This creates the sliding effect
                          initial={false}
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab} // Important for AnimatePresence to detect changes
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Package Overview</h2>
                  <p className="text-gray-700 mb-6">{currentPackage?.longDescription}</p>
                  
                  <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {currentPackage?.highlights.map((highlight, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start"
                        whileHover={{ x: 3, color: "rgb(37 99 235)" }} // Tailwind blue-600
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="mt-1 mr-2 flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                          <Check size={12} className="text-blue-600" />
                        </div>
                        <span className="text-gray-700">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    {currentPackage?.amenities.map((amenity, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                        whileHover={{ y: -3, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.07)" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <i className={`fas fa-${amenity.icon} text-blue-600 text-xl w-8 text-center mr-3`}></i>
                        <span className="text-gray-700">{amenity.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary Tab - Enhanced with interactive timeline */}
              {activeTab === 'itinerary' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Your Itinerary</h2>
                  
                  {/* Interactive Day Selector */}
                  <div className="flex overflow-x-auto mb-6 pb-2 hide-scrollbar">
                    {currentPackage?.itinerary.map((day) => (
                      <motion.button
                        key={day.day}
                        onClick={() => setActiveItineraryDay(day.day)}
                        className={`flex-shrink-0 px-4 py-2 mx-1 rounded-full transition ${
                          activeItineraryDay === day.day 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Day {day.day}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Active Day Details */}
                  {currentPackage?.itinerary.map((day) => (
                    day.day === activeItineraryDay && (
                      <motion.div 
                        key={day.day}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50 rounded-xl p-4 mb-6"
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          {day.image && (
                            <div className="md:w-1/3 relative overflow-hidden rounded-lg group">
                              <img 
                                src={day.image} 
                                alt={`Day ${day.day}: ${day.title}`}
                                className="w-full h-60 object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                          )}
                          <div className="md:w-2/3">
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                                <span className="font-medium">{day.day}</span>
                              </div>
                              <h3 className="text-2xl font-semibold">{day.title}</h3>
                            </div>
                            <p className="text-gray-700 mb-4">{day.description}</p>
                            
                            {/* Interactive elements for the day */}
                            <div className="flex flex-wrap gap-2 mt-4">
                              <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleViewOnMap}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                              >
                                View on Map
                              </motion.button>
                              <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                              >
                                Weather Forecast
                              </motion.button>
                              <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                              >
                                Local Tips
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                  
                  {/* Timeline View */}
                  <div className="relative mt-8 pl-8 border-l-2 border-gray-200">
                    {currentPackage?.itinerary.map((day, index) => (
                      <motion.div 
                        key={day.day}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`mb-8 relative ${
                          activeItineraryDay === day.day ? 'opacity-100' : 'opacity-60'
                        }`}
                        onClick={() => setActiveItineraryDay(day.day)}
                      >
                        <div className={`absolute -left-10 w-6 h-6 rounded-full border-2 ${
                          activeItineraryDay === day.day 
                            ? 'bg-blue-600 border-blue-600' 
                            : 'bg-white border-gray-300'
                        }`}>
                          {activeItineraryDay === day.day && (
                            <motion.div 
                              className="absolute inset-0 rounded-full bg-blue-600 opacity-30"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="md:w-1/4">
                            <h4 className="font-bold text-lg">Day {day.day}</h4>
                            <p className="text-gray-500">{day.title}</p>
                          </div>
                          <div className="md:w-3/4">
                            <p className="text-gray-700">{day.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Tab */}
              {activeTab === 'location' && ( 
                <div>
                  <h2 className="text-2xl font-bold mb-4">Package Location</h2>
                  {currentPackage?.destination ? (
                    <div ref={locationTabRef}> {/* Wrapper div for the ref */}
                      <p className="text-gray-700 mb-4">
                        Explore the location of <strong>{currentPackage.title}</strong> in <strong>{currentPackage.destination}</strong>.
                      </p>
                      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                        <iframe
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(currentPackage.destination)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                          width="100%"
                          height="450"
                          style={{ border:0 }}
                          allowFullScreen={false}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Map of ${currentPackage.destination}`}
                        ></iframe>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Note: This is an embedded map for general location. For precise details or navigation, please use a dedicated map service.
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-700">Location information is not available for this package.</p>
                  )}
                </div>
              )}

              {/* Included Tab */}
              {activeTab === 'included' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">What's Included</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center text-green-600">
                      <Check size={20} className="mr-2" />
                      Included in This Package
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentPackage?.included.map((item, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ x: 3, backgroundColor: "rgba(239, 246, 255, 1)" }} // Tailwind blue-50
                        >
                          <div className="mt-1 mr-2 flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-green-600" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center text-red-600">
                      <X size={20} className="mr-2" />
                      Not Included
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentPackage?.notIncluded.map((item, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ x: 3, backgroundColor: "rgba(254, 242, 242, 1)" }} // Tailwind red-50
                        >
                          <div className="mt-1 mr-2 flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                            <X size={12} className="text-red-600" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Customer Reviews</h2>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="font-medium">{currentPackage?.rating}</span>
                      <span className="text-gray-500 ml-1">({currentPackage?.reviewCount} reviews)</span>
                    </div>
                  </div>
                  
                  {/* Sample Reviews - Replace with actual reviews */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="font-medium text-blue-600">JD</span>
                          </div>
                          <div>
                            <h4 className="font-medium">John Doe</h4>
                            <p className="text-gray-500 text-sm">Traveled in June 2023</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span>5.0</span>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        This was the perfect honeymoon package! Everything was well organized and the villa was absolutely stunning. The sunset dinner cruise was the highlight of our trip.
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-100 pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="font-medium text-blue-600">JS</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Jane Smith</h4>
                            <p className="text-gray-500 text-sm">Traveled in May 2023</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span>4.5</span>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        We had an amazing time in Bali. The accommodations were luxurious and the staff was very attentive. The only small issue was that one of our tours started a bit late, but it was still a wonderful experience overall.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="font-medium text-blue-600">RJ</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Robert Johnson</h4>
                            <p className="text-gray-500 text-sm">Traveled in April 2023</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span>5.0</span>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        This package exceeded our expectations. The private villa was secluded and romantic, and the spa treatment was incredibly relaxing. We'll definitely book with this company again for our next trip.
                      </p>
                    </div>
                  </div>
                  
                  <button className="mt-6 w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    Load More Reviews
                  </button>
                </div>
              )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Right Column - Booking Widget */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">Starting from</p>
                  <div className="flex items-center">
                    <p className="text-sm line-through text-gray-400 mr-2">{currentPackage?.realPrice}</p>
                    <p className="text-3xl font-bold text-blue-600">{currentPackage?.price}</p>
                  </div>
                  <p className="text-xs text-gray-500">per person</p>
                </div>
              </div>

              
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleContactClick}
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition mb-4"
                >
                  Contact Us For Booking
                </motion.button>
            
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">Base price</p>
                  <p className="text-gray-700">{currentPackage?.price}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">Taxes & fees</p>
                  <p className="text-gray-700">$150</p>
                </div>
                <div className="flex justify-between items-center font-bold pt-2 border-t border-gray-100 mt-2">
                  <p>Total</p>
                  <p>{calculateTotalPrice()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;