import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relationship: string;
  isPrimary?: boolean;
}

export interface DisasterAlert {
  id: string;
  type: 'earthquake' | 'flood' | 'storm' | 'fire' | 'tsunami' | 'cyclone' | 'landslide';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  message: string;
  timestamp: Date;
  isActive: boolean;
  instructions: string[];
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  country?: string;
}

interface EmergencyContextType {
  userLocation: UserLocation | null;
  setUserLocation: (location: UserLocation) => void;
  emergencyContacts: EmergencyContact[];
  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  removeEmergencyContact: (id: string) => void;
  updateEmergencyContact: (id: string, contact: Partial<EmergencyContact>) => void;
  disasterAlerts: DisasterAlert[];
  activeAlerts: DisasterAlert[];
  dismissAlert: (id: string) => void;
  triggerEmergencyMode: () => void;
  isEmergencyMode: boolean;
  sendEmergencyNotifications: () => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};

interface EmergencyProviderProps {
  children: ReactNode;
}

export const EmergencyProvider: React.FC<EmergencyProviderProps> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [disasterAlerts, setDisasterAlerts] = useState<DisasterAlert[]>([]);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  // Initialize with sample emergency contacts
  useEffect(() => {
    setEmergencyContacts([
      {
        id: '1',
        name: 'Family Contact',
        phone: '+880-1234-567890',
        email: 'family@example.com',
        relationship: 'Family',
        isPrimary: true
      },
      {
        id: '2',
        name: 'Emergency Services',
        phone: '999',
        relationship: 'Emergency Services',
        isPrimary: false
      }
    ]);
  }, []);

  // Simulate real-time disaster monitoring
  useEffect(() => {
    const simulateDisasterAlerts = () => {
      // This would normally connect to real disaster monitoring APIs
      const sampleAlerts: DisasterAlert[] = [
        {
          id: '1',
          type: 'cyclone',
          severity: 'high',
          location: 'Coastal Bangladesh',
          message: 'Cyclone Mocha approaching coastal areas. High winds and heavy rainfall expected.',
          timestamp: new Date(),
          isActive: true,
          instructions: [
            'Move to higher ground immediately',
            'Secure loose objects outside',
            'Stock up on emergency supplies',
            'Stay indoors and away from windows'
          ]
        }
      ];

      if (userLocation && userLocation.country === 'Bangladesh') {
        setDisasterAlerts(sampleAlerts);
      }
    };

    // Check for alerts every 30 seconds
    const interval = setInterval(simulateDisasterAlerts, 30000);
    simulateDisasterAlerts(); // Initial check

    return () => clearInterval(interval);
  }, [userLocation]);

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: UserLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: 'Dhaka', // This would normally be fetched from reverse geocoding
            country: 'Bangladesh'
          };
          setUserLocation(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback location
          setUserLocation({
            latitude: 23.8103,
            longitude: 90.4125,
            city: 'Dhaka',
            country: 'Bangladesh'
          });
        }
      );
    }
  }, []);

  const addEmergencyContact = (contact: Omit<EmergencyContact, 'id'>) => {
    const newContact: EmergencyContact = {
      ...contact,
      id: Date.now().toString()
    };
    setEmergencyContacts(prev => [...prev, newContact]);
  };

  const removeEmergencyContact = (id: string) => {
    setEmergencyContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const updateEmergencyContact = (id: string, updates: Partial<EmergencyContact>) => {
    setEmergencyContacts(prev =>
      prev.map(contact =>
        contact.id === id ? { ...contact, ...updates } : contact
      )
    );
  };

  const dismissAlert = (id: string) => {
    setDisasterAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, isActive: false } : alert
      )
    );
  };

  const triggerEmergencyMode = () => {
    setIsEmergencyMode(true);
    sendEmergencyNotifications();
    
    // Auto-disable emergency mode after 1 hour
    setTimeout(() => {
      setIsEmergencyMode(false);
    }, 3600000);
  };

  const sendEmergencyNotifications = () => {
    // This would integrate with real SMS/Email services
    const primaryContacts = emergencyContacts.filter(contact => contact.isPrimary);
    
    primaryContacts.forEach(contact => {
      console.log(`Sending emergency notification to ${contact.name} at ${contact.phone}`);
      // Implement actual SMS/Email sending here
    });

    // Show notification to user
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Emergency Alert Sent', {
        body: 'Emergency notifications have been sent to your contacts.',
        icon: '/emergency-icon.png'
      });
    }
  };

  const activeAlerts = disasterAlerts.filter(alert => alert.isActive);

  const value: EmergencyContextType = {
    userLocation,
    setUserLocation,
    emergencyContacts,
    addEmergencyContact,
    removeEmergencyContact,
    updateEmergencyContact,
    disasterAlerts,
    activeAlerts,
    dismissAlert,
    triggerEmergencyMode,
    isEmergencyMode,
    sendEmergencyNotifications
  };

  return (
    <EmergencyContext.Provider value={value}>
      {children}
    </EmergencyContext.Provider>
  );
};
