import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Wallet, ArrowRight, Plus, Trash2, Loader, Phone, Mail, Edit, Check, Star, DollarSign, Shield, AlertTriangle } from 'lucide-react';
import { cn } from '../utils/cn';

export const PlannerPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiGenerationProgress, setAiGenerationProgress] = useState(0);
  const [showGeneratedPlan, setShowGeneratedPlan] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [totalBudget, setTotalBudget] = useState(25000);
  const [tripDays, setTripDays] = useState(5);

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Preferences' },
    { number: 3, title: 'Activities' },
    { number: 4, title: 'Safety Planning' },
    { number: 5, title: 'AI Planning' }
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

  const simulateAiGeneration = () => {
    setIsAiGenerating(true);
    setCurrentStep(5);
    
    // Simulate AI progress
    const progressSteps = [20, 40, 60, 80, 100];
    let currentProgress = 0;
    
    const progressInterval = setInterval(() => {
      if (currentProgress < progressSteps.length - 1) {
        currentProgress++;
        setAiGenerationProgress(progressSteps[currentProgress]);
      } else {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsAiGenerating(false);
          setShowGeneratedPlan(true);
          generatePlan();
        }, 1000);
      }
    }, 800);
  };

  const generatePlan = () => {
    const samplePlan = {
      hotels: [
        {
          id: 1,
          name: "Cox's Bazar Sea Palace Hotel",
          rating: 4.5,
          price: 4500,
          location: "Cox's Bazar Beach",
          image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
          contact: { phone: "+88 01700-123456", email: "info@seapalace.com.bd" },
          amenities: ["Free WiFi", "Pool", "Beach Access", "Restaurant"]
        },
        {
          id: 2,
          name: "Sylhet Hills Resort",
          rating: 4.2,
          price: 3800,
          location: "Sylhet Tea Gardens",
          image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
          contact: { phone: "+88 01800-234567", email: "booking@sylhethills.com.bd" },
          amenities: ["Mountain View", "Tea Garden Tours", "Spa", "Local Cuisine"]
        }
      ],
      vendors: [
        {
          id: 1,
          name: "Bengal Travels & Tours",
          service: "Local Transportation",
          rating: 4.7,
          price: 2500,
          contact: { phone: "+88 01900-345678", email: "info@bengaltravels.com" },
          description: "Reliable transportation services across Bangladesh"
        },
        {
          id: 2,
          name: "Heritage Food Tours",
          service: "Cultural Food Experience",
          rating: 4.8,
          price: 1200,
          contact: { phone: "+88 01600-456789", email: "taste@heritagefood.bd" },
          description: "Authentic Bengali cuisine tours and cooking classes"
        }
      ],
      tourGuides: [
        {
          id: 1,
          name: "Rahman Ahmed",
          expertise: "Cultural Heritage",
          rating: 4.9,
          price: 1500,
          languages: ["Bengali", "English", "Hindi"],
          contact: { phone: "+88 01500-567890", email: "rahman.guide@gmail.com" },
          experience: "8 years guiding experience in historical sites"
        },
        {
          id: 2,
          name: "Fatima Khatun",
          expertise: "Nature & Wildlife",
          rating: 4.6,
          price: 1800,
          languages: ["Bengali", "English"],
          contact: { phone: "+88 01400-678901", email: "fatima.nature@outlook.com" },
          experience: "Specialized in Sundarbans and hill tract tours"
        }
      ],
      itinerary: [
        { day: 1, activities: ["Arrival at Cox's Bazar", "Beach walk", "Local seafood dinner"], budget: 3500 },
        { day: 2, activities: ["Sunrise viewing", "Inani Beach visit", "Cultural show"], budget: 4200 },
        { day: 3, activities: ["Travel to Sylhet", "Tea garden tour", "Local market visit"], budget: 5800 },
        { day: 4, activities: ["Ratargul Swamp Forest", "Jaflong visit", "Traditional lunch"], budget: 4500 },
        { day: 5, activities: ["Return journey", "Airport transfer"], budget: 2000 }
      ]
    };
    setGeneratedPlan(samplePlan);
    
    // Calculate total budget
    const hotelCosts = samplePlan.hotels.reduce((sum, hotel) => sum + hotel.price, 0);
    const vendorCosts = samplePlan.vendors.reduce((sum, vendor) => sum + vendor.price, 0);
    const guideCosts = samplePlan.tourGuides.reduce((sum, guide) => sum + guide.price, 0);
    const activityCosts = samplePlan.itinerary.reduce((sum, day) => sum + day.budget, 0);
    
    setTotalBudget(hotelCosts + vendorCosts + guideCosts + activityCosts);
    setTripDays(samplePlan.itinerary.length);
  };

  const updateItemPrice = (category: string, itemId: number, newPrice: number) => {
    if (!generatedPlan) return;
    
    const updatedPlan = { ...generatedPlan };
    if (category === 'hotels') {
      const item = updatedPlan.hotels.find((h: any) => h.id === itemId);
      if (item) item.price = newPrice;
    } else if (category === 'vendors') {
      const item = updatedPlan.vendors.find((v: any) => v.id === itemId);
      if (item) item.price = newPrice;
    } else if (category === 'tourGuides') {
      const item = updatedPlan.tourGuides.find((g: any) => g.id === itemId);
      if (item) item.price = newPrice;
    }
    
    setGeneratedPlan(updatedPlan);
    
    // Recalculate total budget
    const hotelCosts = updatedPlan.hotels.reduce((sum: number, hotel: any) => sum + hotel.price, 0);
    const vendorCosts = updatedPlan.vendors.reduce((sum: number, vendor: any) => sum + vendor.price, 0);
    const guideCosts = updatedPlan.tourGuides.reduce((sum: number, guide: any) => sum + guide.price, 0);
    const activityCosts = updatedPlan.itinerary.reduce((sum: number, day: any) => sum + day.budget, 0);
    
    setTotalBudget(hotelCosts + vendorCosts + guideCosts + activityCosts);
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
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
                <Shield className="text-red-500" size={28} />
                <span>Safety Planning</span>
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Emergency Contacts */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center space-x-2">
                    <Phone className="text-green-500" size={20} />
                    <span>Emergency Contacts</span>
                  </h3>
                  <div className="space-y-3 mb-4">
                    <input
                      type="text"
                      placeholder="Primary contact name"
                      className="input"
                    />
                    <input
                      type="tel"
                      placeholder="Primary contact phone"
                      className="input"
                    />
                    <input
                      type="email"
                      placeholder="Primary contact email"
                      className="input"
                    />
                  </div>
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                    <p>💡 This contact will be notified in case of emergency during your trip</p>
                  </div>
                </div>

                {/* Travel Insurance */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center space-x-2">
                    <Shield className="text-blue-500" size={20} />
                    <span>Travel Insurance</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="insurance" className="rounded" />
                      <label htmlFor="insurance" className="text-sm">I have travel insurance</label>
                    </div>
                    <input
                      type="text"
                      placeholder="Insurance provider"
                      className="input"
                    />
                    <input
                      type="text"
                      placeholder="Policy number"
                      className="input"
                    />
                  </div>
                  <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded mt-3">
                    <p>⚠️ Travel insurance is recommended for all international and domestic trips</p>
                  </div>
                </div>

                {/* Health Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center space-x-2">
                    <AlertTriangle className="text-orange-500" size={20} />
                    <span>Health & Medical</span>
                  </h3>
                  <div className="space-y-3">
                    <textarea
                      placeholder="Medical conditions, allergies, medications..."
                      className="input min-h-[80px]"
                    />
                    <input
                      type="text"
                      placeholder="Blood type (optional)"
                      className="input"
                    />
                    <input
                      type="text"
                      placeholder="Doctor/Emergency contact"
                      className="input"
                    />
                  </div>
                </div>

                {/* Safety Checklist */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center space-x-2">
                    <Check className="text-green-500" size={20} />
                    <span>Safety Checklist</span>
                  </h3>
                  <div className="space-y-2">
                    {[
                      'Copy important documents (passport, ID)',
                      'Register with local embassy/consulate',
                      'Research local emergency numbers',
                      'Share itinerary with family/friends',
                      'Check weather and disaster alerts',
                      'Download offline maps',
                      'Prepare emergency kit',
                      'Know local customs and laws'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Emergency Numbers for Bangladesh</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Emergency: </span>
                    <a href="tel:999" className="text-red-600 hover:underline">999</a>
                  </div>
                  <div>
                    <span className="font-medium">Police: </span>
                    <a href="tel:100" className="text-red-600 hover:underline">100</a>
                  </div>
                  <div>
                    <span className="font-medium">Fire Service: </span>
                    <a href="tel:9555555" className="text-red-600 hover:underline">9555555</a>
                  </div>
                  <div>
                    <span className="font-medium">Ambulance: </span>
                    <a href="tel:199" className="text-red-600 hover:underline">199</a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && !showGeneratedPlan && !isAiGenerating && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Review Your Plan</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Trip Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Destination:</span> Cox's Bazar & Sylhet
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> 5 Days
                    </div>
                    <div>
                      <span className="font-medium">Travelers:</span> 2 People
                    </div>
                    <div>
                      <span className="font-medium">Budget:</span> ৳15,000-35,000
                    </div>
                  </div>
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

          {currentStep === 4 && isAiGenerating && (
            <div className="space-y-6 text-center py-12">
              <div className="flex justify-center">
                <Loader className="animate-spin text-primary-600" size={48} />
              </div>
              <h2 className="text-2xl font-bold">AI is crafting your perfect trip...</h2>
              <p className="text-gray-600">
                Our AI is analyzing your preferences and finding the best hotels, guides, and experiences for you.
              </p>
              <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${aiGenerationProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                {aiGenerationProgress < 40 && "Analyzing your preferences..."}
                {aiGenerationProgress >= 40 && aiGenerationProgress < 80 && "Finding best accommodations..."}
                {aiGenerationProgress >= 80 && "Finalizing your itinerary..."}
              </p>
            </div>
          )}

          {currentStep === 4 && showGeneratedPlan && generatedPlan && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your AI-Generated Travel Plan</h2>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Budget</p>
                  <p className="text-2xl font-bold text-primary-600">৳{totalBudget.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{tripDays} Days</p>
                </div>
              </div>

              {/* Hotels Section */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <MapPin className="mr-2 text-primary-600" size={20} />
                  Recommended Hotels
                </h3>
                <div className="grid gap-4">
                  {generatedPlan.hotels.map((hotel: any) => (
                    <div key={hotel.id} className="border rounded-lg p-4 flex gap-4">
                      <img src={hotel.image} alt={hotel.name} className="w-24 h-24 object-cover rounded-lg" />
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold">{hotel.name}</h4>
                          <div className="flex items-center">
                            <Star className="text-yellow-400 mr-1" size={16} />
                            <span>{hotel.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {hotel.amenities.map((amenity: string, idx: number) => (
                            <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {amenity}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4 text-sm">
                            <a href={`tel:${hotel.contact.phone}`} className="flex items-center text-primary-600">
                              <Phone size={14} className="mr-1" />
                              Call
                            </a>
                            <a href={`mailto:${hotel.contact.email}`} className="flex items-center text-primary-600">
                              <Mail size={14} className="mr-1" />
                              Email
                            </a>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="number"
                              value={hotel.price}
                              onChange={(e) => updateItemPrice('hotels', hotel.id, parseInt(e.target.value))}
                              className="w-20 px-2 py-1 border rounded text-right text-sm"
                            />
                            <span className="ml-1 text-sm">৳/night</span>
                            <Edit className="ml-2 text-gray-400" size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vendors Section */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Users className="mr-2 text-primary-600" size={20} />
                  Service Vendors
                </h3>
                <div className="grid gap-4">
                  {generatedPlan.vendors.map((vendor: any) => (
                    <div key={vendor.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold">{vendor.name}</h4>
                          <p className="text-primary-600 text-sm">{vendor.service}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="text-yellow-400 mr-1" size={16} />
                          <span>{vendor.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{vendor.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-sm">
                          <a href={`tel:${vendor.contact.phone}`} className="flex items-center text-primary-600">
                            <Phone size={14} className="mr-1" />
                            Call
                          </a>
                          <a href={`mailto:${vendor.contact.email}`} className="flex items-center text-primary-600">
                            <Mail size={14} className="mr-1" />
                            Email
                          </a>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={vendor.price}
                            onChange={(e) => updateItemPrice('vendors', vendor.id, parseInt(e.target.value))}
                            className="w-20 px-2 py-1 border rounded text-right text-sm"
                          />
                          <span className="ml-1 text-sm">৳</span>
                          <Edit className="ml-2 text-gray-400" size={16} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tour Guides Section */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Users className="mr-2 text-primary-600" size={20} />
                  Tour Guides
                </h3>
                <div className="grid gap-4">
                  {generatedPlan.tourGuides.map((guide: any) => (
                    <div key={guide.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold">{guide.name}</h4>
                          <p className="text-primary-600 text-sm">{guide.expertise}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="text-yellow-400 mr-1" size={16} />
                          <span>{guide.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{guide.experience}</p>
                      <p className="text-sm mb-3">
                        <span className="font-medium">Languages:</span> {guide.languages.join(', ')}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-sm">
                          <a href={`tel:${guide.contact.phone}`} className="flex items-center text-primary-600">
                            <Phone size={14} className="mr-1" />
                            Call
                          </a>
                          <a href={`mailto:${guide.contact.email}`} className="flex items-center text-primary-600">
                            <Mail size={14} className="mr-1" />
                            Email
                          </a>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={guide.price}
                            onChange={(e) => updateItemPrice('tourGuides', guide.id, parseInt(e.target.value))}
                            className="w-20 px-2 py-1 border rounded text-right text-sm"
                          />
                          <span className="ml-1 text-sm">৳/day</span>
                          <Edit className="ml-2 text-gray-400" size={16} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary Section */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Calendar className="mr-2 text-primary-600" size={20} />
                  Daily Itinerary
                </h3>
                <div className="space-y-4">
                  {generatedPlan.itinerary.map((day: any) => (
                    <div key={day.day} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold">Day {day.day}</h4>
                        <div className="flex items-center">
                          <DollarSign className="text-gray-400 mr-1" size={16} />
                          <span className="font-medium">৳{day.budget.toLocaleString()}</span>
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {day.activities.map((activity: string, idx: number) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-center">
                            <Check className="text-green-500 mr-2" size={16} />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary-800 mb-2">Ready to book your trip?</h3>
                <p className="text-primary-600 mb-4">Your personalized itinerary is ready. You can make final adjustments or proceed with booking.</p>
                <div className="flex gap-4">
                  <button className="btn btn-primary">
                    Book Now
                  </button>
                  <button className="btn btn-outline">
                    Save for Later
                  </button>
                  <button className="btn btn-outline">
                    Share Plan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className="btn btn-outline"
              disabled={currentStep === 1 || isAiGenerating}
            >
              Back
            </button>
            <button
              onClick={() => {
                if (currentStep === 3) {
                  simulateAiGeneration();
                } else {
                  setCurrentStep(prev => Math.min(4, prev + 1));
                }
              }}
              className="btn btn-primary"
              disabled={isAiGenerating}
            >
              {currentStep === 3 ? (
                isAiGenerating ? (
                  <>
                    <Loader className="animate-spin mr-2" size={20} />
                    Generating...
                  </>
                ) : (
                  'Generate AI Plan'
                )
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