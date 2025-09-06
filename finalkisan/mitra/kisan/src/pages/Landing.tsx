import { useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import farmerHero from '@/assets/farmer-hero.jpg';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-light/30 via-background to-agri-primary/5 overflow-hidden">
      {/* Subtle Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-agri-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-agri-success/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col max-w-sm mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                KisanMitra
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Smart Farming Assistant
              </p>
            </div>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center space-y-10">
          {/* Hero Image */}
          <div className="relative mb-4">
            <div className="w-72 h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white/90 bg-white p-2">
              <img 
                src={farmerHero} 
                alt="Happy farmer with mobile technology" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Enhanced Floating Elements */}
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg animate-bounce flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
              <span className="text-white text-lg">🌱</span>
            </div>
            <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-lg animate-bounce flex items-center justify-center" style={{ animationDelay: '1s' }}>
              <span className="text-white text-sm">📱</span>
            </div>
            <div className="absolute top-4 -left-4 w-6 h-6 bg-yellow-400 rounded-full shadow-md animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>

          {/* Tagline */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800 leading-tight">
              Your Smart Farming Assistant
            </h2>
            <p className="text-gray-600 text-base max-w-sm mx-auto leading-relaxed px-2">
              Get instant crop advice, disease diagnosis, and weather updates to boost your farm productivity
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="w-full space-y-6 pt-6">
            <div className="space-y-4">
              <Button
                onClick={() => navigate('/signup')}
                className="w-full h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95 rounded-2xl"
              >
                Get Started
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="w-full h-14 font-semibold text-lg border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 transform active:scale-95 shadow-lg hover:shadow-xl rounded-2xl"
              >
                Login
              </Button>
            </div>
            
          </div>
        </main>

      </div>
    </div>
  );
};

export default Landing;