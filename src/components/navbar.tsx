'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isHomePage 
        ? isScrolled 
          ? 'bg-black/70 backdrop-blur-md' 
          : 'bg-transparent'
        : 'bg-gray-600/40 backdrop-blur-md' // Always solid background on non-home pages
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold">
              Logo
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className={`text-white hover:text-gray-300 px-3 py-2 rounded-md ${location.pathname === '/' ? 'bg-black/30' : ''}`}>
                Home
              </Link>
              <Link to="/about" className={`text-white hover:text-gray-300 px-3 py-2 rounded-md ${location.pathname === '/about' ? 'bg-black/30' : ''}`}>
                About
              </Link>
              <Link to="/packages" className={`text-white hover:text-gray-300 px-3 py-2 rounded-md ${location.pathname === '/packages' ? 'bg-black/30' : ''}`}>
                Services
              </Link>
              <Link to="/contact" className={`text-white hover:text-gray-300 px-3 py-2 rounded-md ${location.pathname === '/contact' ? 'bg-black/30' : ''}`}>
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button with shadcn/ui Sheet */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black hover:bg-white/10 rounded-full">
                  <Menu className={`h-8 w-8 transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                  <X className={`h-8 w-8 absolute transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] border-l border-black/20 bg-white/30 backdrop-blur-lg p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4">
                    <Link 
                      to="/" 
                      className="text-xl font-bold text-black"
                      onClick={() => setIsOpen(false)}
                    >
                      Logo
                    </Link>
                  </div>
                  <nav className="flex flex-col px-3">
                    <Link 
                      to="/" 
                      className={`text-black hover:text-gray-300 py-2 px-3 rounded-md ${location.pathname === '/' ? 'bg-white/20' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/about" 
                      className={`text-black hover:text-gray-300 py-2 px-3 rounded-md ${location.pathname === '/about' ? 'bg-white/10' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                    <Link 
                      to="/services" 
                      className={`text-black hover:text-gray-300 py-2 px-3 rounded-md ${location.pathname === '/services' ? 'bg-white/10' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      Services
                    </Link>
                  </nav>
                  <div className="mt-auto p-2">
                    <Button 
                      className="w-full bg-black text-white hover:bg-white/90 rounded-md"
                      onClick={() => {
                        setIsOpen(false);
                        // Navigate to contact page
                        window.location.href = '/contact';
                      }}
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;