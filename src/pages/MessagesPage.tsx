import React from 'react';
import { MessageCircle, Search, Filter, Send, Paperclip, Smile } from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const conversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: '👩‍🦱',
      lastMessage: 'The hiking trail in Bali was amazing! You should definitely check it out.',
      time: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Travel Guide Tokyo',
      avatar: '🗾',
      lastMessage: 'Your cherry blossom tour is confirmed for next week.',
      time: '1h ago',
      unread: 1,
      online: false
    },
    {
      id: 3,
      name: 'Adventure Group',
      avatar: '🏔️',
      lastMessage: 'Mike: Who\'s joining the mountain climbing expedition?',
      time: '3h ago',
      unread: 0,
      online: false
    }
  ];

  return (
    <div className="h-full flex bg-white">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter size={18} className="text-gray-500" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50"
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-xl">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">{conversation.unread}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-lg">
                👩‍🦱
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Sarah Chen</h2>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="max-w-xs bg-white rounded-lg p-3 shadow-sm">
                <p className="text-gray-800">Hey! I just got back from my Bali trip. The hiking trails were incredible!</p>
                <span className="text-xs text-gray-500 mt-2 block">10:30 AM</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-xs bg-primary-600 text-white rounded-lg p-3">
                <p>That sounds amazing! I'm planning a trip there next month. Any specific trails you'd recommend?</p>
                <span className="text-xs text-primary-200 mt-2 block">10:32 AM</span>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-xs bg-white rounded-lg p-3 shadow-sm">
                <p className="text-gray-800">The Sekumpul Falls hike is a must! Also, Mount Batur for sunrise - absolutely breathtaking. I can share my itinerary if you want.</p>
                <span className="text-xs text-gray-500 mt-2 block">10:35 AM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Paperclip size={20} className="text-gray-500" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pr-12"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
                <Smile size={18} className="text-gray-500" />
              </button>
            </div>
            <button className="p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
