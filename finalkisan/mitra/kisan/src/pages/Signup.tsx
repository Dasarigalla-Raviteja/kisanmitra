import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, User, Phone, MapPin, Lock, Sprout } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from '@/components/LanguageSwitcher';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    state: "",
    district: "",
    pin: "",
    confirmPin: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    if (field === "name") {
      // Only allow alphabets and spaces
      value = value.replace(/[^A-Za-z\s]/g, "");
    }
    if (field === "mobile") {
      // Only allow digits, max 10
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    if ((field === "pin" || field === "confirmPin") && value.length > 4) {
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.name.trim() !== "" &&
           formData.mobile.length === 10 &&
           formData.state !== "" &&
           formData.district.trim() !== "" &&
           formData.pin.length === 4 &&
           formData.confirmPin.length === 4 &&
           formData.pin === formData.confirmPin;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.pin !== formData.confirmPin) {
      toast({
        title: "PIN Mismatch",
        description: "PIN and Confirm PIN must match",
        variant: "destructive"
      });
      return;
    }
    
    if (!isFormValid()) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store comprehensive user data
      const userData = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        mobile: formData.mobile,
        phone: `+91 ${formData.mobile}`,
        state: formData.state,
        district: formData.district,
        location: formData.district,
        pin: formData.pin,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        farmSize: '2.5 acres',
        experience: '5 years',
        avatar: null,
        isLoggedIn: true,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('kisanmitra_user', JSON.stringify(userData));
      localStorage.setItem('kisanmitra_auth_token', btoa(`${formData.mobile}:${formData.pin}`));
      
      toast({
        title: "Account Created! 🎉",
        description: `Welcome to KisanMitra, ${formData.name}!`,
      });
      
      navigate("/home");
      
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-br from-agri-light to-white overflow-y-auto">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-agri-primary rounded-xl flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-agri-primary">KisanMitra</h1>
              <p className="text-xs text-agri-gray">Smart Farming Assistant</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Header */}
        <div className="text-center px-6 pt-4 pb-6">
          <div className="w-20 h-20 bg-agri-primary rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Sprout className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-agri-primary mb-2">
            🌱 Join 50,000+ Smart Farmers
          </h1>
          <p className="text-lg text-agri-gray">
            Create your farming account
          </p>
        </div>

          {/* Form */}
          <div className="flex-1 px-6">
            <div className="bg-white rounded-3xl p-6 shadow-large border border-agri-primary/10">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-lg font-bold text-agri-primary flex items-center">
                    <User className="w-6 h-6 mr-3" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name (alphabets only)"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="h-16 text-xl rounded-2xl border-2 border-agri-primary/30 focus:border-agri-primary bg-agri-light/30 font-semibold"
                  />
                </div>

                {/* Mobile Field */}
                <div className="space-y-2">
                  <label className="text-lg font-bold text-agri-primary flex items-center">
                    <Phone className="w-6 h-6 mr-3" />
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-agri-light rounded-lg px-3 py-2">
                      <span className="text-agri-primary font-bold text-lg">🇮🇳 +91</span>
                    </div>
                    <Input
                      type="tel"
                      placeholder="10 digits only"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value)}
                      maxLength={10}
                      className="pl-24 h-16 text-xl rounded-2xl border-2 border-agri-primary/30 focus:border-agri-primary bg-agri-light/30 font-bold text-center tracking-wider"
                    />
                  </div>
                </div>

                {/* State Field */}
                <div className="space-y-2">
                  <label className="text-lg font-bold text-agri-primary flex items-center">
                    <MapPin className="w-6 h-6 mr-3" />
                    State
                  </label>
                  <Select onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger className="h-16 text-xl rounded-2xl border-2 border-agri-primary/30 focus:border-agri-primary bg-agri-light/30 font-semibold">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-agri-primary/20 shadow-large rounded-lg max-h-48">
                      {indianStates.map((state) => (
                        <SelectItem 
                          key={state} 
                          value={state}
                          className="text-lg py-3 px-4 hover:bg-agri-light"
                        >
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* District Field */}
                <div className="space-y-2">
                  <label className="text-lg font-bold text-agri-primary flex items-center">
                    <MapPin className="w-6 h-6 mr-3" />
                    District
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your district name"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    className="h-16 text-xl rounded-2xl border-2 border-agri-primary/30 focus:border-agri-primary bg-agri-light/30 font-semibold"
                  />
                </div>

                {/* PIN Fields */}
                <div className="grid grid-cols-1 gap-4">
                  {/* PIN */}
                  <div className="space-y-2">
                    <label className="text-lg font-bold text-agri-primary flex items-center">
                      <Lock className="w-6 h-6 mr-3" />
                      4-Digit PIN
                    </label>
                    <div className="relative">
                      <Input
                        type={showPin ? "text" : "password"}
                        placeholder="Create PIN"
                        value={formData.pin}
                        onChange={(e) => handleInputChange("pin", e.target.value)}
                        maxLength={4}
                        className="pr-16 h-16 text-2xl rounded-2xl border-2 border-agri-primary/30 focus:border-agri-primary bg-agri-light/30 font-bold text-center tracking-[0.8em]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2"
                      >
                        {showPin ? (
                          <EyeOff className="w-6 h-6 text-agri-primary" />
                        ) : (
                          <Eye className="w-6 h-6 text-agri-primary" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm PIN */}
                  <div className="space-y-2">
                    <label className="text-lg font-bold text-agri-primary flex items-center">
                      <Lock className="w-6 h-6 mr-3" />
                      Confirm PIN
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPin ? "text" : "password"}
                        placeholder="Confirm PIN"
                        value={formData.confirmPin}
                        onChange={(e) => handleInputChange("confirmPin", e.target.value)}
                        maxLength={4}
                        className="pr-16 h-16 text-2xl rounded-2xl border-2 border-agri-primary/30 focus:border-agri-primary bg-agri-light/30 font-bold text-center tracking-[0.8em]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPin(!showConfirmPin)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2"
                      >
                        {showConfirmPin ? (
                          <EyeOff className="w-6 h-6 text-agri-primary" />
                        ) : (
                          <Eye className="w-6 h-6 text-agri-primary" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid() || loading}
                  className="w-full h-20 bg-agri-primary hover:bg-agri-secondary text-white font-bold text-2xl rounded-2xl shadow-large mt-6 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Sprout className="w-8 h-8" />
                      <span>Create My Account</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6 mb-6">
              <button
                onClick={() => navigate('/login')}
                className="text-agri-primary font-bold text-xl hover:text-agri-secondary transition-colors"
              >
                Already have an account? Login →
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Signup;