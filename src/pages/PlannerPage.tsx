import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Wallet, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';

export const PlannerPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Preferences' },
    { number: 3, title: 'Activities' },
    { number: 4, title: 'Review' }
  ];

  const suggestedActivities = [
    "Visit Historical Sites",
    "Local Food Tour",
    "Nature Hiking",
    "Beach Activities",
    "Cultural Workshops",
    "Adventure Sports",
    "Shopping Tours",
    "Nightlife Experience"
  ];

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors',
                      currentStep >= step.number
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    )}
                  >
                    {step.number}
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-600">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-1 mx-4',
                      currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-card p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Tell us about your trip</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Where do you want to go?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="e.g., Cox's Bazar, Sylhet, Sundarbans"
                      className="input pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        className="input pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <select className="input pl-10">
                        <option>Select duration</option>
                        <option>3-5 days</option>
                        <option>1 week</option>
                        <option>2 weeks</option>
                        <option>More than 2 weeks</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Travelers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        min="1"
                        placeholder="Number of travelers"
                        className="input pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range
                    </label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <select className="input pl-10">
                        <option>Select budget range</option>
                        <option>Budget (৳5,000-15,000)</option>
                        <option>Moderate (৳15,000-35,000)</option>
                        <option>Luxury (৳35,000+)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Travel Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Travel Style
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Relaxed', 'Balanced', 'Active'].map(style => (
                      <button
                        key={style}
                        className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-500 focus:border-primary-500 focus:outline-none"
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Interests
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Culture & History',
                      'Nature & Outdoors',
                      'Food & Cuisine',
                      'Adventure',
                      'Relaxation',
                      'Shopping',
                      'Photography',
                      'Nightlife',
                      'Local Experiences'
                    ].map(interest => (
                      <button
                        key={interest}
                        className="border-2 border-gray-200 rounded-lg p-3 text-sm hover:border-primary-500 focus:border-primary-500 focus:outline-none"
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Accommodation Preference
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Hotel', 'Resort', 'Apartment', 'Hostel', 'Unique Stays'].map(accom => (
                      <button
                        key={accom}
                        className="border-2 border-gray-200 rounded-lg p-3 hover:border-primary-500 focus:border-primary-500 focus:outline-none"
                      >
                        {accom}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Choose Activities</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestedActivities.map(activity => (
                    <button
                      key={activity}
                      onClick={() => handleActivityToggle(activity)}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-lg border-2 transition-colors',
                        selectedActivities.includes(activity)
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      )}
                    >
                      <span>{activity}</span>
                      {selectedActivities.includes(activity) ? (
                        <Trash2 size={20} className="text-primary-600" />
                      ) : (
                        <Plus size={20} className="text-gray-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Review Your Plan</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Trip Summary</h3>
                  {/* Add summary content here */}
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Selected Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedActivities.map(activity => (
                      <span
                        key={activity}
                        className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className="btn btn-outline"
              disabled={currentStep === 1}
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
              className="btn btn-primary"
            >
              {currentStep === 4 ? (
                'Generate Plan'
              ) : (
                <>
                  Next
                  <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};