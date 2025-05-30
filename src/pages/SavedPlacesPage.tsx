import React, { useState } from 'react';
import { Heart, MapPin, Calendar, Star, Filter, Search, Grid, List } from 'lucide-react';

export const SavedPlacesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'visited' | 'wishlist'>('all');

  const savedPlaces = [
    {
      id: 1,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&h=200&fit=crop',
      category: 'Island Paradise',
      rating: 4.8,
      saved: '2 weeks ago',
      visited: false,
      notes: 'Perfect for sunset photos and romantic getaway',
      tags: ['Beach', 'Romance', 'Photography']
    },
    {
      id: 2,
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop',
      category: 'Cultural Heritage',
      rating: 4.9,
      saved: '1 month ago',
      visited: true,
      notes: 'Amazing temples and traditional architecture',
      tags: ['Culture', 'History', 'Temples']
    },
    {
      id: 3,
      name: 'Banff National Park, Canada',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
      category: 'Natural Wonder',
      rating: 4.7,
      saved: '3 days ago',
      visited: false,
      notes: 'Incredible hiking trails and mountain views',
      tags: ['Nature', 'Hiking', 'Mountains']
    },
    {
      id: 4,
      name: 'Machu Picchu, Peru',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=300&h=200&fit=crop',
      category: 'Historical Site',
      rating: 4.9,
      saved: '2 months ago',
      visited: true,
      notes: 'Bucket list destination - absolutely breathtaking',
      tags: ['History', 'Adventure', 'UNESCO']
    },
    {
      id: 5,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=200&fit=crop',
      category: 'Tropical Paradise',
      rating: 4.6,
      saved: '1 week ago',
      visited: false,
      notes: 'Rice terraces and beautiful beaches',
      tags: ['Beach', 'Culture', 'Relaxation']
    },
    {
      id: 6,
      name: 'Northern Lights, Iceland',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=300&h=200&fit=crop',
      category: 'Natural Phenomenon',
      rating: 4.8,
      saved: '5 days ago',
      visited: false,
      notes: 'Best viewing time: September to March',
      tags: ['Aurora', 'Winter', 'Photography']
    }
  ];

  const filteredPlaces = savedPlaces.filter(place => {
    if (filter === 'visited') return place.visited;
    if (filter === 'wishlist') return !place.visited;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Saved Places</h1>
        <p className="text-gray-600">Your collection of dream destinations and memorable places</p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['all', 'wishlist', 'visited'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === filterOption
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filterOption === 'all' ? 'All Places' : 
                 filterOption === 'wishlist' ? 'Wishlist' : 'Visited'}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {filteredPlaces.length} places
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search places..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <Grid size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Places Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <div key={place.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <Heart size={18} className="text-red-500 fill-current" />
                </button>
                {place.visited && (
                  <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Visited
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{place.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{place.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{place.category}</p>
                
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{place.notes}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {place.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Saved {place.saved}</span>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPlaces.map((place) => (
            <div key={place.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{place.name}</h3>
                      <p className="text-sm text-gray-600">{place.category}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{place.rating}</span>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Heart size={18} className="text-red-500 fill-current" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{place.notes}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex flex-wrap gap-1">
                      {place.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">Saved {place.saved}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
