import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import ProfilePicture from '../common/ProfilePicture';

const Settings = () => {
  const [settings, setSettings] = useState({
    email: 'employee@company.com',
    contactNumber: '09171234567',
    bankNumber: '1234567890',
    notifications: true,
    language: 'english'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (imageData) => {
    setProfileImage(imageData);
    // Will be saved when clicking Save Settings
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would save both settings and profile image to database
      console.log('Settings saved:', settings);
      console.log('Profile image updated');
      
      setSaveStatus({ type: 'success', message: 'Settings saved successfully!' });
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Failed to save settings.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {saveStatus && (
        <div className={`mb-4 p-3 rounded-lg ${
          saveStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {saveStatus.message}
        </div>
      )}

      {/* Profile Picture Section */}
      <div className="mb-8 pb-6 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Picture</h3>
        <div className="flex items-center gap-6">
          <ProfilePicture 
            size="3xl" 
            editable={true}
            onImageChange={handleImageChange}
          />
          <div className="text-gray-300 text-sm">
            <p>Click the edit button on the profile picture to upload a new image.</p>
            <p className="text-gray-400 mt-1">You can adjust the position and zoom of your photo.</p>
          </div>
        </div>
      </div>

      {/* Rest of the settings form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={settings.contactNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Bank Account Number
          </label>
          <input
            type="text"
            name="bankNumber"
            value={settings.bankNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red text-white"
          />
          <p className="text-xs text-gray-500 mt-1">For payroll purposes</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Language Preference
          </label>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-retail-red text-white"
          >
            <option value="english">English</option>
            <option value="filipino">Filipino</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            className="h-4 w-4 text-retail-red focus:ring-retail-red border-gray-700 rounded bg-gray-800"
          />
          <label className="text-sm text-gray-300">
            Enable email notifications for request updates
          </label>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Settings;