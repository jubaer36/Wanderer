import React, { useState } from 'react';
import { Search, Users, MessageSquare, Heart, Share2, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';

export const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('stories');

  const tabs = [
    { id: 'stories', label: 'Travel Stories' },
    { id: 'buddies', label: 'Find Travel Buddies' },
    { id: 'groups', label: 'Travel Groups' },
    { id: 'events', label: 'Upcoming Events' }
  ];

  const stories = [
    {
      id: 1,
      author: {
        name: "Sarah Mitchell",
        avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
        location: "Travel Blogger from London"
      },
      title: "A Week in the Japanese Alps",
      content: "Exploring the hidden gems of Japan's mountainous region...",
      image: "https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg",
      likes: 234,
      comments: 45,
      shares: 12
    },
    {
      id: 2,
      author: {
        name: "David Chen",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        location: "Adventure Photographer"
      },
      title: "Trekking the Inca Trail",
      content: "Four days of challenging hiking led to the most rewarding view...",
      image: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg",
      likes: 567,
      comments: 89,
      shares: 34
    }
  ];

  const travelBuddies = [
    {
      id: 1,
      name: "Emma Thompson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      location: "London, UK",
      destination: "Southeast Asia",
      dates: "Aug 2024",
      interests: ["Photography", "Culture", "Food"],
      description: "Looking for travel companions for a 3-week adventure through Thailand and Vietnam."
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      location: "Barcelona, Spain",
      destination: "South America",
      dates: "Sep 2024",
      interests: ["Hiking", "Photography", "Local Experiences"],
      description: "Planning a backpacking trip through Peru and Bolivia. Looking for like-minded adventurers!"
    }
  ];

  const groups = [
    {
      id: 1,
      name: "Solo Female Travelers",
      image: "https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg",
      members: 15432,
      description: "A supportive community for women who love to travel solo.",
      topics: ["Safety Tips", "Destination Guides", "Meet-ups"]
    },
    
    {
      id: 2,
      name: "Adventure Photographers",
      image: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
      members: 8976,
      description: "Share your travel photography and connect with fellow photographers.",
      topics: ["Photography Tips", "Gear Reviews", "Photo Challenges"]
    }
  ];

  const events = [
    {
      id: 1,
      title: "Travel Photography Workshop",
      image: "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg",
      date: "July 15, 2024",
      location: "Virtual Event",
      attendees: 156,
      description: "Learn travel photography tips from professional photographers."
    },
    {
      id: 2,
      title: "European Travelers Meetup",
      image: "https://images.pexels.com/photos/2422483/pexels-photo-2422483.jpeg",
      date: "August 5, 2024",
      location: "Paris, France",
      attendees: 89,
      description: "Connect with fellow travelers and share European travel experiences."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-primary-600 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-8">Travel Community</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search stories, travel buddies, or events..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-500"
            />
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
        {activeTab === 'stories' && (
          <div className="space-y-8">
            {stories.map(story => (
              <div key={story.id} className="bg-white rounded-xl shadow-card overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={story.author.avatar}
                      alt={story.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="font-bold">{story.author.name}</h3>
                      <p className="text-sm text-gray-600">{story.author.location}</p>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{story.title}</h2>
                  <p className="text-gray-600 mb-4">{story.content}</p>
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-96 object-cover rounded-lg mb-4"
                  />
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center text-gray-600 hover:text-primary-600">
                      <Heart size={20} className="mr-2" />
                      {story.likes}
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-primary-600">
                      <MessageSquare size={20} className="mr-2" />
                      {story.comments}
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-primary-600">
                      <Share2 size={20} className="mr-2" />
                      {story.shares}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'buddies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {travelBuddies.map(buddy => (
              <div key={buddy.id} className="bg-white rounded-xl shadow-card p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={buddy.avatar}
                    alt={buddy.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">{buddy.name}</h3>
                    <p className="text-gray-600 flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {buddy.location}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Planning to visit</h4>
                    <p className="text-primary-600">{buddy.destination}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">When</h4>
                    <p>{buddy.dates}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Interests</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {buddy.interests.map(interest => (
                        <span
                          key={interest}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{buddy.description}</p>
                  <button className="btn btn-primary w-full">
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groups.map(group => (
              <div key={group.id} className="bg-white rounded-xl shadow-card overflow-hidden">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{group.name}</h3>
                    <div className="flex items-center text-gray-600">
                      <Users size={20} className="mr-2" />
                      {group.members.toLocaleString()}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{group.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {group.topics.map(topic => (
                      <span
                        key={topic}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <button className="btn btn-primary w-full">
                    Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-card overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Users size={20} className="mr-2" />
                    {event.attendees} attending
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="flex items-center text-gray-600">
                      <Calendar className="mr-2" size={20} />
                      {event.date}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <MapPin className="mr-2" size={20} />
                      {event.location}
                    </p>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <button className="btn btn-primary w-full">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};