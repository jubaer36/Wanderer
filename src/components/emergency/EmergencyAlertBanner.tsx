import React from 'react';
import { AlertTriangle, X, Phone, MapPin, Shield, Users } from 'lucide-react';
import { useEmergency, DisasterAlert } from '../../contexts/EmergencyContext';
import { cn } from '../../utils/cn';

export const EmergencyAlertBanner: React.FC = () => {
  const { activeAlerts, dismissAlert, triggerEmergencyMode, isEmergencyMode } = useEmergency();

  if (activeAlerts.length === 0 && !isEmergencyMode) {
    return null;
  }

  const getSeverityColor = (severity: DisasterAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600 border-red-700';
      case 'high':
        return 'bg-orange-500 border-orange-600';
      case 'medium':
        return 'bg-yellow-500 border-yellow-600';
      case 'low':
        return 'bg-blue-500 border-blue-600';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  const getSeverityIcon = (severity: DisasterAlert['severity']) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="text-white animate-pulse" size={24} />;
      default:
        return <AlertTriangle className="text-white" size={24} />;
    }
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40">
      {/* Emergency Mode Banner */}
      {isEmergencyMode && (
        <div className="bg-red-600 text-white p-4 border-b-2 border-red-700">
          <div className="container-custom flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="text-white animate-pulse" size={24} />
              <div>
                <h3 className="font-bold">🚨 EMERGENCY MODE ACTIVE</h3>
                <p className="text-sm">Emergency contacts have been notified. Help is on the way.</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = 'tel:999'}
              className="btn bg-white text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <Phone size={16} />
              <span>Call 999</span>
            </button>
          </div>
        </div>
      )}

      {/* Disaster Alerts */}
      {activeAlerts.map((alert) => (
        <div
          key={alert.id}
          className={cn(
            'text-white p-4 border-b-2',
            getSeverityColor(alert.severity)
          )}
        >
          <div className="container-custom">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-grow">
                {getSeverityIcon(alert.severity)}
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-bold text-lg">
                      {alert.type.toUpperCase()} ALERT - {alert.severity.toUpperCase()}
                    </h3>
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                      {alert.location}
                    </span>
                  </div>
                  <p className="mb-3">{alert.message}</p>
                  
                  {alert.instructions.length > 0 && (
                    <div className="bg-white bg-opacity-10 rounded-lg p-3 mb-3">
                      <h4 className="font-semibold mb-2">Safety Instructions:</h4>
                      <ul className="text-sm space-y-1">
                        {alert.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-white">•</span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={triggerEmergencyMode}
                      className="btn bg-white text-red-600 hover:bg-red-50 btn-sm flex items-center space-x-1"
                    >
                      <Shield size={14} />
                      <span>Emergency Mode</span>
                    </button>
                    <button
                      onClick={() => window.location.href = 'tel:999'}
                      className="btn bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 btn-sm flex items-center space-x-1"
                    >
                      <Phone size={14} />
                      <span>Call Emergency</span>
                    </button>
                    <button className="btn bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 btn-sm flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>Share Location</span>
                    </button>
                    <button className="btn bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 btn-sm flex items-center space-x-1">
                      <Users size={14} />
                      <span>Alert Contacts</span>
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="ml-4 p-1 hover:bg-white hover:bg-opacity-20 rounded"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
