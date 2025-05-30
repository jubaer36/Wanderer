import React, { useState } from 'react';
import { Bell, Check, X, Settings, Filter, Search, Trash2, MarkAsUnreadIcon as MarkAsRead, Volume2, VolumeX, Smartphone, Mail, Globe } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'settings'>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [filter, setFilter] = useState<'all' | 'travel' | 'social' | 'system' | 'emergency'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      type: 'travel',
      title: 'Your trip to Tokyo starts in 3 days!',
      message: 'Don\'t forget to check in for your flight and pack your essentials. Have a great trip!',
      time: '2 hours ago',
      read: false,
      important: true,
      icon: '✈️',
      actionable: true,
      actions: ['Check Flight Status', 'View Itinerary']
    },
    {
      id: 2,
      type: 'emergency',
      title: 'Weather Alert: Tokyo',
      message: 'Heavy rain expected in Tokyo during your visit. Consider packing an umbrella and waterproof clothing.',
      time: '4 hours ago',
      read: false,
      important: true,
      icon: '⚠️',
      actionable: true,
      actions: ['View Weather Details', 'Update Plans']
    },
    {
      id: 3,
      type: 'social',
      title: 'Sarah Chen started following you',
      message: 'Sarah Chen, who you traveled with in Japan, started following your travel updates.',
      time: '1 day ago',
      read: true,
      important: false,
      icon: '👥',
      actionable: true,
      actions: ['View Profile', 'Follow Back']
    },
    {
      id: 4,
      type: 'travel',
      title: 'New review for your Tokyo trip',
      message: 'Alex Rodriguez left a 5-star review about traveling with you. Check it out!',
      time: '2 days ago',
      read: true,
      important: false,
      icon: '⭐',
      actionable: true,
      actions: ['View Review', 'Respond']
    },
    {
      id: 5,
      type: 'system',
      title: 'Travel insurance reminder',
      message: 'Your travel insurance for the upcoming Peru trip is about to expire. Renew now to stay protected.',
      time: '3 days ago',
      read: false,
      important: true,
      icon: '🛡️',
      actionable: true,
      actions: ['Renew Insurance', 'View Policy']
    },
    {
      id: 6,
      type: 'travel',
      title: 'Price drop alert: Flights to Bali',
      message: 'Great news! Flights to Bali (in your wishlist) dropped by 25%. Book now to save $200.',
      time: '5 days ago',
      read: true,
      important: false,
      icon: '💰',
      actionable: true,
      actions: ['View Flights', 'Book Now']
    },
    {
      id: 7,
      type: 'social',
      title: 'Travel buddy request',
      message: 'Maria Santos wants to be your travel buddy for the upcoming Mediterranean trip.',
      time: '1 week ago',
      read: false,
      important: false,
      icon: '🤝',
      actionable: true,
      actions: ['Accept', 'Decline', 'View Profile']
    },
    {
      id: 8,
      type: 'system',
      title: 'Account security update',
      message: 'We\'ve updated our security features. Please review your account settings and enable two-factor authentication.',
      time: '1 week ago',
      read: true,
      important: false,
      icon: '🔒',
      actionable: true,
      actions: ['Review Settings', 'Enable 2FA']
    }
  ];

  const notificationSettings = {
    travel: {
      label: 'Travel Updates',
      description: 'Trip reminders, flight updates, and booking confirmations',
      email: true,
      push: true,
      sms: false
    },
    social: {
      label: 'Social Activity',
      description: 'New followers, travel buddy requests, and social interactions',
      email: true,
      push: true,
      sms: false
    },
    emergency: {
      label: 'Emergency Alerts',
      description: 'Safety alerts, weather warnings, and emergency notifications',
      email: true,
      push: true,
      sms: true
    },
    system: {
      label: 'System Updates',
      description: 'Account updates, security alerts, and app notifications',
      email: true,
      push: false,
      sms: false
    },
    marketing: {
      label: 'Promotions & Deals',
      description: 'Special offers, price alerts, and travel deals',
      email: false,
      push: false,
      sms: false
    }
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;

    if (activeTab === 'unread') {
      filtered = filtered.filter(n => !n.read);
    }

    if (filter !== 'all') {
      filtered = filtered.filter(n => n.type === filter);
    }

    if (searchQuery) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const importantCount = notifications.filter(n => n.important && !n.read).length;

  const toggleNotificationSelection = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(nId => nId !== id)
        : [...prev, id]
    );
  };

  const markAsRead = (ids: number[]) => {
    // Implementation would update notification read status
    console.log('Mark as read:', ids);
  };

  const deleteNotifications = (ids: number[]) => {
    // Implementation would delete notifications
    console.log('Delete notifications:', ids);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'travel':
        return 'bg-blue-100 text-blue-800';
      case 'social':
        return 'bg-green-100 text-green-800';
      case 'emergency':
        return 'bg-red-100 text-red-800';
      case 'system':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">Stay updated on your travels and manage notification preferences</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              <p className="text-sm text-gray-600">Total Notifications</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Bell size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              <p className="text-sm text-gray-600">Unread</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Bell size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{importantCount}</p>
              <p className="text-sm text-gray-600">Important</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Settings size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {[
            { key: 'all', label: `All (${notifications.length})` },
            { key: 'unread', label: `Unread (${unreadCount})` },
            { key: 'settings', label: 'Settings' }
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

      {/* Notifications List */}
      {(activeTab === 'all' || activeTab === 'unread') && (
        <div className="space-y-6">
          {/* Filters and Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Type Filters */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All Types' },
                  { key: 'travel', label: 'Travel' },
                  { key: 'social', label: 'Social' },
                  { key: 'emergency', label: 'Emergency' },
                  { key: 'system', label: 'System' }
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

              {/* Search and Actions */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                  />
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedNotifications.length > 0 && (
              <div className="mt-4 p-3 bg-primary-50 rounded-lg flex items-center justify-between">
                <span className="text-sm font-medium text-primary-700">
                  {selectedNotifications.length} notification{selectedNotifications.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => markAsRead(selectedNotifications)}
                    className="btn btn-outline btn-sm"
                  >
                    <Check size={16} className="mr-2" />
                    Mark as Read
                  </button>
                  <button 
                    onClick={() => deleteNotifications(selectedNotifications)}
                    className="btn btn-outline btn-sm text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </button>
                  <button 
                    onClick={() => setSelectedNotifications([])}
                    className="btn btn-outline btn-sm"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            {getFilteredNotifications().map((notification) => (
              <div 
                key={notification.id} 
                className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-4 border-l-primary-500' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => toggleNotificationSelection(notification.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                      {notification.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          {notification.important && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                              Important
                            </span>
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(notification.type)}`}>
                            {notification.type}
                          </span>
                        </div>
                        
                        <p className={`mb-3 ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>

                        {notification.actionable && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {notification.actions?.map((action, index) => (
                              <button 
                                key={index}
                                className="btn btn-outline btn-sm"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <span className="text-sm text-gray-500">{notification.time}</span>
                        <div className="flex space-x-1">
                          {!notification.read && (
                            <button 
                              onClick={() => markAsRead([notification.id])}
                              className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg"
                              title="Mark as read"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteNotifications([notification.id])}
                            className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {getFilteredNotifications().length === 0 && (
            <div className="text-center py-12">
              <Bell size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? 'Try adjusting your search terms' 
                  : activeTab === 'unread'
                  ? 'All caught up! No unread notifications.'
                  : 'Your notifications will appear here'
                }
              </p>
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
            <p className="text-gray-600 mb-6">
              Choose how you want to receive notifications for different types of activities.
            </p>

            <div className="space-y-6">
              {Object.entries(notificationSettings).map(([key, setting]) => (
                <div key={key} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{setting.label}</h3>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Mail size={18} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">Email</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked={setting.email}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Smartphone size={18} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">Push</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked={setting.push}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Globe size={18} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">SMS</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked={setting.sms}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">General Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Notification Sound</p>
                    <p className="text-sm text-gray-600">Play sound for new notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      defaultChecked={true}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Do Not Disturb</p>
                    <p className="text-sm text-gray-600">Pause all notifications between 10 PM - 8 AM</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      defaultChecked={false}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button className="btn btn-primary">Save Preferences</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
