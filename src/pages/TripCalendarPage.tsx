import React from 'react';
import { Calendar, Clock, MapPin, Users, Plus } from 'lucide-react';

export const TripCalendarPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Trip Calendar</h1>
        <p className="text-gray-600">Manage your travel schedule and upcoming adventures</p>
      </div>
      
      <div className="text-center py-12">
        <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your Travel Calendar</h3>
        <p className="text-gray-600 mb-6">Keep track of all your trips and travel plans in one place.</p>
        <button className="btn btn-primary">
          <Plus size={18} className="mr-2" />
          Add Trip
        </button>
      </div>
    </div>
  );
};
