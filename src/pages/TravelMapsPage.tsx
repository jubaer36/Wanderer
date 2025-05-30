import React, { useState } from 'react';
import { Map, Search, Filter, Navigation, MapPin, Layers, Compass, Route, Star, Clock } from 'lucide-react';

export const TravelMapsPage: React.FC = () => {
  const [activeMap, setActiveMap] = useState<'world' | 'region' | 'city'>('world');
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);

  const mapCategories = [
    { key: 'world', label: 'World Map', icon: Map },
    { key: 'region', label: 'Regional Maps', icon: Compass },
    { key: 'city', label: 'City Maps', icon: MapPin }
  ];

  const destinations = [
    {
      id: 1,
      name: 'Dhaka, Bangladesh',
      coordinates: { lat: 23.8103, lng: 90.4125 },
      category: 'city',
      rating: 4.5,
      visits: 156,
      highlights: ['Lalbagh Fort', 'Ahsan Manzil', 'National Parliament House'],
      travelTime: '2 hours from Chittagong',
      bestTime: 'November-March',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Cox\'s Bazar, Bangladesh',
      coordinates: { lat: 21.4272, lng: 92.0058 },
      category: 'region',
      rating: 4.8,
      visits: 289,
      highlights: ['World\'s Longest Beach', 'Himchari Waterfall', 'Inani Beach'],
      travelTime: '8 hours from Dhaka',
      bestTime: 'November-March',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Sundarbans, Bangladesh',
      coordinates: { lat: 22.4953, lng: 89.5467 },
      category: 'world',
      rating: 4.9,
      visits: 234,
      highlights: ['Royal Bengal Tigers', 'Mangrove Forest', 'Wildlife Safari'],
      travelTime: '4 hours from Dhaka',
      bestTime: 'October-April',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Sylhet, Bangladesh',
      coordinates: { lat: 24.8949, lng: 91.8687 },
      category: 'region',
      rating: 4.7,
      visits: 178,
      highlights: ['Tea Gardens', 'Jaflong', 'Ratargul Swamp Forest'],
      travelTime: '6 hours from Dhaka',
      bestTime: 'October-March',
      image: 'https://images.unsplash.com/photo-1563299796-17596ed8db98?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      name: 'Bandarban, Bangladesh',
      coordinates: { lat: 22.1953, lng: 92.2184 },
      category: 'city',
      rating: 4.6,
      visits: 92,
      highlights: ['Golden Temple', 'Nilgiri Hills', 'Chimbuk Hill'],
      travelTime: '10 hours from Dhaka',
      bestTime: 'October-April',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
    }
  ];

  const filteredDestinations = destinations.filter(dest => 
    activeMap === 'world' || dest.category === activeMap
  );

  const mapLayers = [
    { id: 'satellite', name: 'Satellite View', active: false },
    { id: 'terrain', name: 'Terrain', active: true },
    { id: 'traffic', name: 'Traffic', active: false },
    { id: 'transit', name: 'Public Transit', active: false }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Travel Maps</h1>
        <p className="text-gray-600">Interactive maps to plan and explore your travel destinations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Map Type Selector */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Layers size={18} className="mr-2" />
              Map Type
            </h3>
            <div className="space-y-2">
              {mapCategories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveMap(category.key as any)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeMap === category.key
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <category.icon size={18} />
                  <span className="font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Map Layers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Map size={18} className="mr-2" />
              Map Layers
            </h3>
            <div className="space-y-3">
              {mapLayers.map((layer) => (
                <div key={layer.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{layer.name}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={layer.active} />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter size={18} className="text-gray-500" />
              <span className="text-sm text-gray-700">Advanced Filters</span>
            </button>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Interactive Map Placeholder */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Map size={40} className="text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h3>
                <p className="text-gray-600 mb-4">
                  {activeMap === 'world' ? 'Explore destinations worldwide' :
                   activeMap === 'region' ? 'Discover regional highlights' :
                   'Navigate city attractions'}
                </p>
                <div className="flex justify-center space-x-3">
                  <button className="btn btn-primary btn-sm">
                    <Navigation size={16} className="mr-2" />
                    Enable Location
                  </button>
                  <button className="btn btn-outline btn-sm">
                    <Route size={16} className="mr-2" />
                    Plan Route
                  </button>
                </div>
              </div>
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <button className="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center hover:bg-gray-50">
                  <span className="text-lg font-bold text-gray-600">+</span>
                </button>
                <button className="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center hover:bg-gray-50">
                  <span className="text-lg font-bold text-gray-600">-</span>
                </button>
                <button className="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center hover:bg-gray-50">
                  <Navigation size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Destination List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {activeMap === 'world' ? 'Popular Destinations' :
                 activeMap === 'region' ? 'Regional Highlights' :
                 'City Attractions'} ({filteredDestinations.length})
              </h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {filteredDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedDestination === destination.id ? 'bg-primary-50' : ''
                  }`}
                  onClick={() => setSelectedDestination(destination.id === selectedDestination ? null : destination.id)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{destination.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star size={14} className="text-yellow-400 fill-current" />
                              <span>{destination.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin size={14} />
                              <span>{destination.visits} travelers</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{destination.travelTime}</span>
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-outline btn-sm">
                          View on Map
                        </button>
                      </div>
                      
                      {selectedDestination === destination.id && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Highlights</h5>
                              <ul className="space-y-1">
                                {destination.highlights.map((highlight, index) => (
                                  <li key={index} className="text-sm text-gray-600 flex items-center">
                                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Best Time to Visit</h5>
                              <p className="text-sm text-gray-600">{destination.bestTime}</p>
                              <div className="mt-3 flex space-x-2">
                                <button className="btn btn-primary btn-sm">Plan Trip</button>
                                <button className="btn btn-outline btn-sm">Save</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
