import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Sparkles } from 'lucide-react';
import splashBg from '@/assets/splash-bg.jpg';
import logo from '@/assets/logo.png';

const Splash = () => {
  const navigate = useNavigate();
  const [seedlingGrown, setSeedlingGrown] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);

  useEffect(() => {
    // Animate seedling growth
    setTimeout(() => setSeedlingGrown(true), 500);
    
    // Show brand text
    setTimeout(() => setTextVisible(true), 1000);
    
    // Show tagline with typewriter effect
    setTimeout(() => setTaglineVisible(true), 1500);
    
    // Navigate to onboarding after animation
    setTimeout(() => {
      const hasSeenOnboarding = localStorage.getItem('kisanmitra_onboarding_seen');
      if (hasSeenOnboarding) {
        navigate('/login');
      } else {
        navigate('/onboarding');
      }
    }, 3500);
  }, [navigate]);

  return (
    <div className="mobile-container relative overflow-hidden">
      {/* Background with animated gradient */}
      <div 
        className="absolute inset-0 gradient-splash"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(4, 120, 87, 0.9)), url(${splashBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/20 rounded-full animate-pulse"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (Math.random() * 3 + 2) + 's',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center">
        {/* Logo and Seedling Animation */}
        <div className="mb-8 relative">
          <div className={`transition-all duration-1000 transform ${seedlingGrown ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'}`}>
            <div className="relative">
              <img src={logo} alt="KisanMitra" className="w-24 h-24 mx-auto mb-4 drop-shadow-lg" />
              
              {/* Sparkle effects around logo */}
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className={`mb-4 transition-all duration-800 transform ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
            KisanMitra
          </h1>
          <div className="w-24 h-1 bg-white/60 mx-auto rounded-full shadow-glow" />
        </div>

        {/* Tagline with typewriter effect */}
        <div className={`mb-12 transition-all duration-800 ${taglineVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xl text-white/90 font-medium tracking-wide">
            <span className={`inline-block ${taglineVisible ? 'animate-typing' : ''}`}>
              Your Smart Farming Companion
            </span>
          </p>
        </div>

        {/* Growing seedling animation at bottom */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className={`transition-all duration-2000 transform ${seedlingGrown ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
            <Sprout className="w-8 h-8 text-green-200 animate-bounce" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        {/* Subtle loading indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                style={{ animationDelay: i * 0.2 + 's' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;