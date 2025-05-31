import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Compass, 
  Calendar,
  Star,
  ArrowRight,
  Search,
  Shield,
  MessageCircle
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const featuredDestinations = [
    {
      title: "Cox's Bazar Beach",
      image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
      rating: 4.9,
      reviews: 2847,
      category: "Beach Paradise"
    },
    {
      title: "Sundarbans Mangrove Forest",
      image: "https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg",
      rating: 4.8,
      reviews: 3156,
      category: "Natural Wonder"
    },
    {
      title: "Somapura Mahavihara",
      image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg",
      rating: 4.9,
      reviews: 2534,
      category: "Historic Wonder"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Connect with Travel Buddies",
      description: "Find like-minded travelers and create unforgettable memories together."
    },
    {
      icon: Compass,
      title: "Personalized Recommendations",
      description: "Get AI-powered suggestions based on your travel style and preferences."
    },
    {
      icon: Calendar,
      title: "Smart Trip Planning",
      description: "Plan your perfect trip with our intelligent itinerary builder."
    },
    {
      icon: Shield,
      title: "Emergency Safety Features",
      description: "Stay safe with disaster alerts, emergency contacts, and instant assistance."
    },
    {
      icon: MessageCircle,
      title: "AI Travel Assistant",
      description: "Get instant help with trip planning, local info, and emergency support 24/7."
    }
  ];

  const testimonials = [
    {
      name: "Fatima Rahman",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
      role: "Travel Blogger",
      content: "Wanderer has transformed how I plan and share my travel experiences. The community is incredibly supportive!"
    },
    {
      name: "Aminul Islam",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      role: "Adventure Seeker",
      content: "Finding travel companions was always challenging until I discovered Wanderer. Now I never travel alone!"
    },
    {
      name: "Rashida Begum",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      role: "Digital Nomad",
      content: "The AI recommendations are spot-on! It's like having a personal travel agent who really knows me."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg"
            alt="Cox's Bazar Beach - World's Longest Natural Sea Beach"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        
        <div className="relative container-custom h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Begin your journey to the unknown
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl animate-fade-in">
            Connect with fellow travelers, explore stunning destinations, and plan your perfect adventure across the land of natural beauty.
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-2 animate-slide-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Explore Cox's Bazar, Sundarbans, Sylhet..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button className="btn btn-primary">
                Start Planning
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the most loved places by our community of travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2"
              >
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-6 w-full">
                  <span className="text-sm text-primary-200 mb-2 block">
                    {destination.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {destination.title}
                  </h3>
                  <div className="flex items-center text-white">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1 mr-2">{destination.rating}</span>
                    <span className="text-sm">({destination.reviews} reviews)</span>
                  </div>
                </div>
                <Link
                  to={`/explore/${destination.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="absolute inset-0"
                >
                  <span className="sr-only">View {destination.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Wanderer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to make your travel dreams come true
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-primary-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who have found their perfect adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-card"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our community of travelers and start planning your next unforgettable journey.
          </p>
          <Link
            to="/planner"
            className="inline-flex items-center btn bg-white text-primary-600 hover:bg-primary-50"
          >
            Plan Your Trip
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};