import React, { useState } from 'react';
import { Phone, Plus, Trash2, Edit, Check, X, Shield, User } from 'lucide-react';
import { useEmergency, EmergencyContact } from '../../contexts/EmergencyContext';
import { cn } from '../../utils/cn';

export const EmergencyContactsManager: React.FC = () => {
  const { 
    emergencyContacts, 
    addEmergencyContact, 
    removeEmergencyContact, 
    updateEmergencyContact,
    triggerEmergencyMode 
  } = useEmergency();
  
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState<string | null>(null);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    isPrimary: false
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      addEmergencyContact(newContact);
      setNewContact({ name: '', phone: '', email: '', relationship: '', isPrimary: false });
      setIsAddingContact(false);
    }
  };

  const handleUpdateContact = (id: string, updates: Partial<EmergencyContact>) => {
    updateEmergencyContact(id, updates);
    setEditingContact(null);
  };

  const callContact = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="text-red-500" size={24} />
          <h3 className="text-xl font-bold">Emergency Contacts</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={triggerEmergencyMode}
            className="btn bg-red-600 text-white hover:bg-red-700 btn-sm flex items-center space-x-2"
          >
            <Shield size={16} />
            <span>Emergency Mode</span>
          </button>
          <button
            onClick={() => setIsAddingContact(true)}
            className="btn btn-primary btn-sm flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Add New Contact Form */}
      {isAddingContact && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-3">Add New Emergency Contact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name *"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              className="input"
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              className="input"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              className="input"
            />
            <select
              value={newContact.relationship}
              onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              className="input"
            >
              <option value="">Select Relationship</option>
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Colleague">Colleague</option>
              <option value="Emergency Services">Emergency Services</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              id="isPrimary"
              checked={newContact.isPrimary}
              onChange={(e) => setNewContact({ ...newContact, isPrimary: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="isPrimary" className="text-sm">
              Primary contact (will be notified first in emergencies)
            </label>
          </div>
          <div className="flex space-x-2">
            <button onClick={handleAddContact} className="btn btn-primary btn-sm">
              Add Contact
            </button>
            <button
              onClick={() => setIsAddingContact(false)}
              className="btn btn-outline btn-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Emergency Contacts List */}
      <div className="space-y-3">
        {emergencyContacts.map((contact) => (
          <div
            key={contact.id}
            className={cn(
              'border rounded-lg p-4 transition-colors',
              contact.isPrimary ? 'border-red-200 bg-red-50' : 'border-gray-200'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  contact.isPrimary ? 'bg-red-100' : 'bg-gray-100'
                )}>
                  <User size={20} className={contact.isPrimary ? 'text-red-600' : 'text-gray-600'} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{contact.name}</h4>
                    {contact.isPrimary && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                  {contact.email && (
                    <p className="text-sm text-gray-500">{contact.email}</p>
                  )}
                  {contact.relationship && (
                    <p className="text-xs text-gray-500">{contact.relationship}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => callContact(contact.phone)}
                  className="btn bg-green-500 text-white hover:bg-green-600 btn-sm flex items-center space-x-1"
                >
                  <Phone size={14} />
                  <span>Call</span>
                </button>
                <button
                  onClick={() => setEditingContact(contact.id)}
                  className="btn btn-outline btn-sm"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => removeEmergencyContact(contact.id)}
                  className="btn bg-red-500 text-white hover:bg-red-600 btn-sm"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {emergencyContacts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Shield size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No emergency contacts added yet.</p>
            <p className="text-sm">Add contacts to be notified in case of emergency.</p>
          </div>
        )}
      </div>

      {/* Emergency Instructions */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Emergency Mode Instructions</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Click "Emergency Mode" to instantly notify all primary contacts</li>
          <li>• Your current location will be shared automatically</li>
          <li>• Emergency services numbers will be readily available</li>
          <li>• Keep your contacts updated and test the system regularly</li>
        </ul>
      </div>
    </div>
  );
};
