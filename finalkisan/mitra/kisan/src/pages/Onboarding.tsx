import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import onboarding1 from '@/assets/onboarding-1.png';
import onboarding2 from '@/assets/onboarding-2.png';
import onboarding3 from '@/assets/onboarding-3.png';

const onboardingData = [
  {
    id: 1,
    image: onboarding1,
    title: "Welcome to Smart Farming Revolution",
    subtitle: "Diagnose Plant Diseases with AI Magic",
    description: "Simply capture a photo and get instant expert plant health analysis",
    color: "from-green-400 to-emerald-600",
  },
  {
    id: 2,
    image: onboarding2,
    title: "Your Digital Agricultural Marketplace",
    subtitle: "Buy Smart, Sell Smarter",
    description: "Access premium fertilizers, quality seeds, and connect with buyers",
    color: "from-blue-400 to-indigo-600",
  },
  {
    id: 3,
    image: onboarding3,
    title: "Personalized Farming Intelligence",
    subtitle: "Weather Wisdom & Expert Guidance",
    description: "Get hyper-local weather updates and AI-powered farming recommendations",
    color: "from-purple-400 to-pink-600",
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleGetStarted();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    localStorage.setItem('kisanmitra_onboarding_seen', 'true');
    navigate('/signup');
  };

  const currentData = onboardingData[currentStep];

  return (
    <div className="mobile-container">
      {/* Background with animated gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentData.color} transition-all duration-700`} />
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 4 + 's',
            }}
          >
            {i % 3 === 0 ? (
              <Sparkles className="w-4 h-4 text-white/30 animate-pulse" />
            ) : (
              <Star className="w-3 h-3 text-white/20 animate-bounce" />
            )}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <button
          onClick={handlePrevious}
          className={`p-2 rounded-full bg-white/20 backdrop-blur-sm transition-all ${
            currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={handleSkip}
          className="text-white/80 font-medium hover:text-white transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        {/* Image */}
        <div className="mb-8 relative">
          <div className="w-80 h-60 relative animate-fade-in">
            <img
              src={currentData.image}
              alt={currentData.title}
              className="w-full h-full object-contain drop-shadow-xl"
            />
            
            {/* Floating UI elements animation */}
            <div className="absolute -top-4 -right-4 float-animation">
              <div className="w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="absolute -bottom-2 -left-4 float-animation" style={{ animationDelay: '1s' }}>
              <div className="w-6 h-6 bg-white/20 rounded-full backdrop-blur-sm" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
            {currentData.title}
          </h1>
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white/90 mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {currentData.subtitle}
            </h2>
          </div>
          
          <p className="text-lg text-white/80 leading-relaxed max-w-xs">
            {currentData.description}
          </p>
        </div>

        {/* Progress Indicators */}
        <div className="flex space-x-3 mb-8">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentStep 
                  ? 'w-8 bg-white shadow-glow' 
                  : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 p-6">
        {currentStep === onboardingData.length - 1 ? (
          <Button
            onClick={handleGetStarted}
            className="w-full btn-glass text-lg font-semibold py-4 bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Begin Your Journey
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="w-full btn-glass text-lg font-semibold py-4 bg-white/20 hover:bg-white/30 text-white border-0"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;