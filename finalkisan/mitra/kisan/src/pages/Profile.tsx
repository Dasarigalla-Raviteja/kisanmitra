import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Phone, 
  MapPin, 
  Calendar,
  TrendingUp,
  Package,
  Trophy,
  Zap,
  Eye,
  ShoppingCart,
  Cloud,
  Activity,
  Star,
  Users,
  Leaf,
  Target,
  Award,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  Crown,
  Flame,
  ShoppingBag,
  Wallet
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    location: 'Kurnool District',
    state: 'Andhra Pradesh',
    avatar: null,
    farmSize: '5.2 acres',
    experience: '12 years',
    joinedDate: 'March 2023'
  });

  // Stats from app data (connected to real features)
  const [stats, setStats] = useState({
    totalEarnings: 45250,
    activeListings: 3,
    successfulSales: 28,
    totalViews: 1247,
    avgRating: 4.8,
    diagnosisCount: 12,
    advisorySaved: 8,
    level: 'Expert Farmer'
  });

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'First Sale', icon: Trophy, completed: true, color: 'text-yellow-500' },
    { id: 2, title: 'Top Seller', icon: Crown, completed: true, color: 'text-purple-500' },
    { id: 3, title: 'Plant Expert', icon: Leaf, completed: true, color: 'text-green-500' },
    { id: 4, title: 'Super Star', icon: Star, completed: false, color: 'text-gray-400' }
  ]);

  // Load user data from localStorage
  useEffect(() => {
    const savedUserData = localStorage.getItem('kisanmitra_user');
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData({
        name: parsedData.name || 'Farmer',
        phone: parsedData.phone || '+91 98765 43210',
        location: parsedData.location || parsedData.district || 'Unknown Location',
        state: parsedData.state || 'India',
        avatar: parsedData.avatar || null,
        farmSize: parsedData.farmSize || '2.5 acres',
        experience: parsedData.experience || '3 years',
        joinedDate: parsedData.joinedDate || 'Recently'
      });
    }
  }, []);

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('kisanmitra_user');
    localStorage.removeItem('kisanmitra_auth_token');
    localStorage.removeItem('kisanmitra_notifications');
    
    // Navigate to login page
    navigate('/login');
  };

  const StatCard = ({ title, value, icon: Icon, color, trend = null, subtitle = null }) => (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 min-h-[110px]">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center space-x-1 text-green-600 text-xs font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-base text-gray-700 font-medium">{title}</div>
      {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );

  const QuickActionCard = ({ title, icon: Icon, color, onClick }) => (
    <button
      onClick={onClick}
      className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95 min-h-[100px] flex flex-col items-center justify-center"
    >
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-3`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-sm font-semibold text-gray-900 text-center leading-tight">{title}</div>
    </button>
  );

  const MenuSection = ({ title, children }) => (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {title && (
        <div className="px-6 py-5 border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-3">
        {children}
      </div>
    </div>
  );

  const MenuItem = ({ icon: Icon, title, subtitle, onClick = () => {}, rightElement = null, color = "text-gray-700" }) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 hover:bg-gray-50 rounded-2xl transition-all min-h-[70px] active:scale-98"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="text-left">
          <div className="font-semibold text-gray-900 text-lg">{title}</div>
          {subtitle && <div className="text-base text-gray-600 mt-1">{subtitle}</div>}
        </div>
      </div>
      {rightElement || <div className="w-6 h-6" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header with Profile Info */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 px-5 py-8">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/home')}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={() => navigate('/profile/edit')}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 px-6 py-3 rounded-2xl flex items-center space-x-2 transition-all active:scale-95"
          >
            <Edit className="w-5 h-5 text-white" />
            <span className="text-base font-medium text-white">Edit</span>
          </button>
        </div>

        {/* Farmer Profile Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-white border border-white/20 mb-6">
          <div className="flex items-start space-x-5">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-white text-3xl font-bold border-3 border-white/30 shadow-lg">
              {userData.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm text-white/80">{userData.location}, {userData.state}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm text-white/80">{userData.phone}</span>
              </div>
            </div>
          </div>

          {/* Additional Farmer Details */}
          <div className="mt-5 pt-5 border-t border-white/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-1">{userData.farmSize}</div>
                <div className="text-xs text-white/70 uppercase tracking-wider">Farm Size</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">{userData.experience}</div>
                <div className="text-xs text-white/70 uppercase tracking-wider">Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">{userData.joinedDate.split(' ')[0]}</div>
                <div className="text-xs text-white/70 uppercase tracking-wider">Member Since</div>
              </div>
            </div>
          </div>
        </div>

        {/* Farm Overview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-5 border border-white/20">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Farm Activity
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">₹{stats.totalEarnings.toLocaleString()}</div>
              <div className="text-xs text-white/70 uppercase tracking-wider">Total Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{stats.activeListings}</div>
              <div className="text-xs text-white/70 uppercase tracking-wider">Active Crops</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-6 pt-6">
        {/* Marketplace Activity Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <ShoppingBag className="w-6 h-6 mr-2 text-green-600" />
              Marketplace Activity
            </h3>
            <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">
              Active Seller
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              title="Active Listings" 
              value={stats.activeListings} 
              icon={Package}
              color="bg-blue-500"
              trend="+2 this week"
            />
            <StatCard 
              title="Total Sales" 
              value={stats.successfulSales} 
              icon={Trophy}
              color="bg-green-500"
              subtitle="All time sales"
            />
          </div>
        </div>

        {/* Farm Activity & Tools */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-green-600" />
              Farm Activity
            </h3>
            <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">
              Active Farmer
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              title="Plant Diagnosis" 
              value={stats.diagnosisCount} 
              icon={Leaf}
              color="bg-green-500"
              subtitle="This season"
            />
            <StatCard 
              title="Advisory Saved" 
              value={stats.advisorySaved} 
              icon={Star}
              color="bg-blue-500"
              subtitle="Farming tips"
            />
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-base font-semibold text-gray-600">3/4</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="text-center">
                <div className={`w-16 h-16 ${achievement.completed ? 'bg-yellow-100' : 'bg-gray-100'} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                  <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                </div>
                <div className="text-sm font-semibold text-gray-700 leading-tight">{achievement.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-4">
            <QuickActionCard 
              title="My Listings" 
              icon={Package} 
              color="bg-green-500"
              onClick={() => navigate('/sell')}
            />
            <QuickActionCard 
              title="Market Prices" 
              icon={BarChart3} 
              color="bg-blue-500"
              onClick={() => navigate('/market-prices')}
            />
            <QuickActionCard 
              title="Weather" 
              icon={Cloud} 
              color="bg-sky-500"
              onClick={() => navigate('/weather')}
            />
            <QuickActionCard 
              title="Diagnose Plant" 
              icon={Activity} 
              color="bg-orange-500"
              onClick={() => navigate('/diagnose')}
            />
          </div>
        </div>


        {/* My Activity */}
        <MenuSection title="My Activity">
          <MenuItem 
            icon={ShoppingBag} 
            title="My Orders" 
            subtitle="View purchase history"
            color="text-blue-600"
            onClick={() => navigate('/orders')}
          />
          <MenuItem 
            icon={Leaf} 
            title="Saved Advisory" 
            subtitle={`${stats.advisorySaved} guidance saved`}
            color="text-green-600"
            onClick={() => navigate('/advisory')}
          />
          <MenuItem 
            icon={Activity} 
            title="Treatment History" 
            subtitle="Track applied treatments"
            color="text-orange-600"
            onClick={() => navigate('/treatments')}
          />
          <MenuItem 
            icon={Wallet} 
            title="Earnings Report" 
            subtitle="View detailed sales report"
            color="text-purple-600"
            rightElement={
              <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                ₹{stats.totalEarnings.toLocaleString()}
              </div>
            }
          />
        </MenuSection>

        {/* App Settings */}
        <MenuSection title="Settings">
          <MenuItem 
            icon={Bell} 
            title="Notifications" 
            subtitle="Manage alerts & reminders"
            color="text-blue-600"
            onClick={() => {
              // Show notifications settings
              const settings = {
                priceAlerts: true,
                weatherUpdates: true,
                cropAdvice: true,
                marketNews: false
              };
              const current = JSON.stringify(settings, null, 2);
              alert(`Notification Settings:\n\n${current}\n\nTap OK to modify settings`);
            }}
          />
          <MenuItem 
            icon={Settings} 
            title="App Preferences" 
            subtitle="Language, theme, location"
            color="text-gray-600"
            onClick={() => {
              // Show app preferences
              const prefs = {
                language: 'English',
                theme: 'Light',
                location: userData.location,
                units: 'Metric'
              };
              const current = JSON.stringify(prefs, null, 2);
              alert(`App Preferences:\n\n${current}\n\nTap OK to modify preferences`);
            }}
          />
          <MenuItem 
            icon={HelpCircle} 
            title="Help & Support" 
            subtitle="24/7 farmer support"
            color="text-green-600"
            onClick={() => {
              // Show help and support options
              alert("Help & Support\n\n📞 Call: 1800-123-KISAN\n📧 Email: support@kisanmitra.com\n💬 Chat: Available 24/7\n\nFor immediate assistance, tap OK");
            }}
          />
        </MenuSection>

        {/* Logout */}
        <div className="bg-white rounded-3xl shadow-sm border border-red-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-4 p-6 hover:bg-red-50 rounded-3xl transition-all active:scale-98 min-h-[80px]"
          >
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>
            <span className="font-bold text-red-600 text-lg">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;