import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Trash2, Bot, User, AlertTriangle } from 'lucide-react';
import { useChatbot } from '../../contexts/ChatbotContext';
import { useEmergency } from '../../contexts/EmergencyContext';
import { cn } from '../../utils/cn';
import { format } from 'date-fns';

export const AIChatbot: React.FC = () => {
  const { 
    messages, 
    isOpen, 
    isTyping, 
    toggleChatbot, 
    sendMessage, 
    clearChat,
    userLocation 
  } = useChatbot();
  
  const { triggerEmergencyMode, isEmergencyMode } = useEmergency();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: 'Plan a trip', icon: '🗺️' },
    { text: 'Weather update', icon: '🌦️' },
    { text: 'Emergency help', icon: '🚨' },
    { text: 'Local recommendations', icon: '📍' },
    { text: 'Transportation options', icon: '🚗' },
    { text: 'Safety tips', icon: '🛡️' }
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center',
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-primary-600 hover:bg-primary-700',
          isEmergencyMode && 'animate-pulse'
        )}
      >
        {isOpen ? (
          <X className="text-white" size={24} />
        ) : (
          <div className="relative">
            <MessageCircle className="text-white" size={24} />
            {isEmergencyMode && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            )}
          </div>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[32rem] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-semibold">AI Travel Assistant</h3>
                <p className="text-xs text-primary-200">
                  {isEmergencyMode ? '🚨 Emergency Mode Active' : 'Online - Ready to help'}
                </p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg p-3 text-sm',
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : message.type === 'emergency'
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-gray-100 text-gray-800'
                  )}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'ai' && (
                      <div className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center mt-0.5',
                        message.type === 'emergency' ? 'bg-red-200' : 'bg-primary-100'
                      )}>
                        {message.type === 'emergency' ? (
                          <AlertTriangle size={12} className="text-red-600" />
                        ) : (
                          <Bot size={12} className="text-primary-600" />
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <p className={cn(
                        'text-xs mt-1',
                        message.sender === 'user' 
                          ? 'text-primary-200' 
                          : 'text-gray-500'
                      )}>
                        {format(message.timestamp, 'HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Bot size={12} className="text-primary-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(action.text)}
                    className="text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border transition-colors"
                  >
                    <span className="mr-1">{action.icon}</span>
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 input"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="btn btn-primary btn-sm px-3"
              >
                <Send size={16} />
              </button>
            </div>

            {userLocation && (
              <div className="mt-2 text-xs text-gray-500">
                📍 Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
