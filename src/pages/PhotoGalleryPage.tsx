import React, { useState } from 'react';
import { Camera, Upload, Search, Filter, Grid, List, Download, Share2, Heart, MapPin, Calendar, Tag } from 'lucide-react';

export const PhotoGalleryPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'trips' | 'places' | 'people' | 'food'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);

  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      title: 'Sunset at Cox\'s Bazar Beach',
      location: 'Cox\'s Bazar, Bangladesh',
      date: '2024-04-15',
      category: 'places',
      trip: 'Cox\'s Bazar Beach Holiday',
      likes: 23,
      tags: ['beach', 'sunset', 'bangladesh', 'nature'],
      camera: 'Canon EOS R5',
      settings: 'f/2.8, 1/250s, ISO 200'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1563299796-17596ed8db98?w=400&h=300&fit=crop',
      title: 'Sylhet Tea Garden Morning',
      location: 'Sylhet, Bangladesh',
      date: '2024-06-20',
      category: 'places',
      trip: 'Sylhet Tea Garden Tour',
      likes: 45,
      tags: ['tea', 'bangladesh', 'nature', 'green'],
      camera: 'iPhone 15 Pro',
      settings: 'f/1.8, 1/60s, ISO 100'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      title: 'Traditional Bengali Fish Curry',
      location: 'Dhaka, Bangladesh',
      date: '2024-04-18',
      category: 'food',
      trip: 'Dhaka Cultural Experience',
      likes: 31,
      tags: ['food', 'curry', 'bangladesh', 'culture'],
      camera: 'Canon EOS R5',
      settings: 'f/2.0, 1/125s, ISO 400'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
      title: 'Sundarbans Mangrove Reflection',
      location: 'Sundarbans, Bangladesh',
      date: '2024-07-10',
      category: 'places',
      trip: 'Sundarbans Wildlife Safari',
      likes: 67,
      tags: ['nature', 'mangrove', 'wildlife', 'reflection'],
      camera: 'Sony A7R IV',
      settings: 'f/8, 1/500s, ISO 100'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      title: 'Group at Chittagong Hill Tracts',
      location: 'Bandarban, Bangladesh',
      date: '2024-05-25',
      category: 'people',
      trip: 'Chittagong Hill Tracts Adventure',
      likes: 89,
      tags: ['people', 'adventure', 'bangladesh', 'hills'],
      camera: 'Canon EOS R6',
      settings: 'f/5.6, 1/250s, ISO 200'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1580418827493-c09f4d79d3c4?w=400&h=300&fit=crop',
      title: 'Sixty Dome Mosque Architecture',
      location: 'Bagerhat, Bangladesh',
      date: '2024-03-12',
      category: 'places',
      trip: 'Bangladesh Heritage Tour',
      likes: 112,
      tags: ['architecture', 'mosque', 'bangladesh', 'heritage'],
      camera: 'Sony A7S III',
      settings: 'f/2.8, 1/125s, ISO 400'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Photos', count: photos.length },
    { key: 'trips', label: 'Trips', count: photos.filter(p => p.trip).length },
    { key: 'places', label: 'Places', count: photos.filter(p => p.category === 'places').length },
    { key: 'people', label: 'People', count: photos.filter(p => p.category === 'people').length },
    { key: 'food', label: 'Food', count: photos.filter(p => p.category === 'food').length }
  ];

  const filteredPhotos = photos.filter(photo => {
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const togglePhotoSelection = (photoId: number) => {
    setSelectedPhotos(prev => 
      prev.includes(photoId) 
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Photo Gallery</h1>
        <p className="text-gray-600">Your travel memories captured in beautiful moments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Camera size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{photos.length}</p>
              <p className="text-sm text-gray-600">Total Photos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Destinations</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Heart size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{photos.reduce((sum, photo) => sum + photo.likes, 0)}</p>
              <p className="text-sm text-gray-600">Total Likes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Tag size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-600">Tags Used</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
              />
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter size={18} className="text-gray-500" />
              <span className="text-sm text-gray-700">Filters</span>
            </button>

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

            <button className="btn btn-primary">
              <Upload size={18} className="mr-2" />
              Upload Photos
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedPhotos.length > 0 && (
          <div className="mt-4 p-3 bg-primary-50 rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium text-primary-700">
              {selectedPhotos.length} photo{selectedPhotos.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="btn btn-outline btn-sm">
                <Download size={16} className="mr-2" />
                Download
              </button>
              <button className="btn btn-outline btn-sm">
                <Share2 size={16} className="mr-2" />
                Share
              </button>
              <button 
                onClick={() => setSelectedPhotos([])}
                className="btn btn-outline btn-sm"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredPhotos.length} of {photos.length} photos
        </p>
      </div>

      {/* Photo Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="relative">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button 
                      onClick={() => togglePhotoSelection(photo.id)}
                      className={`p-2 rounded-full transition-colors ${
                        selectedPhotos.includes(photo.id)
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Heart size={16} className={selectedPhotos.includes(photo.id) ? 'fill-current' : ''} />
                    </button>
                    <button className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100">
                      <Share2 size={16} />
                    </button>
                    <button className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100">
                      <Download size={16} />
                    </button>
                  </div>
                </div>

                {/* Likes Badge */}
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                  <Heart size={12} className="text-red-400 fill-current" />
                  <span>{photo.likes}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">{photo.title}</h3>
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                  <MapPin size={12} />
                  <span className="truncate">{photo.location}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500 mb-3">
                  <Calendar size={12} />
                  <span>{new Date(photo.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {photo.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-gray-500">
                  <p className="font-medium">{photo.camera}</p>
                  <p>{photo.settings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{photo.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{photo.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{new Date(photo.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart size={14} className="text-red-400 fill-current" />
                          <span>{photo.likes}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {photo.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="text-xs text-gray-500">
                        <p><span className="font-medium">Camera:</span> {photo.camera}</p>
                        <p><span className="font-medium">Settings:</span> {photo.settings}</p>
                        <p><span className="font-medium">Trip:</span> {photo.trip}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button 
                        onClick={() => togglePhotoSelection(photo.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          selectedPhotos.includes(photo.id)
                            ? 'bg-primary-100 text-primary-600'
                            : 'hover:bg-gray-100 text-gray-500'
                        }`}
                      >
                        <Heart size={16} className={selectedPhotos.includes(photo.id) ? 'fill-current' : ''} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg">
                        <Share2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <Camera size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No photos found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery ? 'Try adjusting your search terms' : 'Start uploading your travel memories'}
          </p>
          <button className="btn btn-primary">
            <Upload size={18} className="mr-2" />
            Upload Your First Photo
          </button>
        </div>
      )}
    </div>
  );
};
