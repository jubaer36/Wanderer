import React from 'react';
import { Users, Search, Filter, UserPlus, MessageCircle, MapPin } from 'lucide-react';

export const TravelBuddiesPage: React.FC = () => {
  const travelBuddies = [
    {
      id: 1,
      name: 'Fatima Rahman',
      avatar: '👩‍🦱',
      location: 'Dhaka, Bangladesh',
      age: 28,
      travelStyle: 'Adventure Seeker',
      commonInterests: ['Hiking', 'Photography', 'Local Cuisine'],
      trips: 12,
      rating: 4.9,
      status: 'online',
      lastSeen: 'Active now'
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      avatar: '👨‍🦳',
      location: 'Chittagong, Bangladesh',
      age: 32,
      travelStyle: 'Culture Explorer',
      commonInterests: ['Museums', 'History', 'Architecture'],
      trips: 18,
      rating: 4.8,
      status: 'offline',
      lastSeen: '2 hours ago'
    },
    {
      id: 3,
      name: 'Rashida Begum',
      avatar: '👩‍💼',
      location: 'Sylhet, Bangladesh',
      age: 26,
      travelStyle: 'Budget Traveler',
      commonInterests: ['Backpacking', 'Street Food', 'Markets'],
      trips: 8,
      rating: 4.7,
      status: 'online',
      lastSeen: 'Active now'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Travel Buddies</h1>
        <p className="text-gray-600">Connect with fellow travelers and find your perfect travel companion</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search travel buddies..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm text-gray-700">Filter</span>
          </button>
          <button className="btn btn-primary">
            <UserPlus size={18} className="mr-2" />
            Find Buddies
          </button>
        </div>
      </div>

      {/* Travel Buddies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {travelBuddies.map((buddy) => (
          <div key={buddy.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-xl">
                  {buddy.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{buddy.name}</h3>
                  <p className="text-sm text-gray-600">{buddy.age} years old</p>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${buddy.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>{buddy.location}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{buddy.travelStyle}</p>
                <p className="text-xs text-gray-500 mt-1">{buddy.trips} trips • {buddy.rating} ⭐ rating</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Common Interests:</h4>
              <div className="flex flex-wrap gap-1">
                {buddy.commonInterests.map((interest, index) => (
                  <span key={index} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{buddy.lastSeen}</span>
              <div className="flex space-x-2">
                <button className="p-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-lg transition-colors">
                  <MessageCircle size={16} />
                </button>
                <button className="btn btn-primary btn-sm">Connect</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      <div className="text-center py-12 mt-12 bg-gray-50 rounded-xl">
        <Users size={48} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Find Your Travel Tribe</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Connect with like-minded travelers, share experiences, and plan amazing adventures together.
        </p>
        <button className="btn btn-primary">
          <UserPlus size={18} className="mr-2" />
          Browse All Travelers
        </button>
      </div>
    </div>
  );
};
