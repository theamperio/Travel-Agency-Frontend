// import React from 'react'
import { motion } from 'framer-motion';

function Footer() {
  return (
    <>
                  {/* Footer - NEW */}
          <footer className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="col-span-1 md:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">TravelCo</h3>
                    <p className="text-gray-300 mb-6 max-w-md">
                      Creating unforgettable travel experiences since 2010. Your journey begins with us.
                    </p>
                    <div className="flex space-x-4">
                      <motion.a 
                        whileHover={{ scale: 1.2, color: '#3B82F6' }}
                        href="#" className="text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                      <motion.a 
                        whileHover={{ scale: 1.2, color: '#3B82F6' }}
                        href="#" className="text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </motion.a>
                      <motion.a 
                        whileHover={{ scale: 1.2, color: '#3B82F6' }}
                        href="#" className="text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.017 0C18.624 0 20 1.376 20 8.017v3.966C20 18.624 18.624 20 12.017 20H7.983C1.376 20 0 18.624 0 11.983V8.017C0 1.376 1.376 0 7.983 0h4.034zm0 1.8H7.983C2.239 1.8 1.8 2.239 1.8 7.983v4.034c0 5.744.439 6.183 6.183 6.183h4.034c5.744 0 6.183-.439 6.183-6.183V7.983c0-5.744-.439-6.183-6.183-6.183zM10 5.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 1.8a2.7 2.7 0 100 5.4 2.7 2.7 0 000-5.4zm5.25-3.15a1.125 1.125 0 110 2.25 1.125 1.125 0 010-2.25z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
                
                {/* Quick Links */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                      <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                      <li><a href="/packages" className="text-gray-300 hover:text-white transition-colors">Packages</a></li>
                      <li><a href="/destinations" className="text-gray-300 hover:text-white transition-colors">Destinations</a></li>
                      <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                      <li><a href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQs</a></li>
                    </ul>
                  </motion.div>
                </div>
                
                {/* Contact Info */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        info@travelco.com
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        +1 (555) 123-4567
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        123 Travel Street, Adventure City, AC 12345
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>
              
              {/* Bottom Bar */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
              >
                <p className="text-gray-300 text-sm mb-4 md:mb-0">
                  © 2024 TravelCo. All rights reserved.
                </p>
                <div className="flex space-x-6 text-sm">
                  <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                  <a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
                  <a href="/cookies" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a>
                </div>
              </motion.div>
            </div>
          </footer>
    </>
  )
}

export default Footer