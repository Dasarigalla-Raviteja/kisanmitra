import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Camera,
  User,
  Phone, 
  MapPin, 
  Calendar,
  Globe,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'Ramu Ji',
    phone: '+91 98765 43210',
    email: 'ramu@example.com',
    birthDate: '1985-03-15',
    location: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    language: 'English'
  });

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('kisanmitra_user', JSON.stringify(userData));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    });
    
    navigate('/profile');
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <div className="mobile-header bg-white">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-agri-light rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-agri-accent" />
          </button>
          <h1 className="text-xl font-bold text-agri-accent">Edit Profile</h1>
        </div>
        
        <Button 
          onClick={handleSave}
          className="bg-agri-primary hover:bg-agri-secondary text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>

      <div className="mobile-content space-y-6 pt-4">
        {/* Profile Photo */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="text-center">
            <div className="w-20 h-20 bg-agri-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              RJ
            </div>
            <Button variant="outline" className="border-agri-primary text-agri-primary">
              <Camera className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex items-center space-x-2 mb-6">
            <User className="w-5 h-5 text-agri-primary" />
            <h3 className="text-lg font-bold text-agri-accent">Personal Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-agri-accent font-medium">Full Name</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-2 border-agri-primary/20 focus:border-agri-primary"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-agri-accent font-medium">Phone Number</Label>
              <Input
                id="phone"
                value={userData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-2 border-agri-primary/20 focus:border-agri-primary"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-agri-accent font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-2 border-agri-primary/20 focus:border-agri-primary"
              />
            </div>

            <div>
              <Label htmlFor="birthDate" className="text-agri-accent font-medium">Date of Birth</Label>
              <Input
                id="birthDate"
                type="date"
                value={userData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                className="mt-2 border-agri-primary/20 focus:border-agri-primary"
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex items-center space-x-2 mb-6">
            <MapPin className="w-5 h-5 text-agri-primary" />
            <h3 className="text-lg font-bold text-agri-accent">Location Details</h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="location" className="text-agri-accent font-medium">City</Label>
              <Input
                id="location"
                value={userData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="mt-2 border-agri-primary/20 focus:border-agri-primary"
              />
            </div>

            <div>
              <Label htmlFor="state" className="text-agri-accent font-medium">State</Label>
              <Select value={userData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger className="mt-2 border-agri-primary/20 focus:border-agri-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Telangana">Telangana</SelectItem>
                  <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="Bihar">Bihar</SelectItem>
                  <SelectItem value="West Bengal">West Bengal</SelectItem>
                  <SelectItem value="Odisha">Odisha</SelectItem>
                  <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                  <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                  <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                  <SelectItem value="Assam">Assam</SelectItem>
                  <SelectItem value="Punjab">Punjab</SelectItem>
                  <SelectItem value="Haryana">Haryana</SelectItem>
                  <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                  <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="pincode" className="text-agri-accent font-medium">PIN Code</Label>
              <Input
                id="pincode"
                value={userData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className="mt-2 border-agri-primary/20 focus:border-agri-primary"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex items-center space-x-2 mb-6">
            <Globe className="w-5 h-5 text-agri-primary" />
            <h3 className="text-lg font-bold text-agri-accent">Preferences</h3>
          </div>

          <div>
            <Label htmlFor="language" className="text-agri-accent font-medium">Preferred Language</Label>
            <Select value={userData.language} onValueChange={(value) => handleInputChange('language', value)}>
              <SelectTrigger className="mt-2 border-agri-primary/20 focus:border-agri-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">🇮🇳 English</SelectItem>
                <SelectItem value="Hindi">🇮🇳 हिंदी (Hindi)</SelectItem>
                <SelectItem value="Telugu">🇮🇳 తెలుగు (Telugu)</SelectItem>
                <SelectItem value="Tamil">🇮🇳 தமிழ் (Tamil)</SelectItem>
                <SelectItem value="Kannada">🇮🇳 ಕನ್ನಡ (Kannada)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Save Button */}
        <div className="pb-8">
          <Button 
            onClick={handleSave}
            className="w-full bg-agri-primary hover:bg-agri-secondary text-white h-12 text-lg font-semibold"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;