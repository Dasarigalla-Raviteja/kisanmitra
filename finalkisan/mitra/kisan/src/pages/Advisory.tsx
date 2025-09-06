import { useState, useEffect } from 'react';
import { 
  BookOpen,
  Bookmark,
  ChevronRight,
  Calendar,
  CheckCircle,
  Clock,
  Droplets,
  Beaker,
  Leaf,
  Star,
  TrendingUp,
  Package,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Advisory = () => {
  const navigate = useNavigate();
  const [savedGuidance, setSavedGuidance] = useState<string[]>([]);
  const [appliedGuidance, setAppliedGuidance] = useState<string[]>(() => {
    const applied = localStorage.getItem('kisanmitra_applied_guidance');
    return applied ? JSON.parse(applied) : [];
  });

  // Load saved fertilizer guidance
  useEffect(() => {
    const saved = localStorage.getItem('kisanmitra_saved_fertilizer_guides');
    setSavedGuidance(saved ? JSON.parse(saved) : []);
  }, []);

  const cropData = {
    'tomato': {
      name: 'Tomato',
      image: '🍅',
      season: 'Kharif/Rabi',
      fertilizers: [
        { name: 'NPK (10:26:26)', quantity: '200 kg/acre', timing: 'At planting' },
        { name: 'Urea (46% N)', quantity: '50 kg/acre', timing: '20 days after transplant' },
        { name: 'Calcium Nitrate', quantity: '25 kg/acre', timing: 'Flowering stage' }
      ]
    },
    'wheat': {
      name: 'Wheat',
      image: '🌾',
      season: 'Rabi',
      fertilizers: [
        { name: 'DAP (18:46:0)', quantity: '150 kg/acre', timing: 'At sowing' },
        { name: 'Urea (46% N)', quantity: '65 kg/acre', timing: '1st irrigation (21 days)' },
        { name: 'Urea (46% N)', quantity: '65 kg/acre', timing: '2nd irrigation (45 days)' }
      ]
    },
    'rice': {
      name: 'Rice',
      image: '🌾',
      season: 'Kharif',
      fertilizers: [
        { name: 'NPK (12:32:16)', quantity: '125 kg/acre', timing: 'Before transplanting' },
        { name: 'Urea (46% N)', quantity: '45 kg/acre', timing: '15 days after transplant' },
        { name: 'Urea (46% N)', quantity: '45 kg/acre', timing: 'At panicle initiation' }
      ]
    },
    'cotton': {
      name: 'Cotton',
      image: '☁️',
      season: 'Kharif',
      fertilizers: [
        { name: 'NPK (17:17:17)', quantity: '100 kg/acre', timing: 'At sowing' },
        { name: 'Urea (46% N)', quantity: '60 kg/acre', timing: '30-35 days after sowing' },
        { name: 'MOP (60% K2O)', quantity: '35 kg/acre', timing: 'At flowering' }
      ]
    },
    'maize': {
      name: 'Maize',
      image: '🌽',
      season: 'Kharif/Rabi',
      fertilizers: [
        { name: 'NPK (12:32:16)', quantity: '125 kg/acre', timing: 'At sowing' },
        { name: 'Urea (46% N)', quantity: '65 kg/acre', timing: '25-30 days after sowing' },
        { name: 'Urea (46% N)', quantity: '65 kg/acre', timing: 'Pre-tasseling stage' }
      ]
    }
  };

  const toggleAppliedStatus = (cropId: string) => {
    const updatedApplied = appliedGuidance.includes(cropId)
      ? appliedGuidance.filter(id => id !== cropId)
      : [...appliedGuidance, cropId];
    
    setAppliedGuidance(updatedApplied);
    localStorage.setItem('kisanmitra_applied_guidance', JSON.stringify(updatedApplied));
  };

  const savedCrops = savedGuidance.map(id => ({
    id,
    ...cropData[id as keyof typeof cropData]
  })).filter(crop => crop.name); // Filter out any invalid entries

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="text-white hover:bg-white/20 rounded-full p-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="text-xl font-bold text-white flex items-center">
            <BookOpen className="w-6 h-6 mr-2" />
            Advisory
          </h1>
          
          <div className="w-12" />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-8">
        {/* My Fertilizer Guidance Card - Always clickable like Market Prices */}
        <Card 
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200"
          onClick={() => navigate('/my-fertilizer-guidance')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Beaker className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">My Fertilizer Guidance</h3>
                <p className="text-gray-500 text-sm">
                  {savedCrops.length > 0 
                    ? `${savedCrops.length} saved crop${savedCrops.length !== 1 ? 's' : ''} • ${appliedGuidance.length} applied`
                    : 'Save fertilizer guidance to see them here'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {savedCrops.length > 0 && (
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    {savedCrops.length}
                  </div>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Prices Card */}
        <Card 
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200"
          onClick={() => navigate('/market-prices')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">Market Prices</h3>
                <p className="text-gray-500 text-sm">Today's mandi rates and trends</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  Live
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sell Crops Card */}
        <Card 
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200"
          onClick={() => navigate('/sell')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">Sell Crops</h3>
                <p className="text-gray-500 text-sm">List your produce for sale</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                  Sell Now
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Advisory;