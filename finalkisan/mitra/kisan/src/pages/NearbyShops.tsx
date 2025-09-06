import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Clock, 
  Star,
  Navigation,
  Filter,
  Search,
  Store,
  Truck,
  ShoppingCart,
  Heart,
  MoreVertical,
  CheckCircle,
  Route
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NearbyShops = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // list or map

  const shopCategories = [
    { id: 'all', name: 'All Shops', count: 12 },
    { id: 'fertilizers', name: 'Fertilizers', count: 8 },
    { id: 'seeds', name: 'Seeds', count: 6 },
    { id: 'tools', name: 'Tools', count: 4 },
    { id: 'pesticides', name: 'Pesticides', count: 7 }
  ];

  const shops = [
    {
      id: '1',
      name: 'Kisan Agro Center',
      address: 'Main Market, Hardoi, UP',
      distance: 1.2,
      rating: 4.5,
      reviews: 234,
      phone: '+91 98765 43210',
      isOpen: true,
      openTime: '6:00 AM',
      closeTime: '8:00 PM',
      categories: ['fertilizers', 'seeds', 'tools'],
      speciality: 'Organic Fertilizers',
      verified: true,
      delivery: true,
      products: [
        { name: 'NPK Fertilizer', price: 245, inStock: true },
        { name: 'Tomato Seeds', price: 120, inStock: true },
        { name: 'Garden Spade', price: 350, inStock: false }
      ],
      offers: ['Free delivery above ₹500', '10% off on fertilizers'],
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'FarmGrow Supplies',
      address: 'Bilram Road, Hardoi, UP',
      distance: 2.8,
      rating: 4.3,
      reviews: 189,
      phone: '+91 87654 32109',
      isOpen: true,
      openTime: '7:00 AM',
      closeTime: '7:00 PM',
      categories: ['pesticides', 'fertilizers'],
      speciality: 'Pest Control Solutions',
      verified: true,
      delivery: false,
      products: [
        { name: 'Copper Fungicide', price: 180, inStock: true },
        { name: 'Neem Oil', price: 95, inStock: true }
      ],
      offers: ['Buy 2 Get 1 Free on pesticides'],
      image: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Green Valley Seeds',
      address: 'Civil Lines, Hardoi, UP',
      distance: 3.5,
      rating: 4.7,
      reviews: 156,
      phone: '+91 76543 21098',
      isOpen: false,
      openTime: '8:00 AM',
      closeTime: '6:00 PM',
      categories: ['seeds'],
      speciality: 'Hybrid & Organic Seeds',
      verified: false,
      delivery: true,
      products: [
        { name: 'Wheat Seeds', price: 45, inStock: true },
        { name: 'Corn Seeds', price: 80, inStock: true }
      ],
      offers: ['Premium seed varieties'],
      image: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Krishi Tools Mart',
      address: 'Shahabad Road, Hardoi, UP',
      distance: 4.1,
      rating: 4.2,
      reviews: 98,
      phone: '+91 65432 10987',
      isOpen: true,
      openTime: '9:00 AM',
      closeTime: '8:00 PM',
      categories: ['tools'],
      speciality: 'Agricultural Equipment',
      verified: true,
      delivery: false,
      products: [
        { name: 'Tractor Parts', price: 1200, inStock: true },
        { name: 'Hand Tools Set', price: 450, inStock: true }
      ],
      offers: ['Extended warranty on tools'],
      image: '/placeholder.svg'
    }
  ];

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shop.speciality.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || shop.categories.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleGetDirections = (shopId: string) => {
    // In a real app, this would open maps with directions
    const shop = shops.find(s => s.id === shopId);
    alert(`Getting directions to ${shop?.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 px-6 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/home')}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Nearby Shops</h1>
              <p className="text-blue-100 text-sm">Find agricultural stores near you</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
              <Filter className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <Navigation className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6 pb-24">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search shops, products, speciality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-4 text-base bg-white border-0 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Location Banner */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Current Location</h3>
                <p className="text-gray-600 text-sm">Village Rampur, Dist. Hardoi, UP</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 rounded-xl"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Change
            </Button>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {shopCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedFilter(category.id)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-2xl whitespace-nowrap transition-all shadow-sm ${
                selectedFilter === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm font-semibold">{category.name}</span>
              <Badge 
                variant="outline" 
                className={`ml-1 text-xs ${
                  selectedFilter === category.id 
                    ? 'bg-white/20 border-white/30 text-white' 
                    : 'bg-gray-100 border-gray-300 text-gray-600'
                }`}
              >
                {category.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-5 text-center shadow-lg border border-blue-200">
            <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Store className="w-6 h-6 text-blue-700" />
            </div>
            <p className="text-2xl font-bold text-blue-900 mb-1">{filteredShops.length}</p>
            <p className="text-sm font-semibold text-blue-700">Shops Found</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-5 text-center shadow-lg border border-green-200">
            <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Truck className="w-6 h-6 text-green-700" />
            </div>
            <p className="text-2xl font-bold text-green-900 mb-1">
              {filteredShops.filter(s => s.delivery).length}
            </p>
            <p className="text-sm font-semibold text-green-700">With Delivery</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-5 text-center shadow-lg border border-orange-200">
            <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-orange-700" />
            </div>
            <p className="text-2xl font-bold text-orange-900 mb-1">
              {filteredShops.filter(s => s.isOpen).length}
            </p>
            <p className="text-sm font-semibold text-orange-700">Open Now</p>
          </div>
        </div>

        {/* Shops List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-text-secondary">
              {selectedFilter === 'all' ? 'All Shops' : shopCategories.find(c => c.id === selectedFilter)?.name}
            </h2>
            <span className="text-sm text-agri-gray">{filteredShops.length} shops</span>
          </div>

          {filteredShops.length > 0 ? (
            filteredShops.map((shop) => (
              <div key={shop.id} className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                {/* Shop Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center shadow-sm">
                      <Store className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-text-secondary">{shop.name}</h3>
                        {shop.verified && (
                          <CheckCircle className="w-4 h-4 text-agri-success" />
                        )}
                      </div>
                      <p className="text-sm text-agri-gray mb-1">{shop.speciality}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{shop.rating}</span>
                        </div>
                        <span className="text-sm text-agri-gray">({shop.reviews})</span>
                        <span className="text-sm text-agri-gray">•</span>
                        <span className="text-sm font-medium text-agri-primary">{shop.distance} km</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={shop.isOpen ? 'bg-agri-success text-white' : 'bg-agri-danger text-white'}>
                      {shop.isOpen ? 'Open' : 'Closed'}
                    </Badge>
                    <button>
                      <MoreVertical className="w-5 h-5 text-agri-gray" />
                    </button>
                  </div>
                </div>

                {/* Address & Timing */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 mb-4 border border-gray-100">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-text-secondary text-sm">{shop.address}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-agri-gray">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{shop.openTime} - {shop.closeTime}</span>
                        </div>
                        {shop.delivery && (
                          <div className="flex items-center space-x-1">
                            <Truck className="w-4 h-4" />
                            <span>Delivery</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Products */}
                <div className="mb-4">
                  <h4 className="font-medium text-text-secondary mb-3">Available Products</h4>
                  <div className="space-y-2">
                    {shop.products.slice(0, 2).map((product, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-agri-light-gray last:border-b-0">
                        <div>
                          <p className="font-medium text-text-secondary text-sm">{product.name}</p>
                          <p className="text-xs text-agri-gray">₹{product.price}</p>
                        </div>
                        <Badge variant="outline" className={`text-xs ${
                          product.inStock 
                            ? 'border-agri-success text-agri-success' 
                            : 'border-agri-danger text-agri-danger'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Offers */}
                {shop.offers.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-text-secondary mb-2">Special Offers</h4>
                    <div className="space-y-1">
                      {shop.offers.map((offer, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-agri-warning rounded-full" />
                          <p className="text-sm text-agri-gray">{offer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button 
                    onClick={() => handleCall(shop.phone)}
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-md"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Shop
                  </Button>
                  
                  <Button 
                    onClick={() => handleGetDirections(shop.id)}
                    variant="outline" 
                    size="sm" 
                    className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold rounded-xl"
                  >
                    <Route className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                  
                  <button className="p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Products Link */}
                <button 
                  onClick={() => navigate(`/shops/${shop.id}/products`)}
                  className="w-full mt-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl flex items-center justify-between hover:from-blue-100 hover:to-green-100 transition-all border border-blue-200"
                >
                  <span className="text-sm font-bold text-blue-700">View All Products</span>
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Store className="w-16 h-16 text-agri-gray mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-secondary mb-2">No shops found</h3>
              <p className="text-agri-gray mb-6">Try adjusting your search or browse different categories</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                variant="outline"
                className="border-agri-primary text-agri-primary hover:bg-agri-light"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-text-secondary mb-4">Need Help Finding Shops?</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-agri-light rounded-xl hover:bg-agri-light-gray transition-colors">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-agri-primary" />
                <span className="font-medium text-text-secondary">Call Support</span>
              </div>
              <span className="text-sm text-agri-gray">1800-123-4567</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-agri-light rounded-xl hover:bg-agri-light-gray transition-colors">
              <div className="flex items-center space-x-3">
                <Store className="w-5 h-5 text-agri-primary" />
                <span className="font-medium text-text-secondary">Register Your Shop</span>
              </div>
              <span className="text-sm text-agri-primary">Free</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyShops;