
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Camera, 
  ShoppingCart, 
  MapPin, 
  Package, 
  Sprout, 
  Home as HomeIcon,
  User,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Store,
  Leaf,
  Cloud,
  Sun,
  CheckCircle,
  ChevronDown,
  Droplets,
  Activity,
  TestTube,
  Beaker,
  IndianRupee,
  ArrowRight,
  Volume2,
  BookOpen,
  BarChart3,
  List,
  ChevronRight,
  CloudRain,
  Thermometer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import NotificationPanel from '@/components/NotificationPanel';
import { weatherService, WeatherData } from '@/lib/weather';

const Home = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  
  // Get user data
  const userData = JSON.parse(localStorage.getItem('kisanmitra_user') || '{}');
  const userName = userData.name || 'Farmer';
  
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌱 Good Morning';
    if (hour < 17) return '🌞 Good Afternoon';
    return '🌙 Good Evening';
  };

  // Load weather data
  useEffect(() => {
    const loadWeather = async () => {
      try {
        setWeatherLoading(true);
        
        // Try to get current location first
        try {
          const location = await weatherService.getCurrentLocation();
          const weatherData = await weatherService.getCurrentWeather(location.lat, location.lon);
          setWeather(weatherData);
        } catch (locationError) {
          // If location access fails, use a default location
          console.warn('Location access failed, using default location');
          const defaultWeather = await weatherService.getWeatherByCity('Delhi, IN');
          setWeather(defaultWeather);
        }
      } catch (error) {
        console.error('Weather fetch error:', error);
        // Keep weather as null, will show fallback UI
      } finally {
        setWeatherLoading(false);
      }
    };

    loadWeather();
  }, []);

  // Market prices data with enhanced info
  const marketPrices = [
    { crop: 'Tomato', price: '₹16/kg', trend: 'up', change: '+8%', changeValue: '+₹1.20' },
    { crop: 'Paddy', price: '₹1,850/qtl', trend: 'down', change: '-3%', changeValue: '-₹57' },
    { crop: 'Onion', price: '₹25/kg', trend: 'up', change: '+12%', changeValue: '+₹2.70' },
  ];

  const quickActions = [
    {
      id: 'listings',
      title: 'My Listings',
      subtitle: 'Manage crops',
      icon: Package,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      badge: '3',
      action: () => navigate('/sell')
    },
    {
      id: 'sell',
      title: 'Sell Produce',
      subtitle: 'Post your harvest',
      icon: TrendingUp,
      bgColor: 'bg-agri-light',
      iconColor: 'text-agri-primary',
      badge: 'NEW',
      action: () => navigate('/sell')
    },
    {
      id: 'fertilizers',
      title: 'Order Fertilizers',
      subtitle: 'Shop nutrients',
      icon: ShoppingCart,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      action: () => navigate('/shop')
    },
    {
      id: 'shops',
      title: 'Nearby Shops',
      subtitle: 'Find agri stores',
      icon: MapPin,
      bgColor: 'bg-agri-light-purple',
      iconColor: 'text-agri-purple',
      action: () => navigate('/shops')
    },
    {
      id: 'orders',
      title: 'My Orders',
      subtitle: 'Track orders',
      icon: Package,
      bgColor: 'bg-agri-light-blue',
      iconColor: 'text-agri-info',
      action: () => navigate('/orders')
    }
  ];

  const farmActions = [
    {
      id: 'treatments',
      title: 'Active Treatments',
      subtitle: '2 ongoing',
      icon: Activity,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      badge: 2,
      action: () => navigate('/treatments')
    },
    {
      id: 'guides',
      title: 'Cultivation Guides',
      subtitle: 'Growing tips',
      icon: Sprout,
      bgColor: 'bg-agri-light',
      iconColor: 'text-agri-primary',
      action: () => navigate('/guides')
    }
  ];

  return (
    <div className="mobile-container bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-5 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-agri-primary rounded-2xl flex items-center justify-center">
            <Sprout className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-text-secondary">KisanMitra</h1>
            <p className="text-base text-agri-primary font-medium">
              {getGreeting()}, {userName} Ji!
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-4 mt-4">
          <LanguageSwitcher />
          
          <button 
            onClick={() => setShowNotifications(true)}
            className="relative p-3 hover:bg-gray-100 rounded-full transition-colors active:scale-95 z-10"
          >
            <Bell className="w-7 h-7 text-agri-gray" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse z-10">
              <span className="text-sm font-bold text-white">3</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-8 pt-6 pb-24">
        {/* Weather Card - Compact */}
        <Card className="weather-card border-0 shadow-medium rounded-3xl">
          <CardContent className="p-6">
            {/* Header with location and more info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-base font-semibold text-blue-800">
                  {weatherLoading ? 'Loading...' : weather?.location || 'Location unavailable'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-blue-700 hover:bg-blue-50 p-2 h-10 w-10 rounded-full"
                  onClick={() => {/* Voice function */}}
                >
                  <Volume2 className="w-5 h-5" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-white/70 border-blue-200 hover:bg-white text-blue-700 text-base h-10 px-4 rounded-2xl"
                  onClick={() => navigate('/weather')}
                >
                  More
                </Button>
              </div>
            </div>

            {/* Compact weather display */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white/60 rounded-2xl flex items-center justify-center">
                  {weather && !weatherLoading ? (
                    <img 
                      src={weatherService.getWeatherIconUrl(weather.icon)} 
                      alt={weather.description}
                      className="w-10 h-10"
                    />
                  ) : (
                    <Cloud className="w-8 h-8 text-blue-600" />
                  )}
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-900">
                    {weatherLoading ? '--°C' : weather ? `${weather.temperature}°C` : '--°C'}
                  </div>
                  <div className="text-base text-blue-700 capitalize">
                    {weatherLoading ? 'Loading...' : weather?.description || 'No data'}
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-yellow-600" />
                  <span className="text-base text-blue-700">
                    {weatherLoading ? '--°/--°' : weather ? `${weather.feelsLike}°` : '--°'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span className="text-base text-blue-700">
                    {weatherLoading ? '--%' : weather ? `${weather.humidity}%` : '--%'}
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic farming advice */}
            {weather && !weatherLoading && (
              <div className="bg-green-100 border border-green-200 rounded-2xl p-4 mt-4 flex items-center space-x-3">
                <Leaf className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-base font-medium text-green-800">
                  {weatherService.generateFarmingAdvice(weather)}
                </span>
              </div>
            )}
          </CardContent>
        </Card>


        {/* AI Plant Diagnosis - Compact Green Style */}
        <Card className="bg-gradient-to-r from-green-400 to-green-500 border-0 shadow-lg rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-3">
                  AI Powered
                </div>
                <h3 className="font-bold text-white text-xl mb-1">Diagnose Plant Health</h3>
                <p className="text-white/90 text-base">Take a photo to check diseases</p>
              </div>
              <Button 
                onClick={() => navigate('/diagnose')}
                className="bg-white text-green-500 hover:bg-white/90 font-bold rounded-xl px-6 py-3 flex items-center space-x-2 text-base active:scale-95 transition-transform ml-4"
              >
                <Camera className="w-5 h-5" />
                <span>Start</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Soil & Fertilizer Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-secondary">🧪 Soil & Fertilizer</h2>
          <div className="grid grid-cols-2 gap-5">
            <Card className="cursor-pointer active:scale-95 transition-transform rounded-3xl shadow-lg border-0 bg-gradient-to-br from-amber-100 to-orange-100 hover:shadow-xl" onClick={() => navigate('/soil-health')}>
              <CardContent className="p-6 text-center min-h-[140px] flex flex-col justify-center">
                <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-md">
                  <TestTube className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="font-bold text-amber-900 text-lg mb-2">Soil Health</h3>
                <p className="text-amber-800 text-sm font-semibold">Check nutrient levels</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer active:scale-95 transition-transform rounded-3xl shadow-lg border-0 bg-gradient-to-br from-green-100 to-emerald-100 hover:shadow-xl" onClick={() => navigate('/fertilizer-guide')}>
              <CardContent className="p-6 text-center min-h-[140px] flex flex-col justify-center">
                <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-md">
                  <Beaker className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="font-bold text-green-900 text-lg mb-2">Fertilizer Guide</h3>
                <p className="text-green-800 text-sm font-semibold">Get nutrient advice</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Marketplace Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-secondary">🛒 Marketplace</h2>
          
          {/* Market Prices Preview */}
          <Card className="rounded-3xl shadow-sm border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-text-secondary text-xl">Today's Mandi Prices</h3>
                <TrendingUp className="w-6 h-6 text-agri-success" />
              </div>
              <div className="space-y-4 mb-6">
                {marketPrices.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex-1">
                      <span className="font-bold text-text-secondary text-lg">{item.crop}</span>
                      <div className="text-base text-gray-600 mt-1">
                        {item.trend === 'up' ? '↗ Trending up' : '↘ Trending down'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-text-secondary text-lg">{item.price}</div>
                      <div className={`text-base font-semibold flex items-center space-x-2 justify-end ${
                        item.trend === 'up' 
                          ? 'text-agri-success' 
                          : 'text-agri-danger'
                      }`}>
                        {item.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingUp className="w-4 h-4 rotate-180" />
                        )}
                        <span>{item.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Marketplace Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/market-prices')}
                  className="flex items-center space-x-3 justify-center h-12 text-base font-semibold rounded-2xl active:scale-95 transition-transform"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>See All Prices</span>
                </Button>
                <Button 
                  onClick={() => navigate('/sell')}
                  className="bg-agri-success hover:bg-agri-success/90 flex items-center space-x-3 justify-center h-12 text-base font-semibold rounded-2xl active:scale-95 transition-transform"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Sell Crops</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Additional Marketplace Cards */}
          <div className="grid grid-cols-2 gap-5">
            <Card className="cursor-pointer active:scale-95 transition-transform rounded-3xl shadow-lg border-0 bg-gradient-to-br from-orange-100 to-red-100 hover:shadow-xl" onClick={() => navigate('/shop')}>
              <CardContent className="p-6 text-center min-h-[140px] flex flex-col justify-center">
                <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-md">
                  <ShoppingCart className="w-8 h-8 text-orange-700" />
                </div>
                <h3 className="font-bold text-orange-900 text-lg mb-2">Order Fertilizers</h3>
                <p className="text-orange-800 text-sm font-semibold">Shop nutrients</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer active:scale-95 transition-transform rounded-3xl shadow-lg border-0 bg-gradient-to-br from-purple-100 to-pink-100 hover:shadow-xl" onClick={() => navigate('/shops')}>
              <CardContent className="p-6 text-center min-h-[140px] flex flex-col justify-center">
                <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-md">
                  <MapPin className="w-8 h-8 text-purple-700" />
                </div>
                <h3 className="font-bold text-purple-900 text-lg mb-2">Nearby Shops</h3>
                <p className="text-purple-800 text-sm font-semibold">Find agri stores</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My Farm Section - 4 Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-secondary">🌱 My Farm</h2>
          
          <div className="grid grid-cols-2 gap-5">
            <Card className="cursor-pointer active:scale-95 transition-transform rounded-3xl shadow-lg border-0 bg-gradient-to-br from-red-100 to-pink-100 hover:shadow-xl" onClick={() => navigate('/treatments')}>
              <CardContent className="p-6 text-center relative min-h-[140px] flex flex-col justify-center">
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-red-600 text-white text-base font-bold px-3 py-1 rounded-full min-w-[24px] h-7 flex items-center justify-center shadow-lg">
                    2
                  </div>
                </div>
                <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-md">
                  <Activity className="w-8 h-8 text-red-700" />
                </div>
                <h3 className="font-bold text-red-900 text-lg mb-2">Active Treatments</h3>
                <p className="text-red-800 text-sm font-semibold">Track ongoing sprays</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer active:scale-95 transition-transform rounded-3xl shadow-lg border-0 bg-gradient-to-br from-emerald-100 to-teal-100 hover:shadow-xl" onClick={() => navigate('/guides')}>
              <CardContent className="p-6 text-center min-h-[140px] flex flex-col justify-center">
                <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-md">
                  <Sprout className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="font-bold text-emerald-900 text-lg mb-2">Cultivation Guides</h3>
                <p className="text-emerald-800 text-sm font-semibold">Seasonal practices</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer active:scale-95 transition-transform rounded-3xl shadow-lg border-0 bg-gradient-to-br from-cyan-100 to-blue-100 hover:shadow-xl" onClick={() => navigate('/orders')}>
              <CardContent className="p-6 text-center min-h-[140px] flex flex-col justify-center">
                <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-md">
                  <Package className="w-8 h-8 text-cyan-700" />
                </div>
                <h3 className="font-bold text-cyan-900 text-lg mb-2">My Orders</h3>
                <p className="text-cyan-800 text-sm font-semibold">Track purchases</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer active:scale-95 transition-transform rounded-3xl shadow-lg border-0 bg-gradient-to-br from-lime-100 to-green-100 hover:shadow-xl" onClick={() => navigate('/sell')}>
              <CardContent className="p-6 text-center min-h-[140px] flex flex-col justify-center">
                <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-md">
                  <Package className="w-8 h-8 text-lime-700" />
                </div>
                <h3 className="font-bold text-lime-900 text-lg mb-2">My Listings</h3>
                <p className="text-lime-800 text-sm font-semibold">Manage crop listings</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - 5 Tabs */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="flex flex-col items-center space-y-1 px-4 py-2 min-w-0">
            <HomeIcon className="w-7 h-7 text-agri-primary" />
            <span className="text-sm font-semibold text-agri-primary">Home</span>
          </button>
          
          <button 
            onClick={() => navigate('/diagnose')}
            className="flex flex-col items-center space-y-1 px-4 py-2 transition-all duration-200 hover:bg-agri-light rounded-2xl min-w-0 active:scale-95"
          >
            <Camera className="w-7 h-7 text-agri-gray" />
            <span className="text-sm text-agri-gray">Diagnose</span>
          </button>
          
          <button 
            onClick={() => navigate('/advisory')}
            className="flex flex-col items-center space-y-1 px-4 py-2 transition-all duration-200 hover:bg-agri-light rounded-2xl min-w-0 active:scale-95"
          >
            <BookOpen className="w-7 h-7 text-agri-gray" />
            <span className="text-sm text-agri-gray">Advisory</span>
          </button>
          
          <button 
            onClick={() => navigate('/shop')}
            className="flex flex-col items-center space-y-1 px-4 py-2 transition-all duration-200 hover:bg-agri-light rounded-2xl min-w-0 active:scale-95"
          >
            <Store className="w-7 h-7 text-agri-gray" />
            <span className="text-sm text-agri-gray">Shop</span>
          </button>
          
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center space-y-1 px-4 py-2 transition-all duration-200 hover:bg-agri-light rounded-2xl min-w-0 active:scale-95"
          >
            <User className="w-7 h-7 text-agri-gray" />
            <span className="text-sm text-agri-gray">Profile</span>
          </button>
        </div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </div>
  );
};

export default Home;
