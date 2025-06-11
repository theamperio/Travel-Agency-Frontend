import React, { useState, useEffect } from 'react';
// @ts-ignore
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Main_loader } from '@/components/mainloader/main_loader';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [destinations, setPackages] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  interface Destination {
    id: number;
    title: string;
    description: string;
    images: string[];
    price: string;
    highlights: string[];
    packageId: string;
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    beforeChange: (next: number) => setCurrentSlide(next),
    customPaging: (i: number) => (
      <div className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-white scale-125' : 'bg-white/50'}`} />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Define fallback data
  const fallbackDestinations: Destination[] = [
    {
      id: 1,
      packageId: "bali-paradise",
      title: "Romantic Honeymoon in Bali",
      description: "Enjoy 5 nights and 6 days in beautiful Bali with your loved one.",
      images: [
        "https://res.cloudinary.com/dvye4sv3m/image/upload/v1747399063/The-9-Best-Places-to-Visit-in-Europe-for-a-Dreamy-Vacation_qadvj6.webp"
      ],
      price: "$1,500",
      highlights: [
        "Private villa with pool",
        "Romantic sunset dinner cruise",
        "Couple spa treatment"
      ]
    },
    {
      id: 2,
      packageId: "swiss-alps",
      title: "Swiss Alps Adventure",
      description: "Discover the breathtaking beauty of the Swiss mountains",
      images: [
        "https://res.cloudinary.com/dvye4sv3m/image/upload/v1747398897/Top-11-Places-to-Visit-in-Pokhara_tln0it.webp"
      ],
      price: "$1,899",
      highlights: [
        "Mountain hiking",
        "Ski passes included",
        "Luxury chalet"
      ]
    },
    {
      id: 3,
      packageId: "santorini-getaway",
      title: "Santorini Getaway",
      description: "Relax in the stunning white and blue paradise of Greece",
      images: [
        "https://res.cloudinary.com/dvye4sv3m/image/upload/v1747398897/1.-Alleppey_qro6rm.webp"
      ],
      price: "$1,599",
      highlights: [
        "Sunset cruise",
        "Wine tasting",
        "Infinity pool villa"
      ]
    }
  ];

  // Additional data for new sections
  const featuredPackages = [
    {
      id: 1,
      title: "Maldives Paradise",
      description: "Crystal clear waters and overwater bungalows",
      image: "https://res.cloudinary.com/dvye4sv3m/image/upload/v1747399063/The-9-Best-Places-to-Visit-in-Europe-for-a-Dreamy-Vacation_qadvj6.webp",
      price: "From $2,999",
      duration: "7 Days"
    },
    {
      id: 2,
      title: "Paris Romance",
      description: "City of love with luxury accommodations",
      image: "https://res.cloudinary.com/dvye4sv3m/image/upload/v1747398897/Top-11-Places-to-Visit-in-Pokhara_tln0it.webp",
      price: "From $1,799",
      duration: "5 Days"
    },
    {
      id: 3,
      title: "Bali Adventure",
      description: "Tropical paradise with cultural experiences",
      image: "https://res.cloudinary.com/dvye4sv3m/image/upload/v1747398897/1.-Alleppey_qro6rm.webp",
      price: "From $1,299",
      duration: "6 Days"
    }
  ];

  const categories = [
    {
      title: "Honeymoon Packages",
      icon: "💕",
      description: "Romantic getaways for couples"
    },
    {
      title: "Family Trips",
      icon: "👨‍👩‍👧‍👦",
      description: "Fun adventures for the whole family"
    },
    {
      title: "Adventure Tours",
      icon: "🏔️",
      description: "Thrilling experiences and activities"
    },
    {
      title: "Weekend Getaways",
      icon: "🏖️",
      description: "Quick escapes from daily routine"
    },
    {
      title: "International Trips",
      icon: "✈️",
      description: "Explore destinations worldwide"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah & Mike Johnson",
      rating: 5,
      comment: "Our honeymoon in Bali was absolutely perfect! Every detail was taken care of.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "David Chen",
      rating: 5,
      comment: "Amazing service and unforgettable experiences. Will definitely book again!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      comment: "The family trip to Switzerland was magical. Kids are still talking about it!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const partners = [
    { name: "TripAdvisor", logo: "🏆" },
    { name: "Booking.com", logo: "🏨" },
    { name: "Expedia", logo: "✈️" },
    { name: "Airbnb", logo: "🏠" },
    { name: "Emirates", logo: "🛫" },
    { name: "Hilton", logo: "🏢" }
  ];

  const whyChooseUsStats = [
    { number: "1000+", label: "Happy Travelers", icon: "😊" },
    { number: "50+", label: "Destinations", icon: "🌍" },
    { number: "100%", label: "Customizable Plans", icon: "🛡️" },
    { number: "24/7", label: "Travel Support", icon: "📞" }
  ];

  const fetchPackages = () => {
    try {
      setLoading(true);
      setPackages(fallbackDestinations);
      console.log("Using static destination data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPackages();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleExploreClick = () => {
    navigate("/packages");
  };

  return (
    <div className="relative">
      {loading ? (
        <Main_loader />
      ) : (
        <>
          {/* Hero Slider - Existing code */}
          {destinations.length > 0 ? (
            <>
              <Slider {...settings} className="hero-slider">
                {destinations.map((destination) => (
                  <div key={destination.id} className="relative h-[100vh] md:h-[100vh]">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${destination?.images && destination?.images.length > 0 ? destination?.images[0] : ''})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        height: '100vh',
                        width: '100%',
                      }}
                    >
                      <div className="absolute inset-0 bg-black/30"></div>
                    </div>
                    
                    <div className="relative h-full flex flex-col justify-center items-center text-center px-4 md:px-8 z-10">
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl mx-auto"
                      >
                        <motion.h1 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-4xl md:text-6xl font-bold text-white mb-4"
                        >
                          {destination?.title}
                        </motion.h1>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="text-xl md:text-2xl text-white mb-6"
                        >
                          {destination?.description}
                        </motion.p>
                        
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          className="flex flex-wrap justify-center gap-2 mb-6"
                        >
                          {destination.highlights.map((feature, idx) => (
                            <span key={idx} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </motion.div>
                        
                        <motion.p 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          className="text-3xl md:text-4xl font-bold text-white mb-8"
                        >
                          From {destination?.price}
                        </motion.p>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                          className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                          <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleExploreClick()}
                            className="cursor-pointer px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition-all"
                          >
                            Explore Package
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/contact')}
                            className="cursor-pointer px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                          >
                            Contact Us
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                      <div className="flex items-center space-x-1">
                        {destinations.map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              currentSlide === idx ? 'w-8 bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </>
          ) : (
            <div className="h-screen flex items-center justify-center">
              <p className="text-xl text-gray-600">No destinations available</p>
            </div>
          )}

          {/* Featured Packages Section - NEW */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-20 bg-gray-50"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-gray-800 mb-4"
                >
                  Featured Packages
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-600 max-w-2xl mx-auto"
                >
                  Discover our handpicked destinations and create unforgettable memories
                </motion.p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -10, boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)' }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-64">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
                        {pkg.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                      <p className="text-gray-600 mb-4">{pkg.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-600">{pkg.price}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Why Choose Us Section - Enhanced */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white py-16"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-gray-800 mb-4"
                >
                  Why Choose Us
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-600"
                >
                  Your trusted travel partner for extraordinary experiences
                </motion.p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {whyChooseUsStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  className="flex flex-col items-center p-6 rounded-xl transition-all"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Best Price Guarantee</h3>
                  <p className="text-gray-600">Find a lower price? We'll match it and give you an additional 10% off!</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  className="flex flex-col items-center p-6 rounded-xl transition-all"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                  <p className="text-gray-600">Our travel experts are available around the clock to assist with any questions or concerns.</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  className="flex flex-col items-center p-6 rounded-xl transition-all"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
                  <p className="text-gray-600">Book with confidence using our encrypted payment system with flexible payment options.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Popular Categories Section - NEW */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-gray-800 mb-4"
                >
                  Popular Categories
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-600"
                >
                  Find the perfect trip for every occasion
                </motion.p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Testimonials Section - NEW */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="py-20 bg-white"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-gray-800 mb-4"
                >
                  What Our Travelers Say
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-600"
                >
                  Real experiences from real travelers
                </motion.p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-gray-50 rounded-2xl p-6 relative"
                  >
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <div className="flex text-yellow-400">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Partners Section - NEW */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="py-16 bg-gray-50"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-gray-800 mb-4"
                >
                  Trusted Partners
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600"
                >
                  We work with the best in the industry
                </motion.p>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
                {partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-3xl mb-2">{partner.logo}</div>
                    <div className="text-sm font-medium text-gray-700">{partner.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* About Preview Section - NEW */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
          >
            <div className="container mx-auto px-4 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-6"
              >
                About TravelCo
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl mb-4 max-w-3xl mx-auto"
              >
                We are passionate travel experts dedicated to creating unforgettable journeys for adventurers around the world.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg mb-8 max-w-2xl mx-auto opacity-90"
              >
                Our mission is to make travel accessible, memorable, and transformative for every traveler who trusts us with their dreams.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/about')}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
              >
                Learn More About Us
              </motion.button>
            </div>
          </motion.section>

          {/* Final Call To Action Section - NEW */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="py-20 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full"></div>
              <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
              <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-white rounded-full"></div>
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Ready for Your Next Adventure?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl mb-8 max-w-2xl mx-auto"
              >
                Let's plan your dream trip together. Contact our travel experts today and start your journey!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/contact')}
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all"
                >
                  Start Planning Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/packages')}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Browse Packages
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        </>
      )}
    </div>
  );
};

export default LandingPage;