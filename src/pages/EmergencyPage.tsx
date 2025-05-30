import React from 'react';
import { Shield, AlertTriangle, Phone, MapPin, Users, Settings, Bell } from 'lucide-react';
import { useEmergency } from '../contexts/EmergencyContext';
import { EmergencyContactsManager } from '../components/emergency/EmergencyContactsManager';

export const EmergencyPage: React.FC = () => {
  const { 
    userLocation, 
    activeAlerts, 
    disasterAlerts, 
    triggerEmergencyMode,
    isEmergencyMode 
  } = useEmergency();

  const emergencyServices = [
    { name: 'Emergency Services', number: '999', description: 'Police, Fire, Medical' },
    { name: 'Police', number: '100', description: 'Police Emergency' },
    { name: 'Fire Service', number: '9555555', description: 'Fire Emergency' },
    { name: 'Ambulance', number: '199', description: 'Medical Emergency' },
    { name: 'Tourist Police', number: '+880-2-8322620', description: 'Tourist Assistance' }
  ];

  const safetyTips = [
    'Keep your emergency contacts updated and easily accessible',
    'Share your travel itinerary with trusted contacts',
    'Carry copies of important documents',
    'Know the local emergency numbers',
    'Keep your phone charged and carry a power bank',
    'Stay informed about local weather and disaster alerts',
    'Have emergency supplies in your accommodation',
    'Trust your instincts and avoid risky situations'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="text-red-500" size={32} />
            <h1 className="text-4xl font-bold">Emergency Center</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Your safety is our priority. Manage emergency contacts, view disaster alerts, 
            and access emergency services quickly when you need them most.
          </p>
        </div>

        {/* Emergency Mode Button */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Emergency Mode</h2>
              <p className="text-gray-600">
                Instantly notify your emergency contacts and activate emergency protocols
              </p>
            </div>
            <button
              onClick={triggerEmergencyMode}
              disabled={isEmergencyMode}
              className="btn bg-red-600 text-white hover:bg-red-700 btn-lg flex items-center space-x-3"
            >
              <Shield size={24} />
              <span>{isEmergencyMode ? 'Emergency Mode Active' : 'Activate Emergency Mode'}</span>
            </button>
          </div>
          {isEmergencyMode && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-800 font-semibold">🚨 Emergency Mode is currently active</p>
              <p className="text-red-700 text-sm">Your emergency contacts have been notified and your location has been shared.</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div className="lg:col-span-2">
            <EmergencyContactsManager />
          </div>

          {/* Current Location */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="text-blue-500" size={24} />
              <h3 className="text-xl font-bold">Current Location</h3>
            </div>
            {userLocation ? (
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Coordinates</p>
                  <p className="font-mono">{userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Address</p>
                  <p>{userLocation.city}, {userLocation.country}</p>
                </div>
                <button className="btn btn-primary w-full">
                  Share Location with Contacts
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">Location not available</p>
                <button className="btn btn-outline mt-2">Enable Location</button>
              </div>
            )}
          </div>

          {/* Emergency Services */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="text-green-500" size={24} />
              <h3 className="text-xl font-bold">Emergency Services</h3>
            </div>
            <div className="space-y-3">
              {emergencyServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  <button
                    onClick={() => window.location.href = `tel:${service.number}`}
                    className="btn bg-green-500 text-white hover:bg-green-600 btn-sm"
                  >
                    Call {service.number}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Disaster Alerts */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="text-orange-500" size={24} />
              <h3 className="text-xl font-bold">Disaster Alerts</h3>
            </div>
            {activeAlerts.length > 0 ? (
              <div className="space-y-3">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-orange-800">
                        {alert.type.toUpperCase()} - {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-orange-600">{alert.location}</span>
                    </div>
                    <p className="text-sm text-orange-700 mb-2">{alert.message}</p>
                    <div className="text-xs text-orange-600">
                      {new Date(alert.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Bell size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No active alerts</p>
                <p className="text-sm">You'll be notified of any emergency situations</p>
              </div>
            )}
          </div>

          {/* Safety Tips */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="text-purple-500" size={24} />
              <h3 className="text-xl font-bold">Safety Tips</h3>
            </div>
            <div className="space-y-3">
              {safetyTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-purple-600">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
