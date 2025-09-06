import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  ArrowLeft,
  MapPin,
  Clock,
  RefreshCw,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MarketPrices = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock market data - in real app this would come from API
  const marketData = [
    {
      id: 1,
      name: 'Azadpur Mandi',
      location: 'Delhi',
      distance: '12 km',
      crops: [
        { name: 'Tomato', price: '₹16/kg', change: '+8%', trend: 'up', previousPrice: '₹14.80/kg' },
        { name: 'Onion', price: '₹25/kg', change: '+12%', trend: 'up', previousPrice: '₹22.30/kg' },
        { name: 'Potato', price: '₹18/kg', change: '-5%', trend: 'down', previousPrice: '₹19/kg' },
        { name: 'Carrot', price: '₹22/kg', change: '+3%', trend: 'up', previousPrice: '₹21.30/kg' },
        { name: 'Cabbage', price: '₹12/kg', change: '0%', trend: 'stable', previousPrice: '₹12/kg' }
      ]
    },
    {
      id: 2,
      name: 'Ghazipur Mandi',
      location: 'Delhi',
      distance: '18 km',
      crops: [
        { name: 'Wheat', price: '₹2,150/qtl', change: '+2%', trend: 'up', previousPrice: '₹2,105/qtl' },
        { name: 'Paddy', price: '₹1,850/qtl', change: '-3%', trend: 'down', previousPrice: '₹1,907/qtl' },
        { name: 'Mustard', price: '₹4,200/qtl', change: '+5%', trend: 'up', previousPrice: '₹4,000/qtl' },
        { name: 'Gram', price: '₹3,800/qtl', change: '+1%', trend: 'up', previousPrice: '₹3,762/qtl' }
      ]
    },
    {
      id: 3,
      name: 'Najafgarh Mandi',
      location: 'Delhi',
      distance: '25 km',
      crops: [
        { name: 'Cauliflower', price: '₹15/kg', change: '+10%', trend: 'up', previousPrice: '₹13.60/kg' },
        { name: 'Peas', price: '₹35/kg', change: '-8%', trend: 'down', previousPrice: '₹38/kg' },
        { name: 'Spinach', price: '₹20/kg', change: '+15%', trend: 'up', previousPrice: '₹17.40/kg' },
        { name: 'Radish', price: '₹8/kg', change: '+6%', trend: 'up', previousPrice: '₹7.55/kg' }
      ]
    },
    {
      id: 4,
      name: 'Okhla Mandi',
      location: 'Delhi',
      distance: '22 km',
      crops: [
        { name: 'Brinjal', price: '₹24/kg', change: '+7%', trend: 'up', previousPrice: '₹22.40/kg' },
        { name: 'Okra', price: '₹28/kg', change: '-4%', trend: 'down', previousPrice: '₹29.20/kg' },
        { name: 'Bottle Gourd', price: '₹18/kg', change: '+2%', trend: 'up', previousPrice: '₹17.65/kg' },
        { name: 'Bitter Gourd', price: '₹32/kg', change: '+9%', trend: 'up', previousPrice: '₹29.35/kg' }
      ]
    }
  ];

  const filteredMarkets = marketData.filter(market => 
    market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    market.crops.some(crop => crop.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-20">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Market Prices</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <RefreshCw className={`w-4 h-4 text-green-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                placeholder="Search crops or markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 bg-white"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-green-500"
            >
              <Filter className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Market Cards */}
        {filteredMarkets.map((market) => (
          <Card key={market.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Market Header */}
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900">{market.name}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{market.location}</span>
                      <span>•</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        {market.distance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Crops List */}
            <CardContent className="p-0">
              <div className="space-y-0">
                {market.crops.map((crop, index) => (
                  <div key={index} className="flex items-center justify-between p-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-base">{crop.name}</h4>
                      <p className="text-sm text-gray-500">Previous: {crop.previousPrice}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-bold text-lg text-gray-900">{crop.price}</div>
                        <div className={`text-sm font-medium flex items-center space-x-1 ${getTrendColor(crop.trend)}`}>
                          {getTrendIcon(crop.trend)}
                          <span>{crop.change}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* No Results */}
        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No markets found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      {/* Floating Action Button - Price Alerts */}
      <div className="fixed bottom-6 right-6 z-10">
        <Button
          onClick={() => {
            // TODO: Implement price alerts functionality
            alert('Price alerts feature coming soon!');
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Bell className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Pull to refresh hint (for mobile) */}
      <div className="pb-20"> {/* Extra padding for mobile navigation */}
        <div className="text-center py-4 text-gray-500 text-sm">
          Pull down to refresh prices
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;