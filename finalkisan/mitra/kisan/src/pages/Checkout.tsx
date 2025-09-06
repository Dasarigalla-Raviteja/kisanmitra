import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Edit3,
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle,
  Clock,
  Shield,
  Truck,
  User,
  Phone
} from 'lucide-react';
import { cartManager } from '@/lib/cart';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Get cart data from location state or cart manager
  const cartData = location.state || {};
  const cartItems = cartData.cartItems || cartManager.getCart();
  const subtotal = cartData.subtotal || cartManager.getCartSubtotal();
  const discount = cartData.discount || 0;
  const deliveryFee = cartData.deliveryFee || (subtotal >= 500 ? 0 : 40);
  const total = cartData.total || (subtotal - discount + deliveryFee);

  const addresses = [
    {
      id: 'home',
      type: 'Home',
      name: 'Ramu Ji',
      address: 'Village Rampur, Dist. Hardoi, UP 241001',
      phone: '+91 98765 43210'
    },
    {
      id: 'farm',
      type: 'Farm',
      name: 'Ramu Ji',
      address: 'Plot No. 45, Sector 12, Village Rampur, UP 241001',
      phone: '+91 98765 43210'
    }
  ];

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using PhonePe, Google Pay, Paytm',
      icon: Smartphone,
      recommended: true,
      discount: 5
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay',
      icon: CreditCard,
      recommended: false,
      discount: 0
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive',
      icon: Banknote,
      recommended: false,
      discount: 0
    }
  ];

  const orderSummary = {
    items: cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price * item.quantity,
      image: item.category
    })),
    subtotal,
    discount,
    delivery: deliveryFee,
    total
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Get selected address
      const address = addresses.find(addr => addr.id === selectedAddress);
      const addressString = `${address?.name}, ${address?.address}`;
      
      // Create order
      const order = cartManager.createOrder({
        address: addressString,
        paymentMethod: selectedPayment,
        discount
      });
      
      // Navigate to order success page
      navigate('/order-success', { 
        state: { 
          orderId: order.id,
          order,
          selectedAddress: address
        } 
      });
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/cart')}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
          </div>
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Secure</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 pb-32">
        {/* Order Summary - Compact */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Order Summary</span>
            </h3>
            <span className="text-sm text-gray-500">{orderSummary.items.length} items</span>
          </div>
          
          <div className="space-y-3 mb-4">
            {orderSummary.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">{item.quantity}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{orderSummary.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span className="font-medium">-₹{orderSummary.discount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery</span>
              <span className="font-medium text-green-600">FREE</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-green-600">₹{orderSummary.total}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900">Delivery Address</h3>
            </div>
            <button className="text-green-600 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {addresses.map((address) => (
              <div key={address.id} className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                selectedAddress === address.id 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`} onClick={() => setSelectedAddress(address.id)}>
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 mt-1 ${
                    selectedAddress === address.id 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedAddress === address.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="font-semibold text-gray-900">{address.name}</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        {address.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{address.address}</p>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3 text-gray-500" />
                      <span className="text-sm text-gray-500">{address.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 p-4 border-2 border-dashed border-green-300 rounded-xl text-green-600 font-semibold hover:border-green-400 hover:bg-green-50 transition-colors">
            + Add New Address
          </button>
        </div>

        {/* Delivery Time */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900">Delivery Information</h3>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-green-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Expected Delivery</p>
                <p className="text-green-600 text-sm">Tomorrow by 6:00 PM</p>
                <p className="text-xs text-gray-500 mt-1">Free delivery on orders above ₹500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900">Payment Method</h3>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div 
                key={method.id} 
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  selectedPayment === method.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    selectedPayment === method.id 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedPayment === method.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedPayment === method.id ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <method.icon className={`w-5 h-5 ${
                      selectedPayment === method.id ? 'text-green-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{method.name}</span>
                      {method.recommended && (
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                          Recommended
                        </span>
                      )}
                      {method.discount > 0 && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                          {method.discount}% Off
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-5 border border-green-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-green-800">100% Secure Payment</p>
              <p className="text-sm text-green-600">Your payment information is protected with 256-bit SSL encryption</p>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <button 
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-5 h-5 animate-spin" />
              <span>Processing Payment...</span>
            </div>
          ) : (
            <div className="flex items-center justify-between px-4">
              <span>Place Order</span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-lg">₹{orderSummary.total}</span>
            </div>
          )}
        </button>
        <p className="text-center text-xs text-gray-500 mt-2">
          By placing this order, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
};

export default Checkout;