import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  Phone,
  Star,
  RotateCcw,
  ShoppingBag,
  HelpCircle,
  ChevronRight,
  X,
  ArrowLeft
} from 'lucide-react';
import { cartManager, Order } from '@/lib/cart';

const FarmerOrdersPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const allOrders = cartManager.getOrders();
    setOrders(allOrders);
  };

  const handleReorder = (order: Order) => {
    // Add all items from the order back to cart
    order.items.forEach(item => {
      cartManager.addToCart(item);
    });
    navigate('/cart');
  };

  const handleTrackOrder = (orderId: string) => {
    // In a real app, this would navigate to a tracking page
    alert(`Tracking order ${orderId}`);
  };

  const getItemIcon = (category: string) => {
    const icons = {
      fertilizers: '🌱',
      seeds: '🍅',
      pesticides: '🧪',
      tools: '🔧'
    };
    return icons[category] || '🌱';
  };

  // Calculate summary stats
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  // Filter orders based on active filter
  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);

  // Status configuration
  const statusConfig = {
    delivered: { color: 'bg-green-500', textColor: 'text-green-500', icon: CheckCircle, bgLight: 'bg-green-50' },
    shipped: { color: 'bg-blue-500', textColor: 'text-blue-500', icon: Truck, bgLight: 'bg-blue-50' },
    processing: { color: 'bg-orange-500', textColor: 'text-orange-500', icon: Clock, bgLight: 'bg-orange-50' },
    cancelled: { color: 'bg-red-500', textColor: 'text-red-500', icon: X, bgLight: 'bg-red-50' }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderStatusBadge = (status) => {
    const config = statusConfig[status];
    const IconComponent = config.icon;
    return (
      <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${config.color} text-white text-sm font-medium`}>
        <IconComponent className="w-4 h-4" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  const renderActionButtons = (order: Order) => {
    const buttons = [];
    
    if (order.status === 'shipped' || order.status === 'processing') {
      buttons.push(
        <button 
          key="track" 
          onClick={() => handleTrackOrder(order.id)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          <Truck className="w-4 h-4" />
          Track Order
        </button>
      );
    }
    
    if (order.status === 'delivered') {
      buttons.push(
        <button key="review" className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition-colors">
          <Star className="w-4 h-4" />
          Rate & Review
        </button>
      );
    }
    
    buttons.push(
      <button 
        key="reorder" 
        onClick={() => handleReorder(order)}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Reorder
      </button>
    );

    return (
      <div className="flex gap-2 flex-wrap">
        {buttons}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-3 mb-2">
            <button 
              onClick={() => navigate('/home')}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          </div>
          <p className="text-gray-600 text-sm">Track your agricultural purchases</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-blue-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{deliveredOrders}</div>
            <div className="text-sm text-gray-600">Delivered</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{totalSpent.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'processing', 'shipped', 'delivered'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {formatDate(order.orderDate)}</p>
                  </div>
                  {renderStatusBadge(order.status)}
                </div>

                {/* Products */}
                <div className="space-y-3 mb-4">
                  {order.items.slice(0, 2).map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                          <span className="text-lg">{getItemIcon(product.category)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.quantity} x ₹{product.price}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">₹{product.price * product.quantity}</p>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <button className="text-sm text-green-500 font-medium">
                      + {order.items.length - 2} more items
                    </button>
                  )}
                </div>

                {/* Total Amount */}
                <div className="flex justify-between items-center py-3 border-t border-gray-100">
                  <span className="font-semibold text-gray-900">Total Amount</span>
                  <span className="text-lg font-bold text-green-600">₹{order.total}</span>
                </div>

                {/* Address & Delivery Info */}
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{order.address}</p>
                      {order.status === 'delivered' && order.deliveryDate && (
                        <p className="text-sm text-green-600 mt-1">
                          Delivered on {formatDate(order.deliveryDate)}
                        </p>
                      )}
                      {order.status !== 'delivered' && order.estimatedDelivery && (
                        <p className="text-sm text-blue-600 mt-1">
                          Expected by {formatDate(order.estimatedDelivery)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {renderActionButtons(order)}
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Start shopping for agricultural supplies today!</p>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition-colors"
            >
              Shop Now
            </button>
          </div>
        )}

        {/* Support Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
          </div>
          
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500" />
                <span className="font-medium text-gray-900">Contact Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-green-500" />
                <span className="font-medium text-gray-900">Return Policy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerOrdersPage;