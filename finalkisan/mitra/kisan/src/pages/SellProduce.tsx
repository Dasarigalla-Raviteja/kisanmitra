import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  MapPin,
  Clock,
  Eye,
  Truck,
  CheckCircle,
  X,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const SellProduce = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('active');
  const [showCreateListingDialog, setShowCreateListingDialog] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [needTransport, setNeedTransport] = useState(false);

  // Sample data
  const activeListings = [
    {
      id: '1',
      crop: '🥔 Potato',
      quantity: '100 kg',
      pricePerKg: 12,
      transport: 'Yes',
      views: 24,
      inquiries: 3,
      postedDate: '2 days ago'
    },
    {
      id: '2',
      crop: '🍅 Tomato',
      quantity: '50 kg',
      pricePerKg: 25,
      transport: 'No',
      views: 18,
      inquiries: 2,
      postedDate: '1 day ago'
    },
    {
      id: '3',
      crop: '🌾 Wheat',
      quantity: '200 kg',
      pricePerKg: 22,
      transport: 'Yes',
      views: 35,
      inquiries: 5,
      postedDate: '3 days ago'
    }
  ];

  const soldListings = [
    {
      id: '4',
      crop: '🍅 Tomato',
      quantity: '80 kg',
      pricePerKg: 25,
      transport: 'Yes',
      soldPrice: 2000,
      soldDate: '2024-01-15',
      buyer: 'Fresh Mart'
    },
    {
      id: '5',
      crop: '🥔 Potato',
      quantity: '150 kg',
      pricePerKg: 15,
      transport: 'No',
      soldPrice: 2250,
      soldDate: '2024-01-12',
      buyer: 'Local Market'
    },
    {
      id: '6',
      crop: '🌾 Wheat',
      quantity: '300 kg',
      pricePerKg: 20,
      transport: 'Yes',
      soldPrice: 6000,
      soldDate: '2024-01-10',
      buyer: 'Grain Depot'
    }
  ];

  const marketPrices = [
    { crop: '🍅 Tomato', avgPrice: 25, emoji: '🍅', name: 'Tomato' },
    { crop: '🌾 Wheat', avgPrice: 22, emoji: '🌾', name: 'Wheat' },
    { crop: '🥔 Potato', avgPrice: 12, emoji: '🥔', name: 'Potato' },
    { crop: '🌽 Maize', avgPrice: 18, emoji: '🌽', name: 'Maize' },
    { crop: '🌶️ Chili', avgPrice: 80, emoji: '🌶️', name: 'Green Chili' },
    { crop: '☁️ Cotton', avgPrice: 55, emoji: '☁️', name: 'Cotton' }
  ];

  const totalEarnings = soldListings.reduce((sum, listing) => sum + listing.soldPrice, 0);

  const handleCreateListing = () => {
    // Handle form submission logic here
    console.log('Creating listing:', {
      crop: selectedCrop,
      quantity,
      pricePerKg,
      needTransport
    });
    setShowCreateListingDialog(false);
    // Reset form
    setSelectedCrop('');
    setQuantity('');
    setPricePerKg('');
    setNeedTransport(false);
  };

  const prefillFromMarketPrice = (crop: any) => {
    setSelectedCrop(crop.name);
    setPricePerKg(crop.avgPrice.toString());
    setShowCreateListingDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-20">
      {/* Header - Mobile Optimized */}
      <div className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/home')}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">My Listings</h1>
              <p className="text-xs text-gray-600">Manage your crop listings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Section - Mobile Optimized Tabs and Earnings */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Tabs - Mobile Sized */}
          <div className="flex bg-white rounded-2xl p-1 shadow-sm border">
            <button
              onClick={() => setSelectedTab('active')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                selectedTab === 'active'
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setSelectedTab('sold')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                selectedTab === 'sold'
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Sold
            </button>
          </div>

          {/* Total Earnings - Mobile Optimized */}
          <div className="text-right bg-green-50 px-3 py-2 rounded-xl border border-green-200">
            <p className="text-xs text-green-600 font-medium">Earned</p>
            <p className="text-lg font-bold text-green-700">₹{totalEarnings.toLocaleString()}</p>
          </div>
        </div>

        {/* Listings Section - Mobile Optimized */}
        <div className="space-y-3 mb-6">
          {selectedTab === 'active' && (
            <>
              {activeListings.map((listing) => (
                <Card key={listing.id} className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <CardContent className="p-4">
                    {/* Mobile Layout: Vertical Stack */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="text-3xl">{listing.crop.split(' ')[0]}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 leading-tight">{listing.crop}</h3>
                          <p className="text-sm text-gray-500">{listing.quantity} – ₹{listing.pricePerKg}/kg – Transport: {listing.transport}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-blue-600">
                          <Eye className="w-4 h-4" />
                          <span className="text-xs font-medium">{listing.views}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-orange-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs font-medium">{listing.inquiries}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{listing.postedDate}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          {selectedTab === 'sold' && (
            <>
              {soldListings.map((listing) => (
                <Card key={listing.id} className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <CardContent className="p-4">
                    {/* Mobile Layout: Vertical Stack */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="text-3xl">{listing.crop.split(' ')[0]}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 leading-tight">{listing.crop}</h3>
                          <p className="text-sm text-gray-500">{listing.quantity} – ₹{listing.pricePerKg}/kg – Transport: {listing.transport}</p>
                          <p className="text-lg font-bold text-green-600 mt-1">Earned: ₹{listing.soldPrice.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-green-50 rounded-xl p-3 border border-green-200">
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Sold to {listing.buyer}</span>
                      </div>
                      <p className="text-xs text-gray-500">{new Date(listing.soldDate).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Market Prices Section - Mobile Optimized */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Select Crop to Sell</h2>
          <div className="grid grid-cols-2 gap-2">
            {marketPrices.map((crop, index) => (
              <Card 
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow active:scale-95"
                onClick={() => prefillFromMarketPrice(crop)}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-2xl mb-1">{crop.emoji}</div>
                  <h3 className="font-bold text-sm text-gray-900 truncate">{crop.name}</h3>
                  <p className="text-green-600 font-bold text-sm">₹{crop.avgPrice}/kg avg</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) - Mobile Optimized */}
      <button
        onClick={() => setShowCreateListingDialog(true)}
        className="fixed bottom-6 right-4 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group z-50"
      >
        <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Create New Listing Dialog - Mobile Optimized */}
      <Dialog open={showCreateListingDialog} onOpenChange={setShowCreateListingDialog}>
        <DialogContent className="max-w-sm mx-auto m-4 rounded-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-lg font-bold text-gray-900">Create New Listing</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* Crop Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Crop Name</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {marketPrices.map((crop) => (
                    <SelectItem key={crop.name} value={crop.name} className="text-base py-3">
                      {crop.emoji} {crop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Quantity (kg)</label>
              <Input
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full h-12 text-base"
              />
            </div>

            {/* Price per kg */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price per kg (₹)</label>
              <Input
                type="number"
                placeholder="Enter price"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(e.target.value)}
                className="w-full h-12 text-base"
              />
              {selectedCrop && (
                <p className="text-xs text-gray-500 mt-1">
                  Market average: ₹{marketPrices.find(p => p.name === selectedCrop)?.avgPrice}/kg
                </p>
              )}
            </div>

            {/* Transport Toggle */}
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700">Need Transport?</label>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-medium ${!needTransport ? 'text-gray-900' : 'text-gray-500'}`}>No</span>
                  <Switch
                    checked={needTransport}
                    onCheckedChange={setNeedTransport}
                  />
                  <span className={`text-sm font-medium ${needTransport ? 'text-gray-900' : 'text-gray-500'}`}>Yes</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleCreateListing}
              disabled={!selectedCrop || !quantity || !pricePerKg}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-2xl h-12 mt-4"
            >
              Create Listing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellProduce;