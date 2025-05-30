import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'emergency' | 'trip-info' | 'location';
}

export interface TripInfo {
  destination?: string;
  startDate?: Date;
  endDate?: Date;
  activities?: string[];
  budget?: number;
  companions?: number;
}

interface ChatbotContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  toggleChatbot: () => void;
  sendMessage: (message: string) => void;
  clearChat: () => void;
  currentTripInfo: TripInfo | null;
  userLocation: { lat: number; lng: number; address?: string } | null;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTripInfo, setCurrentTripInfo] = useState<TripInfo | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null);

  // Initialize chatbot with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: '1',
      text: "Hi! I'm your AI travel assistant. I can help you with trip planning, provide local information, assist with emergencies, and answer any travel-related questions. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([welcomeMessage]);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Current Location' // This would be resolved via reverse geocoding
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Emergency-related responses
    if (lowerMessage.includes('emergency') || lowerMessage.includes('help') || lowerMessage.includes('danger')) {
      return "🚨 For immediate emergencies, call 999 (Bangladesh) or your local emergency services. I can help you:\n\n• Contact your emergency contacts\n• Provide safety information\n• Share your current location\n• Guide you to nearest hospitals or police stations\n\nIs this a current emergency? Type 'emergency now' for immediate assistance.";
    }

    if (lowerMessage.includes('emergency now')) {
      return "🚨 EMERGENCY MODE ACTIVATED\n\n1. Your emergency contacts have been notified\n2. Your location has been shared\n3. Local emergency services: 999\n\nStay calm and follow these steps:\n• Move to a safe location\n• Stay on the line with emergency services\n• Wait for help to arrive\n\nI'm here to help until assistance arrives.";
    }

    // Trip planning responses
    if (lowerMessage.includes('plan') || lowerMessage.includes('trip') || lowerMessage.includes('itinerary')) {
      return "I'd love to help you plan your trip! 🗺️\n\nTo get started, could you tell me:\n• Where would you like to go?\n• When are you planning to travel?\n• What's your budget range?\n• What activities interest you?\n\nBased on your preferences, I can suggest:\n• Best destinations\n• Optimal travel dates\n• Budget-friendly options\n• Must-visit attractions\n• Local experiences";
    }

    // Weather and disaster information
    if (lowerMessage.includes('weather') || lowerMessage.includes('disaster') || lowerMessage.includes('cyclone') || lowerMessage.includes('flood')) {
      return "🌦️ I can provide current weather and disaster alerts for your area.\n\nBased on your location, here's what you should know:\n• Current weather conditions\n• 7-day forecast\n• Active disaster warnings\n• Safety recommendations\n\nWould you like specific information about weather conditions or disaster preparedness for your destination?";
    }

    // Location-based responses
    if (lowerMessage.includes('location') || lowerMessage.includes('where am i') || lowerMessage.includes('current position')) {
      return `📍 Based on your current location:\n\n• Coordinates: ${userLocation?.lat.toFixed(4)}, ${userLocation?.lng.toFixed(4)}\n• Address: ${userLocation?.address || 'Location services needed'}\n\nI can help you find:\n• Nearby attractions\n• Restaurants and cafes\n• Emergency services\n• Transportation options\n• Local events and activities`;
    }

    // Travel recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('where to go')) {
      return "🌟 I have great recommendations for you!\n\nBased on popular destinations in Bangladesh:\n\n🏖️ **Cox's Bazar** - World's longest natural beach\n🌿 **Sylhet** - Tea gardens and natural beauty\n🏛️ **Old Dhaka** - Rich history and culture\n🌊 **Sundarbans** - Mangrove forests and wildlife\n\nWould you like detailed information about any of these destinations, or are you looking for something specific like adventure, culture, or relaxation?";
    }

    // Budget-related responses
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "💰 I can help you plan within your budget!\n\nFor Bangladesh travel:\n• Budget trips: 2,000-5,000 BDT/day\n• Mid-range: 5,000-10,000 BDT/day\n• Luxury: 10,000+ BDT/day\n\nThis includes accommodation, meals, transport, and activities. Would you like a detailed breakdown for a specific destination or duration?";
    }

    // Transportation
    if (lowerMessage.includes('transport') || lowerMessage.includes('bus') || lowerMessage.includes('train') || lowerMessage.includes('flight')) {
      return "🚗 Transportation options in Bangladesh:\n\n✈️ **Flights**: Domestic routes available\n🚆 **Trains**: Comfortable for longer distances\n🚌 **Buses**: Most common, various comfort levels\n🚢 **Water transport**: For coastal and river areas\n🛺 **Local**: Rickshaw, CNG, Uber/Pathao\n\nWhere are you planning to travel? I can suggest the best transportation options.";
    }

    // Food and culture
    if (lowerMessage.includes('food') || lowerMessage.includes('culture') || lowerMessage.includes('local')) {
      return "🍛 Bengali culture and cuisine are amazing!\n\n**Must-try foods:**\n• Hilsa fish (national fish)\n• Biryani and kacchi\n• Fuchka and chotpoti\n• Rasgulla and mishti\n\n**Cultural experiences:**\n• Traditional dance and music\n• Local festivals\n• Handicraft markets\n• Historical sites\n\nWould you like specific restaurant recommendations or cultural activity suggestions?";
    }

    // Safety tips
    if (lowerMessage.includes('safety') || lowerMessage.includes('safe') || lowerMessage.includes('security')) {
      return "🛡️ Safety tips for travelers:\n\n✅ **General Safety:**\n• Keep emergency contacts handy\n• Share your itinerary with family\n• Use registered transportation\n• Avoid isolated areas at night\n\n✅ **Health:**\n• Drink bottled water\n• Eat at reputable places\n• Carry basic medications\n• Have travel insurance\n\nAny specific safety concerns about your destination?";
    }

    // Default response
    const responses = [
      "I'm here to help with your travel needs! Ask me about destinations, planning, safety, local information, or anything travel-related.",
      "Feel free to ask me about trip planning, weather updates, emergency assistance, or local recommendations!",
      "I can assist with travel planning, provide local insights, help with emergencies, or answer any questions about your journey.",
      "Let me know how I can help! I'm knowledgeable about destinations, safety, planning, and local information."
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = (messageText: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: messageText.toLowerCase().includes('emergency') ? 'emergency' : 'text'
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const clearChat = () => {
    const welcomeMessage: ChatMessage = {
      id: '1',
      text: "Chat cleared! How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([welcomeMessage]);
  };

  const value: ChatbotContextType = {
    messages,
    isOpen,
    isTyping,
    toggleChatbot,
    sendMessage,
    clearChat,
    currentTripInfo,
    userLocation
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};
