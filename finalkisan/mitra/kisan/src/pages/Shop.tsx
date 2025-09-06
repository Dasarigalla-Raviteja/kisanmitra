import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  ShoppingCart, 
  Star, 
  Heart,
  Plus,
  Minus,
  Package,
  Truck,
  Shield,
  Zap,
  Sparkles
} from 'lucide-react';
import { cartManager } from '@/lib/cart';

const Shop = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    updateCartDisplay();
    const unsubscribe = cartManager.onCartChange(() => {
      updateCartDisplay();
    });
    return unsubscribe;
  }, []);

  const updateCartDisplay = () => {
    const cart = cartManager.getCart();
    const itemCounts = {};
    cart.forEach(item => {
      itemCounts[item.id] = item.quantity;
    });
    setCartItems(itemCounts);
    setCartCount(cartManager.getCartCount());
    setCartTotal(cartManager.getCartTotal());
  };

  const categories = [
    { id: 'all', name: 'All Products', icon: Package },
    { id: 'fertilizers', name: 'Fertilizers', icon: Zap },
    { id: 'seeds', name: 'Seeds', icon: Package },
    { id: 'pesticides', name: 'Pesticides', icon: Shield },
    { id: 'tools', name: 'Tools', icon: Package }
  ];

  const products = [
    {
      id: '1',
      name: 'Organic NPK Fertilizer',
      brand: 'FarmGrow',
      price: 245,
      originalPrice: 299,
      rating: 4.5,
      reviews: 1243,
      category: 'fertilizers',
      inStock: true,
      bestseller: true,
      organic: true,
      size: '1kg',
      features: ['Organic', 'Fast Acting', 'All Crops']
    },
    {
      id: '2',
      name: 'Tomato Hybrid Seeds',
      brand: 'SeedMaster',
      price: 120,
      originalPrice: 150,
      rating: 4.8,
      reviews: 856,
      category: 'seeds',
      inStock: true,
      bestseller: false,
      organic: false,
      size: '50g',
      features: ['Hybrid', 'Disease Resistant', 'High Yield']
    },
    {
      id: '3',
      name: 'Copper Fungicide Spray',
      brand: 'CropCare',
      price: 180,
      originalPrice: 210,
      rating: 4.3,
      reviews: 634,
      category: 'pesticides',
      inStock: true,
      bestseller: false,
      organic: false,
      size: '500ml',
      features: ['Fungicide', 'Long Lasting', 'Safe']
    },
    {
      id: '4',
      name: 'Premium Garden Spade',
      brand: 'ToolMaster',
      price: 350,
      originalPrice: 420,
      rating: 4.6,
      reviews: 432,
      category: 'tools',
      inStock: false,
      bestseller: false,
      organic: false,
      size: 'Standard',
      features: ['Steel', 'Ergonomic', 'Durable']
    },
    {
      id: '5',
      name: 'Bio Compost Fertilizer',
      brand: 'EcoGrow',
      price: 180,
      originalPrice: 220,
      rating: 4.7,
      reviews: 965,
      category: 'fertilizers',
      inStock: true,
      bestseller: true,
      organic: true,
      size: '2kg',
      features: ['Bio-Compost', 'Soil Health', 'Eco-Friendly']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      cartManager.addToCart(product);
    }
  };

  const removeFromCart = (productId) => {
    cartManager.removeFromCart(productId);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const getTotalItems = () => {
    return cartCount;
  };

  const getDiscountPercentage = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/home')}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Shop</h1>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => navigate('/cart')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {getTotalItems() > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{getTotalItems()}</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 pb-24">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search fertilizers, seeds, tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 text-base bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm outline-none"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-3 overflow-x-auto pb-2" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-600'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Promo Banner */}
        <div className="relative bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-6 text-white overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <Truck className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Free Delivery</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Orders above ₹500</h2>
            <p className="text-green-100 text-sm leading-relaxed">
              Get premium agricultural products delivered free to your doorstep.
            </p>
          </div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white opacity-10 rounded-full" />
          <div className="absolute -right-16 -bottom-4 w-24 h-24 bg-white opacity-5 rounded-full" />
          <div className="absolute right-4 top-4 w-12 h-12 bg-white opacity-10 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredProducts.length} products
            </span>
          </div>

          {/* Product Grid */}
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex space-x-4">
                  {/* Product Image & Labels */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    
                    {/* Labels */}
                    <div className="absolute -top-2 -right-2 space-y-1">
                      {product.bestseller && (
                        <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-lg font-medium">
                          Bestseller
                        </div>
                      )}
                      {product.organic && (
                        <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-lg font-medium">
                          Organic
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {product.brand} • {product.size}
                        </p>
                        
                        {/* Rating */}
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                          </div>
                          <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                        </div>

                        {/* Feature Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-1 border border-green-200 text-green-700 bg-green-50 font-medium rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                          <span className="text-base text-gray-400 line-through">₹{product.originalPrice}</span>
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                            {getDiscountPercentage(product.originalPrice, product.price)}% OFF
                          </span>
                        </div>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            wishlist[product.id] 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-400 hover:text-red-400'
                          }`} 
                        />
                      </button>
                    </div>

                    {/* Add to Cart Section */}
                    <div className="flex items-center justify-end">
                      {product.inStock ? (
                        <div className="flex items-center space-x-3">
                          {cartItems[product.id] > 0 ? (
                            <div className="flex items-center space-x-3 bg-gray-50 rounded-full p-1">
                              <button
                                onClick={() => removeFromCart(product.id)}
                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                              >
                                <Minus className="w-4 h-4 text-gray-600" />
                              </button>
                              <span className="font-bold text-gray-900 min-w-[24px] text-center">
                                {cartItems[product.id]}
                              </span>
                              <button
                                onClick={() => addToCart(product.id)}
                                className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(product.id)}
                              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-red-600 border border-red-200 bg-red-50 px-3 py-1 rounded-full text-sm">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-6 left-4 right-4 z-50">
          <button 
            onClick={() => navigate('/cart')}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl shadow-2xl flex items-center justify-between text-lg font-bold px-6"
          >
            <span className="flex items-center space-x-3">
              <ShoppingCart className="w-6 h-6" />
              <span>View Cart ({getTotalItems()} items)</span>
            </span>
            <span>₹{cartTotal}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;