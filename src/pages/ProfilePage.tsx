import React, { useState } from 'react';
import { MapPin, Calendar, Camera, Edit2, Settings, LogOut, Clock, Star, Bookmark } from 'lucide-react';
import { cn } from '../utils/cn';

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trips');

  const user = {
    name: "Rafiqul Islam",
    avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
    location: "Dhaka, Bangladesh",
    joinDate: "Member since March 2024",
    bio: "Adventure seeker and photography enthusiast. Always planning the next journey!",
    stats: {
      trips: 12,
      reviews: 45,
      followers: 892,
      following: 341
    }
  };

  const trips = [
    {
      id: 1,
      title: "Cox's Bazar Adventure",
      image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
      date: "March 2024",
      duration: "2 weeks",
      status: "completed"
    },
    {
      id: 2,
      title: "Sundarbans Exploration",
      image: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg",
      date: "August 2024",
      duration: "10 days",
      status: "upcoming"
    }
  ];

  const reviews = [
    {
      id: 1,
      place: "Ahsan Manzil Heritage Tour",
      rating: 5,
      date: "March 15, 2024",
      content: "An incredible experience exploring the historic Pink Palace of Dhaka...",
      image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg"
    },
    {
      id: 2,
      place: "Saint Martin's Island Boat Trip",
      rating: 4,
      date: "September 5, 2023",
      content: "Beautiful coral island views and crystal clear waters...",
      image: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg"
    }
  ];

  const badges = [
    {
      id: 1,
      name: "Adventure Seeker",
      icon: "🏔️",
      description: "Completed 5+ adventure activities"
    },
    {
      id: 2,
      name: "Culture Explorer",
      icon: "🏛️",
      description: "Visited 10+ cultural sites"
    },
    {
      id: 3,
      name: "Photo Pro",
      icon: "📸",
      description: "Shared 50+ travel photos"
    }
  ];

  const tabs = [
    { id: 'trips', label: 'My Trips' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'badges', label: 'Badges' },
    { id: 'saved', label: 'Saved' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Profile Header */}
      <div className="bg-primary-600">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg">
                <Camera size={20} className="text-gray-600" />
              </button>
            </div>
            <div className="text-center md:text-left flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                  <p className="text-primary-100 flex items-center justify-center md:justify-start">
                    <MapPin size={16} className="mr-1" />
                    {user.location}
                  </p>
                  <p className="text-primary-100 flex items-center justify-center md:justify-start mt-1">
                    <Calendar size={16} className="mr-1" />
                    {user.joinDate}
                  </p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button className="btn btn-outline bg-white/10 text-white hover:bg-white/20">
                    <Edit2 size={18} className="mr-2" />
                    Edit Profile
                  </button>
                  <button className="btn btn-outline bg-white/10 text-white hover:bg-white/20">
                    <Settings size={18} className="mr-2" />
                    Settings
                  </button>
                  <button className="btn btn-outline bg-white/10 text-white hover:bg-white/20">
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
              <p className="text-primary-100 mt-4 max-w-2xl">{user.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{user.stats.trips}</p>
                  <p className="text-primary-100">Trips</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{user.stats.reviews}</p>
                  <p className="text-primary-100">Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{user.stats.followers}</p>
                  <p className="text-primary-100">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{user.stats.following}</p>
                  <p className="text-primary-100">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container-custom">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-6 py-4 font-medium whitespace-nowrap transition-colors',
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        {activeTab === 'trips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map(trip => (
              <div key={trip.id} className="bg-white rounded-xl shadow-card overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={cn(
                    'absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium',
                    trip.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  )}>
                    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {trip.date}
                    </p>
                    <p className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      {trip.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl shadow-card overflow-hidden">
                <img
                  src={review.image}
                  alt={review.place}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{review.place}</h3>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400" size={16} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{review.content}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {badges.map(badge => (
              <div key={badge.id} className="bg-white rounded-xl shadow-card p-6 text-center">
                <div className="text-4xl mb-4">{badge.icon}</div>
                <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                <p className="text-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-xl p-8 max-w-md mx-auto">
              <Bookmark size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No saved items yet</h3>
              <p className="text-gray-600">
                Start saving your favorite destinations, activities, and travel guides.
              </p>
              <button className="btn btn-primary mt-4">
                Explore Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};