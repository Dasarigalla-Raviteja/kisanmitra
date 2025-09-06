import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone, Lock, Sprout, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    pin: ''
  });

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, mobile: cleaned }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.mobile || !formData.pin) {
      toast({
        title: "Missing Information",
        description: "Please enter mobile number and PIN",
        variant: "destructive",
      });
      return;
    }

    if (formData.mobile.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter 10 digit mobile number",
        variant: "destructive",
      });
      return;
    }

    if (formData.pin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be 4 digits",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Check if user exists and authenticate
    setTimeout(() => {
      const existingUser = localStorage.getItem('kisanmitra_user');
      const authToken = localStorage.getItem('kisanmitra_auth_token');
      const expectedToken = btoa(`${formData.mobile}:${formData.pin}`);
      
      if (existingUser && authToken === expectedToken) {
        // User exists and credentials match
        const userData = JSON.parse(existingUser);
        userData.isLoggedIn = true;
        localStorage.setItem('kisanmitra_user', JSON.stringify(userData));
        
        toast({
          title: `Welcome back, ${userData.name}! 🌾`,
          description: "Successfully logged in",
        });
        navigate('/home');
      } else {
        // Invalid credentials or user doesn't exist
        toast({
          title: "Login Failed",
          description: "Invalid mobile number or PIN. Please check your credentials.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-br from-agri-light to-white">
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
        <div className="text-center px-6 pt-8 pb-6">
          <div className="w-20 h-20 bg-agri-primary rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-agri-primary mb-2">
            🙏 Welcome Back, Farmer
          </h1>
          <p className="text-lg text-agri-gray">
            Continue your farming journey
          </p>
        </div>

        {/* Form Container */}
        <div className="flex-1 px-6">
          <div className="bg-white rounded-3xl p-6 shadow-large border border-agri-primary/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mobile Number */}
              <div className="space-y-3">
                <label className="text-lg font-bold text-agri-primary flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-agri-primary" />
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center bg-agri-light rounded-lg px-3 py-2">
                    <span className="text-agri-primary font-bold text-lg">🇮🇳 +91</span>
                  </div>
                  <Input
                    type="tel"
                    placeholder="Enter 10 digit mobile"
                    value={formData.mobile}
                    onChange={handleMobileChange}
                    maxLength={10}
                    className="pl-24 pr-4 h-20 border-2 border-agri-primary/30 focus:border-agri-primary rounded-2xl text-2xl font-bold text-center tracking-wider bg-agri-light/30"
                  />
                </div>
              </div>

              {/* PIN Entry */}
              <div className="space-y-3">
                <label className="text-lg font-bold text-agri-primary flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-agri-primary" />
                  4-Digit PIN
                </label>
                <div className="relative">
                  <Input
                    type={showPin ? "text" : "password"}
                    placeholder="Enter PIN"
                    value={formData.pin}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      pin: e.target.value.replace(/\D/g, '').slice(0, 4) 
                    }))}
                    maxLength={4}
                    className="pl-4 pr-20 h-20 border-2 border-agri-primary/30 focus:border-agri-primary rounded-2xl text-center text-3xl font-bold tracking-[0.8em] bg-agri-light/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-xl hover:bg-agri-light transition-colors"
                  >
                    {showPin ? (
                      <EyeOff className="w-8 h-8 text-agri-primary" />
                    ) : (
                      <Eye className="w-8 h-8 text-agri-primary" />
                    )}
                  </button>
                </div>

                {/* PIN dots indicator */}
                <div className="flex justify-center space-x-4 mt-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        i < formData.pin.length 
                          ? 'bg-agri-primary scale-125' 
                          : 'bg-agri-light'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !formData.mobile || !formData.pin}
                className="w-full h-20 bg-agri-primary hover:bg-agri-secondary text-white font-bold text-2xl rounded-2xl shadow-large disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Logging in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Sprout className="w-8 h-8" />
                    <span>Login to KisanMitra</span>
                  </div>
                )}
              </Button>

              {/* Signup Link */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-agri-primary font-bold text-xl hover:text-agri-secondary transition-colors"
                >
                  New to KisanMitra? Create Account →
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-6" />
      </div>
    </div>
  );
};

export default Login;