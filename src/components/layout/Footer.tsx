import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Mail, 
  MapPin, 
  Phone, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  ArrowRight, 
  Heart 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'Destinations', href: '/explore/destinations' },
        { name: 'Experiences', href: '/explore/experiences' },
        { name: 'Travel Guides', href: '/explore/guides' },
        { name: 'Seasonal Trips', href: '/explore/seasonal' },
        { name: 'Travel Styles', href: '/explore/styles' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'Find Travel Buddies', href: '/community/buddies' },
        { name: 'Travel Stories', href: '/community/stories' },
        { name: 'Forums', href: '/community/forums' },
        { name: 'Events', href: '/community/events' },
        { name: 'Become a Creator', href: '/community/creators' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Trip Planner', href: '/planner' },
        { name: 'Travel Gear', href: '/marketplace/gear' },
        { name: 'Local Experiences', href: '/marketplace/experiences' },
        { name: 'Accommodations', href: '/marketplace/stays' },
        { name: 'Transportation', href: '/marketplace/transport' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Sustainability', href: '/sustainability' },
        { name: 'Partner with Us', href: '/partners' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-primary-600">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Join Our Travel Community</h3>
              <p className="text-primary-100 max-w-md">
                Get inspired with personalized travel recommendations and exclusive offers.
              </p>
            </div>
            <div className="w-full max-w-md">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="input flex-grow rounded-r-none"
                />
                <button
                  type="submit"
                  className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-r-lg transition-colors flex items-center"
                >
                  Subscribe
                  <ArrowRight size={18} className="ml-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Compass size={28} className="text-primary-600" strokeWidth={2.5} />
              <span className="text-xl font-bold text-primary-800">Wanderer</span>
            </Link>
            <p className="text-gray-600 mb-6">
              Connecting travelers across Bangladesh through shared experiences and personalized adventures.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-primary-600" />
                <span className="text-gray-700">123 Gulshan Avenue, Dhaka 1212</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-primary-600" />
                <a href="mailto:hello@wanderer.com.bd" className="text-gray-700 hover:text-primary-600 transition-colors">
                  hello@wanderer.com.bd
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-primary-600" />
                <a href="tel:+8801700000000" className="text-gray-700 hover:text-primary-600 transition-colors">
                  +88 017-0000-0000
                </a>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-bold text-lg text-gray-900 mb-6">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social & Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-6 md:mb-0">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-sm">
              <div className="flex space-x-6">
                <Link to="/terms" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/cookies" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Cookie Policy
                </Link>
              </div>
              <div className="flex items-center text-gray-500">
                <p>© {currentYear} Wanderer. Made with</p>
                <Heart size={14} className="mx-1 text-coral-500" />
                <p>for travelers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};