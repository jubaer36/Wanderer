import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, MapPin, Compass, Users, ShoppingBag, User, Shield, PanelLeftOpen } from 'lucide-react';
import { cn } from '../../utils/cn';
import { EmergencyNotification } from '../emergency/EmergencyNotification';

interface HeaderProps {
  onSidebarToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Explore', href: '/explore', icon: Compass },
    { name: 'Plan Trip', href: '/planner', icon: MapPin },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Emergency', href: '/emergency', icon: Shield },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMobileMenuOpen || location.pathname !== '/'
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left side with sidebar toggle and logo */}
          <div className="flex items-center space-x-3">
            {/* Sidebar Toggle Button */}
            {onSidebarToggle && (
              <button
                onClick={onSidebarToggle}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                aria-label="Toggle sidebar"
              >
                <PanelLeftOpen size={20} className="text-gray-700" />
              </button>
            )}
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Compass size={28} className="text-primary-600" strokeWidth={2.5} />
              <span className="text-xl font-bold text-primary-800">Wanderlust</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center space-x-1 text-sm font-medium transition-colors',
                  location.pathname === item.href
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                )}
              >
                <item.icon size={16} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Search and User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <EmergencyNotification />
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search size={20} className="text-gray-700" />
            </button>
            <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User size={20} className="text-gray-700" />
            </Link>
            <Link to="/planner" className="btn btn-primary btn-sm">
              Start Planning
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <EmergencyNotification />
            <button
              className="p-2 rounded-md text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="container-custom py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search destinations, experiences..."
                className="input pl-10"
              />
            </div>
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center space-x-3 p-3 rounded-lg',
                    location.pathname === item.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <Link
                to="/profile"
                className={cn(
                  'flex items-center space-x-3 p-3 rounded-lg',
                  location.pathname === '/profile'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <User size={20} />
                <span className="font-medium">Profile</span>
              </Link>
            </nav>
            <Link to="/planner" className="btn btn-primary w-full">
              Start Planning
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};