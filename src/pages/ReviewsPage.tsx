import React, { useState } from 'react';
import { Star, Search, Filter, Edit3, Trash2, MapPin, Calendar, User, ThumbsUp, ThumbsDown, Flag } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my-reviews' | 'received'>('my-reviews');
  const [filter, setFilter] = useState<'all' | 'recent' | 'high-rated' | 'low-rated'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const myReviews = [
    {
      id: 1,
      type: 'destination',
      name: 'Cox\'s Bazar Beach Holiday',
      location: 'Cox\'s Bazar, Bangladesh',
      rating: 5,
      title: 'World\'s Longest Beach - Absolutely Stunning',
      content: 'The Cox\'s Bazar beach tour was beyond my expectations. The organization was perfect, our guide Rashid was incredibly knowledgeable about local history and culture, and the sunset views were breathtaking. The seafood was fresh and delicious. Highly recommend visiting during winter months!',
      date: '2024-04-25',
      helpful: 12,
      photos: 3,
      category: 'tour',
      verified: true,
      response: {
        author: 'Bangladesh Adventure Tours',
        content: 'Thank you so much for this wonderful review! We\'re thrilled you had such an amazing time at Cox\'s Bazar.',
        date: '2024-04-26'
      }
    },
    {
      id: 2,
      type: 'accommodation',
      name: 'Sylhet Tea Resort',
      location: 'Sylhet, Bangladesh',
      rating: 4,
      title: 'Beautiful Tea Garden Views, Minor Issues',
      content: 'The resort has stunning tea garden views and the morning mist over the hills is incredible. The staff was friendly and the local cuisine was authentic. However, the Wi-Fi was quite slow and the room service could be improved. Overall still a great stay in the heart of tea country.',
      date: '2024-06-22',
      helpful: 8,
      photos: 5,
      category: 'accommodation',
      verified: true
    },
    {
      id: 3,
      type: 'guide',
      name: 'Karim Wildlife Tours',
      location: 'Sundarbans, Bangladesh',
      rating: 5,
      title: 'Best Wildlife Guide Ever!',
      content: 'Karim was absolutely incredible throughout our Sundarbans wildlife safari. His knowledge of the mangrove ecosystem, local wildlife, and ability to spot Royal Bengal Tigers was amazing. He went above and beyond to ensure everyone felt safe while navigating the waterways.',
      date: '2024-05-28',
      helpful: 15,
      photos: 2,
      category: 'guide',
      verified: true
    },
    {
      id: 4,
      type: 'restaurant',
      name: 'Dhaka Spice Kitchen',
      location: 'Dhaka, Bangladesh',
      rating: 3,
      title: 'Good Biryani but Overhyped',
      content: 'The biryani was definitely good and authentic Bengali style, but given all the hype and the long wait time, I expected something more exceptional. The flavors were rich but the portion size was smaller than expected for the price. Still worth trying once.',
      date: '2024-04-20',
      helpful: 6,
      photos: 1,
      category: 'dining',
      verified: true
    }
  ];

  const receivedReviews = [
    {
      id: 1,
      reviewer: {
        name: 'Fatima Khan',
        avatar: '👩‍🦱',
        level: 'Explorer'
      },
      rating: 5,
      title: 'Amazing Travel Companion!',
      content: 'Had the pleasure of traveling with Ahmed during our Cox\'s Bazar tour. He\'s incredibly organized, friendly, and always willing to help fellow travelers. His photography skills are also top-notch - he helped everyone get great shots of the sunset!',
      date: '2024-04-30',
      trip: 'Cox\'s Bazar Beach Holiday',
      helpful: 9
    },
    {
      id: 2,
      reviewer: {
        name: 'Rafiq Hassan',
        avatar: '👨‍🦳',
        level: 'Adventurer'
      },
      rating: 5,
      title: 'Great Travel Buddy',
      content: 'Ahmed is the kind of person you want on any adventure. He\'s reliable, fun to be around, and has great suggestions for local activities. Definitely recommend him as a travel companion for Bangladesh tours!',
      date: '2024-06-25',
      trip: 'Sylhet Tea Garden Tour',
      helpful: 7
    },
    {
      id: 3,
      reviewer: {
        name: 'Nasreen Begum',
        avatar: '👩‍💼',
        level: 'Explorer'
      },
      rating: 4,
      title: 'Knowledgeable and Helpful',
      content: 'Ahmed shared lots of great local tips about Bangladesh culture and was very helpful throughout our Sundarbans trip. Sometimes he could be a bit too planned/scheduled, but overall a great experience traveling together.',
      date: '2024-03-15',
      trip: 'Sundarbans Wildlife Safari',
      helpful: 5
    }
  ];

  const categories = [
    { key: 'all', label: 'All Reviews' },
    { key: 'tour', label: 'Tours' },
    { key: 'accommodation', label: 'Hotels' },
    { key: 'dining', label: 'Restaurants' },
    { key: 'guide', label: 'Guides' },
    { key: 'activity', label: 'Activities' }
  ];

  const getFilteredReviews = () => {
    const reviews = activeTab === 'my-reviews' ? myReviews : receivedReviews;
    return reviews.filter(review => {
      const matchesSearch = searchQuery === '' || 
        review.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (activeTab === 'my-reviews' ? (review as any).name : (review as any).reviewer.name)
          .toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filter === 'all' || 
        (filter === 'recent' && new Date(review.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
        (filter === 'high-rated' && review.rating >= 4) ||
        (filter === 'low-rated' && review.rating <= 2);
      
      return matchesSearch && matchesFilter;
    });
  };

  const getStarDisplay = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const getAverageRating = (reviews: any[]) => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
        <p className="text-gray-600">Manage your reviews and see what others say about your travels</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{myReviews.length}</p>
              <p className="text-sm text-gray-600">Reviews Written</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ThumbsUp size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{receivedReviews.length}</p>
              <p className="text-sm text-gray-600">Reviews Received</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{getAverageRating(myReviews).toFixed(1)}</p>
              <p className="text-sm text-gray-600">Avg Rating Given</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <User size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{getAverageRating(receivedReviews).toFixed(1)}</p>
              <p className="text-sm text-gray-600">Your Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {[
            { key: 'my-reviews', label: `My Reviews (${myReviews.length})` },
            { key: 'received', label: `About Me (${receivedReviews.length})` }
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
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'recent', label: 'Recent' },
              { key: 'high-rated', label: '4+ Stars' },
              { key: 'low-rated', label: '1-2 Stars' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
              />
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter size={18} className="text-gray-500" />
              <span className="text-sm text-gray-700">More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {getFilteredReviews().map((review) => (
          <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {activeTab === 'my-reviews' ? (
              // My Reviews Layout
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{(review as any).name}</h3>
                      {(review as any).verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          Verified
                        </span>
                      )}
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {(review as any).category}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{(review as any).location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        {getStarDisplay(review.rating)}
                      </div>
                      <span className="font-medium text-gray-900">{review.rating}/5</span>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-4">{review.content}</p>

                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp size={14} />
                        <span>{(review as any).helpful} helpful</span>
                      </div>
                      {(review as any).photos > 0 && (
                        <div className="flex items-center space-x-1">
                          <span>📷</span>
                          <span>{(review as any).photos} photos</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Business Response */}
                {(review as any).response && (
                  <div className="mt-4 bg-blue-50 border-l-4 border-blue-200 p-4 rounded-r-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <User size={14} className="text-blue-600" />
                      <span className="font-medium text-blue-900">{(review as any).response.author}</span>
                      <span className="text-sm text-blue-600">{new Date((review as any).response.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-blue-800">{(review as any).response.content}</p>
                  </div>
                )}
              </div>
            ) : (
              // Received Reviews Layout
              <div>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                    {(review as any).reviewer.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{(review as any).reviewer.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {(review as any).reviewer.level}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>✈️</span>
                        <span>{(review as any).trip}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        {getStarDisplay(review.rating)}
                      </div>
                      <span className="font-medium text-gray-900">{review.rating}/5</span>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-4">{review.content}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <button className="flex items-center space-x-1 hover:text-primary-600">
                        <ThumbsUp size={14} />
                        <span>{(review as any).helpful} helpful</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-gray-800">
                        <Flag size={14} />
                        <span>Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {getFilteredReviews().length === 0 && (
        <div className="text-center py-12">
          <Star size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? 'Try adjusting your search terms' 
              : activeTab === 'my-reviews'
              ? 'Start sharing your travel experiences by writing reviews'
              : 'Travel with others to receive reviews about your adventures'
            }
          </p>
          {activeTab === 'my-reviews' && (
            <button className="btn btn-primary">Write Your First Review</button>
          )}
        </div>
      )}

      {/* Action Button */}
      <div className="fixed bottom-6 right-6">
        <button className="btn btn-primary btn-lg rounded-full shadow-lg">
          <Edit3 size={20} className="mr-2" />
          Write Review
        </button>
      </div>
    </div>
  );
};
