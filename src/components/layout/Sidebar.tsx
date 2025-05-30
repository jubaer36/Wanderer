import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Camera, 
  Users, 
  Heart, 
  Calendar, 
  Bookmark, 
  Settings,
  Bell,
  CreditCard,
  Map,
  Route,
  Star,
  User
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  
  const sidebarSections = [
    {
      title: 'Personal',
      items: [
        { 
          name: 'Messages', 
          href: '/messages', 
          icon: MessageCircle, 
          count: 3,
          description: 'Chat with travel guides' 
        },
        { 
          name: 'Saved Places', 
          href: '/saved-places', 
          icon: Heart, 
          count: 12,
          description: 'Your favorite destinations' 
        },
        { 
          name: 'My Tours', 
          href: '/my-tours', 
          icon: Route, 
          count: 5,
          description: 'Booked and planned tours' 
        },
        { 
          name: 'Travel Buddies', 
          href: '/travel-buddies', 
          icon: Users, 
          count: 8,
          description: 'Connect with fellow travelers' 
        },
      ]
    },
    {
      title: 'Planning',
      items: [
        { 
          name: 'Trip Calendar', 
          href: '/calendar', 
          icon: Calendar,
          description: 'Manage your travel schedule' 
        },
        { 
          name: 'Bookmarks', 
          href: '/bookmarks', 
          icon: Bookmark, 
          count: 24,
          description: 'Saved articles and guides' 
        },
        { 
          name: 'Travel Maps', 
          href: '/travel-maps', 
          icon: Map,
          description: 'Interactive travel maps' 
        },
        { 
          name: 'Photo Gallery', 
          href: '/gallery', 
          icon: Camera, 
          count: 156,
          description: 'Your travel memories' 
        },
      ]
    },
    {
      title: 'Account',
      items: [
        { 
          name: 'Reviews', 
          href: '/reviews', 
          icon: Star, 
          count: 7,
          description: 'Your reviews and ratings' 
        },
        { 
          name: 'Payments', 
          href: '/payments', 
          icon: CreditCard,
          description: 'Payment methods and history' 
        },
        { 
          name: 'Notifications', 
          href: '/notifications', 
          icon: Bell, 
          count: 2,
          description: 'Manage your preferences' 
        },
        { 
          name: 'Settings', 
          href: '/settings', 
          icon: Settings,
          description: 'Account and app settings' 
        },
      ]
    }
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-50 transition-all duration-300 overflow-hidden',
          isOpen ? 'w-80' : 'w-16',
          'lg:relative lg:top-0 lg:h-full'
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className={cn(
            'absolute -right-3 top-6 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-1.5 shadow-lg transition-colors z-10',
            'hidden lg:flex items-center justify-center'
          )}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Sidebar Content */}
        <div className="h-full overflow-y-auto">
          {/* User Profile Section */}
          <div className={cn(
            'p-4 border-b border-gray-100',
            !isOpen && 'px-2'
          )}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-primary-600" />
              </div>
              {isOpen && (
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 truncate">John Doe</h3>
                  <p className="text-sm text-gray-500 truncate">Adventure Seeker</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="p-2">
            {sidebarSections.map((section, sectionIndex) => (
              <div key={section.title} className={cn(
                'mb-6',
                sectionIndex > 0 && 'border-t border-gray-100 pt-4'
              )}>
                {isOpen && (
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                    {section.title}
                  </h4>
                )}
                
                <nav className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'group flex items-center px-2 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                        location.pathname === item.href
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                        !isOpen && 'justify-center'
                      )}
                      title={!isOpen ? item.name : undefined}
                    >
                      <div className="relative">
                        <item.icon 
                          size={20} 
                          className={cn(
                            'flex-shrink-0',
                            location.pathname === item.href ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-700'
                          )}
                        />
                        {item.count && !isOpen && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {item.count > 9 ? '9+' : item.count}
                          </span>
                        )}
                      </div>
                      
                      {isOpen && (
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="truncate">{item.name}</span>
                            {item.count && (
                              <span className={cn(
                                'ml-2 px-2 py-0.5 text-xs rounded-full',
                                location.pathname === item.href
                                  ? 'bg-primary-100 text-primary-700'
                                  : 'bg-gray-100 text-gray-600'
                              )}>
                                {item.count}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-gray-500 mt-0.5 truncate">
                              {item.description}
                            </p>
                          )}
                        </div>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          {/* Quick Actions (when collapsed) */}
          {!isOpen && (
            <div className="absolute bottom-4 left-0 right-0 px-2">
              <div className="flex flex-col space-y-2">
                <button 
                  className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Messages"
                >
                  <MessageCircle size={20} className="text-gray-500" />
                </button>
                <button 
                  className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Settings"
                >
                  <Settings size={20} className="text-gray-500" />
                </button>
              </div>
            </div>
          )}

          {/* Footer when expanded */}
          {isOpen && (
            <div className="border-t border-gray-100 p-4 mt-auto">
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Wanderlust v2.0
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Your travel companion
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
