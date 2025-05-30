import React, { useState } from 'react';
import { Bookmark, Search, Filter, ExternalLink, Calendar, User, Star, Tag } from 'lucide-react';

export const BookmarksPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'articles' | 'guides' | 'videos' | 'places'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const bookmarks = [
    {
      id: 1,
      title: 'Complete Guide to Exploring Bangladesh',
      description: 'Comprehensive guide covering budget travel, essential routes, and cultural insights for exploring Bangladesh\'s diverse landscapes and rich heritage.',
      url: 'https://wanderlust.com/guides/exploring-bangladesh',
      type: 'guide',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&h=200&fit=crop',
      author: 'Travel Expert',
      savedDate: '2024-12-15',
      readTime: '15 min read',
      tags: ['Bangladesh', 'Cultural Heritage', 'Budget Travel'],
      rating: 4.8
    },
    {
      id: 2,
      title: 'Hidden Gems in Bangladesh: Beyond Dhaka and Cox\'s Bazar',
      description: 'Discover lesser-known destinations in Bangladesh that offer authentic cultural experiences away from the typical tourist routes.',
      url: 'https://wanderlust.com/articles/hidden-gems-bangladesh',
      type: 'article',
      image: 'https://images.unsplash.com/photo-1563299796-17596ed8db98?w=300&h=200&fit=crop',
      author: 'Rashidul Islam',
      savedDate: '2024-12-10',
      readTime: '8 min read',
      tags: ['Bangladesh', 'Hidden Gems', 'Culture'],
      rating: 4.9
    },
    {
      id: 3,
      title: 'Wildlife Photography in Sundarbans',
      description: 'Master the art of wildlife photography in the mangrove forests with camera settings, timing, and safety advice from professional photographers.',
      url: 'https://wanderlust.com/guides/sundarbans-photography',
      type: 'guide',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop',
      author: 'Kamal Hossain',
      savedDate: '2024-12-05',
      readTime: '12 min read',
      tags: ['Photography', 'Wildlife', 'Sundarbans'],
      rating: 4.7
    },
    {
      id: 4,
      title: 'Travel Safety Tips for Bangladesh Visitors',
      description: 'Essential safety guidelines, cultural considerations, and practical advice for travelers exploring Bangladesh safely and respectfully.',
      url: 'https://wanderlust.com/articles/bangladesh-travel-safety',
      type: 'article',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop',
      author: 'Fatima Rahman',
      savedDate: '2024-11-28',
      readTime: '10 min read',
      tags: ['Safety', 'Bangladesh', 'Travel Tips'],
      rating: 4.9
    },
    {
      id: 5,
      title: 'Virtual Tour: Sixty Dome Mosque Experience',
      description: 'Immersive 360° virtual tour of the historic Sixty Dome Mosque with architectural commentary and historical insights.',
      url: 'https://wanderlust.com/virtual-tours/sixty-dome-mosque',
      type: 'video',
      image: 'https://images.unsplash.com/photo-1580418827493-c09f4d79d3c4?w=300&h=200&fit=crop',
      author: 'Heritage Bangladesh',
      savedDate: '2024-11-20',
      readTime: '25 min watch',
      tags: ['Virtual Tour', 'Bangladesh', 'History'],
      rating: 4.8
    },
    {
      id: 6,
      title: 'Cox\'s Bazar, Bangladesh - Complete Destination Guide',
      description: 'Everything you need to know about visiting Cox\'s Bazar: best time to visit, where to stay, what to see, and local secrets.',
      url: 'https://wanderlust.com/destinations/coxs-bazar-bangladesh',
      type: 'place',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      author: 'Travel Wanderlust',
      savedDate: '2024-11-15',
      readTime: '18 min read',
      tags: ['Bangladesh', 'Beach', 'Sunset'],
      rating: 4.9
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide':
        return 'bg-blue-100 text-blue-800';
      case 'article':
        return 'bg-green-100 text-green-800';
      case 'video':
        return 'bg-purple-100 text-purple-800';
      case 'place':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesFilter = activeFilter === 'all' || bookmark.type === activeFilter;
    const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bookmarks</h1>
        <p className="text-gray-600">Your saved travel articles, guides, and resources</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Bookmarks' },
            { key: 'articles', label: 'Articles' },
            { key: 'guides', label: 'Guides' },
            { key: 'videos', label: 'Videos' },
            { key: 'places', label: 'Places' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm text-gray-700">Filter</span>
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {filteredBookmarks.length} bookmarks found
        </p>
      </div>

      {/* Bookmarks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookmarks.map((bookmark) => (
          <div key={bookmark.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative">
              <img
                src={bookmark.image}
                alt={bookmark.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(bookmark.type)}`}>
                  {bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <Bookmark size={16} className="text-primary-600 fill-current" />
                </button>
              </div>
            </div>
            
            <div className="p-5">
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{bookmark.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{bookmark.description}</p>
              </div>

              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <User size={12} />
                  <span>{bookmark.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>{new Date(bookmark.savedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star size={12} className="text-yellow-400 fill-current" />
                  <span>{bookmark.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {bookmark.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{bookmark.readTime}</span>
                <button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  <span>Read</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBookmarks.length === 0 && (
        <div className="text-center py-12">
          <Bookmark size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery ? 'Try adjusting your search terms' : 'Start exploring and save interesting articles, guides, and places'}
          </p>
          <button className="btn btn-primary">Explore Content</button>
        </div>
      )}
    </div>
  );
};
