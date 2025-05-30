import React, { useState } from 'react';
import { AlertTriangle, X, Phone, MapPin, Shield } from 'lucide-react';
import { useEmergency, DisasterAlert } from '../../contexts/EmergencyContext';
import { cn } from '../../utils/cn';

export const EmergencyNotification: React.FC = () => {
  const { activeAlerts, dismissAlert, triggerEmergencyMode, isEmergencyMode } = useEmergency();
  const [isExpanded, setIsExpanded] = useState(false);

  if (activeAlerts.length === 0 && !isEmergencyMode) {
    return null;
  }

  const getMostSevereAlert = () => {
    if (activeAlerts.length === 0) return null;
    return activeAlerts.reduce((most, current) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return severityOrder[current.severity] > severityOrder[most.severity] ? current : most;
    });
  };

  const mostSevereAlert = getMostSevereAlert();

  const getSeverityColor = (severity: DisasterAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600 border-red-700 text-white';
      case 'high':
        return 'bg-orange-500 border-orange-600 text-white';
      case 'medium':
        return 'bg-yellow-500 border-yellow-600 text-white';
      case 'low':
        return 'bg-blue-500 border-blue-600 text-white';
      default:
        return 'bg-gray-500 border-gray-600 text-white';
    }
  };

  return (
    <div className="relative">
      {/* Emergency Notification Icon */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'relative p-2 rounded-full transition-all duration-200 hover:scale-110',
          isEmergencyMode 
            ? 'bg-red-600 text-white animate-pulse' 
            : mostSevereAlert 
              ? getSeverityColor(mostSevereAlert.severity)
              : 'bg-red-600 text-white'
        )}
      >
        {isEmergencyMode ? (
          <Shield size={20} className="animate-pulse" />
        ) : (
          <AlertTriangle size={20} className={mostSevereAlert?.severity === 'critical' ? 'animate-pulse' : ''} />
        )}
        
        {/* Notification Badge */}
        {activeAlerts.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {activeAlerts.length}
          </span>
        )}
      </button>

      {/* Expanded Notification Panel */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {/* Emergency Mode Status */}
          {isEmergencyMode && (
            <div className="bg-red-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="animate-pulse" size={20} />
                  <div>
                    <h3 className="font-bold text-sm">🚨 EMERGENCY MODE ACTIVE</h3>
                    <p className="text-xs opacity-90">Emergency contacts notified</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    triggerEmergencyMode();
                    setIsExpanded(false);
                  }}
                  className="p-1 hover:bg-red-700 rounded"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex space-x-2 mt-3">
                <button className="flex items-center space-x-1 bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-xs">
                  <Phone size={12} />
                  <span>Call 911</span>
                </button>
                <button className="flex items-center space-x-1 bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-xs">
                  <MapPin size={12} />
                  <span>Share Location</span>
                </button>
              </div>
            </div>
          )}

          {/* Active Alerts */}
          {activeAlerts.length > 0 && (
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Active Alerts</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {activeAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      'p-3 rounded-lg border-l-4',
                      alert.severity === 'critical' && 'bg-red-50 border-red-500',
                      alert.severity === 'high' && 'bg-orange-50 border-orange-500',
                      alert.severity === 'medium' && 'bg-yellow-50 border-yellow-500',
                      alert.severity === 'low' && 'bg-blue-50 border-blue-500'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <AlertTriangle 
                            size={16} 
                            className={cn(
                              alert.severity === 'critical' && 'text-red-600',
                              alert.severity === 'high' && 'text-orange-600',
                              alert.severity === 'medium' && 'text-yellow-600',
                              alert.severity === 'low' && 'text-blue-600'
                            )}
                          />
                          <span className="font-medium text-gray-900 text-sm">{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert</span>
                        </div>
                        <p className="text-gray-700 text-xs mb-2">{alert.message}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <MapPin size={12} />
                            <span>{alert.location}</span>
                          </span>
                          <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="p-1 hover:bg-gray-200 rounded ml-2"
                      >
                        <X size={14} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Actions */}
          <div className="border-t border-gray-200 p-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  triggerEmergencyMode();
                  setIsExpanded(false);
                }}
                className="btn btn-danger btn-sm text-xs"
                disabled={isEmergencyMode}
              >
                {isEmergencyMode ? 'Active' : 'Emergency'}
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="btn btn-outline btn-sm text-xs"
              >
                View All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop to close panel */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};
