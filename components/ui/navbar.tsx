'use client';

import { Menu, X } from "lucide-react";
import { Button } from "./button";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['features', 'tracks', 'orientation'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 100; // Account for navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg transform translate-y-0' 
          : 'bg-transparent transform -translate-y-1'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              SkillUp
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['features', 'tracks', 'orientation'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative text-gray-700 hover:text-purple-600 transition-colors duration-300 group ${
                  activeSection === section ? 'text-purple-600' : ''
                }`}
              >
                <span className="capitalize">
                  {section}
                </span>
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 transform origin-left transition-transform duration-300 ${
                  activeSection === section ? 'scale-x-100' : 'scale-x-0'
                } group-hover:scale-x-100`}></span>
              </button>
            ))}
            <Button 
              onClick={() => document.querySelector('dialog')?.showModal()}
              className="bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Register Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:bg-purple-100 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 transform rotate-180 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen 
              ? 'max-h-64 opacity-100 transform translate-y-0' 
              : 'max-h-0 opacity-0 transform -translate-y-4'
          } overflow-hidden`}
        >
          <div className="pb-3 space-y-3">
            {['features', 'tracks', 'orientation'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === section 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-700 hover:bg-purple-50'
                }`}
              >
                <span className="capitalize">{section}</span>
              </button>
            ))}
            <Button 
              onClick={() => {
                document.querySelector('dialog')?.showModal();
                setIsMenuOpen(false);
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-300"
            >
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}