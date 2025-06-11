import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Tag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Package = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    destination: string;
    realPrice: string;
    price: string;
    features?: string[];
    duration?: string;
    rating?: number;
};

const travelPackages: Package[] = [
    {
        id: 1,
        title: 'Romantic Honeymoon in Bali',
        description: 'Enjoy 5 nights and 6 days in beautiful Bali with your loved one.',
        imageUrl: 'https://res.cloudinary.com/dvye4sv3m/image/upload/v1747398897/Best-tourist-places-to-visit-in-Goa-and-things-to-do-03_gm95vp.jpg',
        category: 'Honeymoon',
        destination: 'Bali',
        realPrice: '$2000',
        price: '$1500',
        features: ['Private villa', 'Couple spa', 'Sunset dinner'],
        duration: '6 days, 5 nights',
        rating: 4.8
    },
    {
        id: 2,
        title: 'Family Trip to Switzerland',
        description: 'Explore the Alps, chocolate factories and more with your family.',
        imageUrl: 'https://source.unsplash.com/400x300/?family,switzerland',
        category: 'Family',
        destination: 'Switzerland',
        realPrice: '$2500',
        price: '$2000'
    },
    {
        id: 3,
        title: 'Adventure Trek in Himachal',
        description: 'Join us for an adrenaline-filled adventure trek.',
        imageUrl: 'URL_ADDRESS.unsplash.com/400x300/?adventure,himachal',
        category: 'Adventure',
        destination: 'Himachal',
        realPrice: '$1500',
        price: '$1300'
    },
    {
        id: 4,
        title: 'Luxury Holiday in Dubai',
        description: 'Enjoy world-class luxury and shopping in Dubai.',
        imageUrl: 'https://source.unsplash.com/400x300/?dubai,luxury',
        category: 'Luxury',
        destination: 'Dubai',
        realPrice: '$3000',
        price: '$2000'
    },
    {
        id: 5,
        title: 'Beach Getaway in Maldives',
        description: 'Relax on pristine beaches with crystal clear waters.',
        imageUrl: 'https://source.unsplash.com/400x300/?maldives,beach',
        category: 'Beach',
        destination: 'Maldives',
        realPrice: '$2800',
        price: '$2200'
    },
    {
        id: 6,
        title: 'Cultural Tour of Japan',
        description: 'Explore ancient temples and modern cities in Japan.',
        imageUrl: 'https://source.unsplash.com/400x300/?japan,temple',
        category: 'Cultural',
        destination: 'Japan',
        realPrice: '$2600',
        price: '$2100'
    },
    {
        id: 7,
        title: 'Safari Adventure in Kenya',
        description: 'Witness the majestic wildlife in their natural habitat.',
        imageUrl: 'https://source.unsplash.com/400x300/?safari,kenya',
        category: 'Adventure',
        destination: 'Kenya',
        realPrice: '$3200',
        price: '$2700'
    },
    {
        id: 8,
        title: 'Romantic Paris Getaway',
        description: 'Experience the city of love with your special someone.',
        imageUrl: 'https://source.unsplash.com/400x300/?paris,romance',
        category: 'Honeymoon',
        destination: 'Paris',
        realPrice: '$2400',
        price: '$1900'
    }
];

const Services: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedDestination, setSelectedDestination] = useState<string>('All');
    const [filteredPackages, setFilteredPackages] = useState<Package[]>(travelPackages);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activePackage, setActivePackage] = useState<Package | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>('default');

    // Extract unique categories and destinations
    const categories = ['All', ...Array.from(new Set(travelPackages.map(pkg => pkg.category)))];
    const destinations = ['All', ...Array.from(new Set(travelPackages.map(pkg => pkg.destination)))];

    // Filter and sort packages
    useEffect(() => {
        let filtered = travelPackages;
        
        // Category filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(pkg => pkg.category === selectedCategory);
        }
        
        // Destination filter
        if (selectedDestination !== 'All') {
            filtered = filtered.filter(pkg => pkg.destination === selectedDestination);
        }
        
        // Search query filter
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(pkg => 
                pkg.title.toLowerCase().includes(query) || 
                pkg.description.toLowerCase().includes(query) ||
                pkg.destination.toLowerCase().includes(query) ||
                pkg.category.toLowerCase().includes(query)
            );
        }
        
        // Sorting
        if (sortBy === 'price-low') {
            filtered = [...filtered].sort((a, b) => 
                parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
            );
        } else if (sortBy === 'price-high') {
            filtered = [...filtered].sort((a, b) => 
                parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
            );
        } else if (sortBy === 'rating') {
            filtered = [...filtered].sort((a, b) => 
                (b.rating || 0) - (a.rating || 0)
            );
        }
        
        setFilteredPackages(filtered);
    }, [selectedCategory, selectedDestination, searchQuery, sortBy]);

    const handleViewDetails = (pkg: Package) => {
        setActivePackage(pkg);
        setIsModalOpen(true);
        // Add body scroll lock
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Remove body scroll lock
        document.body.style.overflow = 'auto';
    };

    const clearFilters = () => {
        setSelectedCategory('All');
        setSelectedDestination('All');
        setSearchQuery('');
        setSortBy('default');
    };

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        };
        
        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [isModalOpen]);

    const handleClick = () =>{
        navigate('/package-info/:id')
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
            <div className="max-w-7xl mx-auto">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-center text-gray-800 mb-8"
                >
                    Discover Your Perfect Getaway
                </motion.h2>
                
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search destinations, experiences..."
                            className="w-full px-4 py-3 pl-10 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>
                
                {/* Filter and Sort Controls */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <select 
                                    value={selectedCategory} 
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-3 py-2 rounded-md border-none focus:outline-none text-sm"
                                >
                                    <option value="All">All Categories</option>
                                    {categories.filter(c => c !== 'All').map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <select 
                                    value={selectedDestination} 
                                    onChange={(e) => setSelectedDestination(e.target.value)}
                                    className="px-3 py-2 rounded-md border-none focus:outline-none text-sm"
                                >
                                    <option value="All">All Destinations</option>
                                    {destinations.filter(d => d !== 'All').map(destination => (
                                        <option key={destination} value={destination}>{destination}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {(selectedCategory !== 'All' || selectedDestination !== 'All' || searchQuery) && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm transition-colors"
                                >
                                    <X size={14} /> Clear Filters
                                </button>
                            )}
                        </div>
                        
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 rounded-md border-none focus:outline-none text-sm"
                            >
                                <option value="default">Sort By</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Results Count */}
                    <p className="text-center text-gray-600">
                        Showing {filteredPackages.length} packages
                        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                        {selectedDestination !== 'All' && ` for ${selectedDestination}`}
                        {searchQuery && ` matching "${searchQuery}"`}
                    </p>
                </div>
                
                {/* Packages Grid */}
                <motion.div 
                    layout
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    <AnimatePresence>
                        {filteredPackages.length > 0 ? (
                            filteredPackages.map((pkg) => (
                                <motion.div
                                    key={pkg.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                                    className="flex flex-col justify-between bg-white rounded-2xl shadow-md overflow-hidden h-full"
                                >
                                    <div className="relative overflow-hidden group">
                                        <img
                                            src={pkg.imageUrl}
                                            alt={pkg.title}
                                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="absolute top-2 right-2 bg-gray-300 text-black text-xs px-2 py-1 rounded-full">
                                            {pkg.category}
                                        </span>
                                        {pkg.rating && (
                                            <div className="absolute bottom-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                                ★ {pkg.rating}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 flex-grow">
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                                            <MapPin size={14} />
                                            <span>{pkg.destination}</span>
                                            {pkg.duration && (
                                                <>
                                                    <span className="mx-1">•</span>
                                                    <span>{pkg.duration}</span>
                                                </>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{pkg.title}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                                        
                                        {pkg.features && (
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {pkg.features.slice(0, 3).map((feature, idx) => (
                                                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="p-3 border-t border-gray-100">
                                        <div className="flex justify-between items-center">
                                            <div className="flex-col">
                                                <p className="text-[10px] text-gray-500">Starting Price</p>
                                                <p className="text-xs line-through text-gray-400">{pkg.realPrice}</p>
                                                <p className="font-bold text-blue-600">{pkg.price}</p>
                                                <p className="text-[10px] text-gray-500">per person</p>
                                            </div>
                                            <button 
                                                onClick={() => handleViewDetails(pkg)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105 active:scale-95"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-12"
                            >
                                <div className="bg-white p-8 rounded-lg shadow-sm max-w-md mx-auto">
                                    <div className="text-gray-400 mb-4">
                                        <Search size={48} className="mx-auto" />
                                    </div>
                                    <p className="text-gray-700 text-lg mb-4">No packages found matching your criteria.</p>
                                    <button 
                                        onClick={clearFilters}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            
            {/* Package Details Modal */}
            <AnimatePresence>
                {isModalOpen && activePackage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 "
                    onClick={closeModal}
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <img 
                                    src={activePackage.imageUrl} 
                                    alt={activePackage.title}
                                    className="w-full h-64 object-cover"
                                />
                                <button 
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                    <div className="flex items-center gap-2 text-white mb-2">
                                        <Tag size={16} />
                                        <span className="text-sm font-medium">{activePackage.category}</span>
                                        <span className="mx-1">•</span>
                                        <MapPin size={16} />
                                        <span className="text-sm font-medium">{activePackage.destination}</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">{activePackage.title}</h2>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex flex-wrap justify-between items-center mb-6 pb-6 border-b border-gray-200">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Duration</p>
                                        <p className="font-medium">{activePackage.duration || '6 days, 5 nights'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Rating</p>
                                        <p className="font-medium flex items-center">
                                            <span className="text-yellow-500 mr-1">★</span>
                                            {activePackage.rating || 4.5}/5
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Price</p>
                                        <div>
                                            <span className="text-sm line-through text-gray-400 mr-2">{activePackage.realPrice}</span>
                                            <span className="font-bold text-blue-600 text-xl">{activePackage.price}</span>
                                            <span className="text-xs text-gray-500 ml-1">per person</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3">Description</h3>
                                    <p className="text-gray-700">{activePackage.description}</p>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3">Package Highlights</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {(activePackage.features || [
                                            'All accommodations included',
                                            'Daily breakfast and dinner',
                                            'Airport transfers',
                                            'Guided tours',
                                            'Welcome drink on arrival',
                                            'Free WiFi at all accommodations'
                                        ]).map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">✓</div>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                    <button 
                                        onClick={closeModal}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        Close
                                    </button>
                                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={handleClick}>
                                        More Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Services;
