import React, { useState } from 'react';
import { Search, MapPin, Filter, Star } from 'lucide-react';
import { cn } from '../utils/cn';

export const ExplorePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const destinations = [
    {
      id: 1,
      title: "Cox's Bazar, Chittagong",
      image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
      category: "Islands",
      rating: 4.9,
      reviews: 2847,
      description: "World's longest natural sea beach with golden sand and breathtaking sunsets.",
      activities: ["Beach Hopping", "Sunset Watching", "Seafood Dining"]
    },
    {
      id: 2,
      title: "Sylhet Tea Gardens",
      image: "https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg",
      category: "Cultural",
      rating: 4.8,
      reviews: 3156,
      description: "Rolling hills covered with lush green tea plantations and stunning natural beauty.",
      activities: ["Tea Garden Tours", "Valley Views", "Local Culture"]
    },
    {
      id: 3,
      title: "Paharpur Buddhist Monastery",
      image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg",
      category: "Historic",
      rating: 4.9,
      reviews: 2534,
      description: "UNESCO World Heritage Site featuring ancient Buddhist architecture.",
      activities: ["Guided Tours", "Historical Learning", "Photography"]
    },
    {
      id: 4,
      title: "Sundarbans Mangrove Forest",
      image: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg",
      category: "Nature",
      rating: 4.9,
      reviews: 3102,
      description: "World's largest mangrove forest and home to the Royal Bengal Tigers.",
      activities: ["Wildlife Viewing", "Boat Safari", "Bird Watching"]
    },
    {
      id: 5,
      title: "Old Dhaka Heritage",
      image: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg",
      category: "Urban",
      rating: 4.7,
      reviews: 4521,
      description: "Historic old city with rich Mughal architecture and vibrant culture.",
      activities: ["Heritage Tours", "Street Food", "Cultural Sites"]
    },
    {
      id: 6,
      title: "Saint Martin's Island",
      image: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg",
      category: "Islands",
      rating: 4.9,
      reviews: 1893,
      description: "Bangladesh's only coral island with pristine beaches and clear blue waters.",
      activities: ["Snorkeling", "Beach Activities", "Island Hopping"]
    }
  ];

  const filters = [
    { id: 'all', label: 'All Destinations' },
    { id: 'islands', label: 'Islands' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'historic', label: 'Historic' },
    { id: 'nature', label: 'Nature' },
    { id: 'urban', label: 'Urban' }
  ];

  const filteredDestinations = activeFilter === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category.toLowerCase() === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Search Header */}
      <div className="bg-primary-600 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-8">Explore Amazing Destinations</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search destinations, experiences, or activities..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Location"
                className="w-full md:w-48 pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button className="btn btn-secondary">
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container-custom py-8">
        <div className="flex flex-wrap gap-3">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'px-4 py-2 rounded-full transition-colors',
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map(destination => (
            <div key={destination.id} className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow">
              <div className="relative h-64">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                  {destination.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{destination.title}</h3>
                  <div className="flex items-center">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1 font-medium">{destination.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">{destination.reviews} reviews</p>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((activity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};