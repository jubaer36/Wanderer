import React, { useState } from 'react';
import { Route, MapPin, Calendar, Users, Star, Clock, Filter, Search } from 'lucide-react';

export const MyToursPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const tours = {
    upcoming: [
      {
        id: 1,
        title: 'Cherry Blossom Festival Tokyo',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop',
        date: 'Apr 15-22, 2025',
        duration: '8 days',
        participants: 12,
        maxParticipants: 15,
        guide: 'Hiroshi Tanaka',
        price: '$2,850',
        status: 'confirmed',
        rating: 4.9,
        location: 'Tokyo, Japan',
        highlights: ['Senso-ji Temple', 'Mount Fuji', 'Traditional Tea Ceremony']
      },
      {
        id: 2,
        title: 'Northern Lights Adventure',
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=300&h=200&fit=crop',
        date: 'Dec 10-17, 2025',
        duration: '7 days',
        participants: 8,
        maxParticipants: 10,
        guide: 'Erik Nordström',
        price: '$3,200',
        status: 'pending',
        rating: 4.8,
        location: 'Reykjavik, Iceland',
        highlights: ['Aurora Viewing', 'Blue Lagoon', 'Golden Circle Tour']
      }
    ],
    completed: [
      {
        id: 3,
        title: 'Machu Picchu Expedition',
        image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=300&h=200&fit=crop',
        date: 'Sep 5-12, 2024',
        duration: '8 days',
        participants: 14,
        maxParticipants: 15,
        guide: 'Carlos Rodriguez',
        price: '$2,950',
        status: 'completed',
        rating: 4.9,
        location: 'Cusco, Peru',
        highlights: ['Inca Trail', 'Sacred Valley', 'Local Cooking Class'],
        review: 'Amazing experience! The guide was knowledgeable and the views were breathtaking.'
      },
      {
        id: 4,
        title: 'Safari Adventure Kenya',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300&h=200&fit=crop',
        date: 'Jun 20-30, 2024',
        duration: '10 days',
        participants: 10,
        maxParticipants: 12,
        guide: 'Samuel Kiprotich',
        price: '$4,200',
        status: 'completed',
        rating: 4.7,
        location: 'Maasai Mara, Kenya',
        highlights: ['Big Five Viewing', 'Maasai Village Visit', 'Hot Air Balloon'],
        review: 'Wildlife viewing was incredible. Saw all the Big Five!'
      }
    ],
    cancelled: [
      {
        id: 5,
        title: 'Mediterranean Cruise',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
        date: 'Aug 15-25, 2024',
        duration: '10 days',
        participants: 0,
        maxParticipants: 20,
        guide: 'Maria Gonzalez',
        price: '$3,500',
        status: 'cancelled',
        rating: 0,
        location: 'Barcelona, Spain',
        highlights: ['Island Hopping', 'Cultural Tours', 'Culinary Experiences'],
        reason: 'Cancelled due to weather conditions'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Tours</h1>
        <p className="text-gray-600">Manage your booked tours and travel experiences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {[
            { key: 'upcoming', label: 'Upcoming', count: tours.upcoming.length },
            { key: 'completed', label: 'Completed', count: tours.completed.length },
            { key: 'cancelled', label: 'Cancelled', count: tours.cancelled.length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tours..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter size={18} className="text-gray-500" />
          <span className="text-sm text-gray-700">Filter</span>
        </button>
      </div>

      {/* Tours List */}
      <div className="space-y-6">
        {tours[activeTab].map((tour) => (
          <div key={tour.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{tour.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{tour.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{tour.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{tour.duration}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tour.status)}`}>
                    {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{tour.participants}/{tour.maxParticipants} participants</span>
                  </div>
                  {tour.rating > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span>{tour.rating} rating</span>
                    </div>
                  )}
                  <div className="font-semibold text-primary-600">{tour.price}</div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tour.highlights.map((highlight, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Guide:</span> {tour.guide}
                  </p>
                </div>

                {tour.review && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 italic">"{tour.review}"</p>
                  </div>
                )}

                {tour.reason && (
                  <div className="mb-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700">
                      <span className="font-medium">Cancellation reason:</span> {tour.reason}
                    </p>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  {activeTab === 'upcoming' && (
                    <>
                      <button className="btn btn-primary btn-sm">View Details</button>
                      <button className="btn btn-outline btn-sm">Contact Guide</button>
                      {tour.status === 'pending' && (
                        <button className="btn btn-danger btn-sm">Cancel</button>
                      )}
                    </>
                  )}
                  {activeTab === 'completed' && (
                    <>
                      <button className="btn btn-primary btn-sm">View Photos</button>
                      <button className="btn btn-outline btn-sm">Write Review</button>
                      <button className="btn btn-outline btn-sm">Book Again</button>
                    </>
                  )}
                  {activeTab === 'cancelled' && (
                    <>
                      <button className="btn btn-primary btn-sm">Rebook</button>
                      <button className="btn btn-outline btn-sm">View Refund</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tours[activeTab].length === 0 && (
        <div className="text-center py-12">
          <Route size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeTab} tours
          </h3>
          <p className="text-gray-600 mb-6">
            {activeTab === 'upcoming' 
              ? "You don't have any upcoming tours. Start planning your next adventure!"
              : activeTab === 'completed'
              ? "You haven't completed any tours yet."
              : "No cancelled tours."}
          </p>
          <button className="btn btn-primary">Browse Tours</button>
        </div>
      )}
    </div>
  );
};
