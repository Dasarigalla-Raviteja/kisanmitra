import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle,
  Package,
  Truck,
  Clock,
  MapPin,
  Phone,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;
  const orderId = orderData?.orderId || 'ORD' + Date.now();
  const order = orderData?.order;
  const selectedAddress = orderData?.selectedAddress;

  useEffect(() => {
    // Auto redirect to orders page after 10 seconds
    const timer = setTimeout(() => {
      navigate('/orders');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="mobile-container bg-green-50">
      <div className="mobile-content flex flex-col items-center justify-center min-h-screen text-center space-y-6 p-6">
        {/* Success Animation */}
        <div className="relative">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -inset-4 border-4 border-green-300 rounded-full animate-ping opacity-20"></div>
        </div>

        {/* Success Message */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-green-800">Order Placed Successfully!</h1>
          <p className="text-green-600">Thank you for your order. We'll take care of your farming needs.</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200 w-full max-w-sm">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-mono text-lg font-semibold text-gray-900">#{orderId}</p>
              {order && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Total: <span className="font-semibold text-green-600">₹{order.total}</span></p>
                  <p className="text-xs text-gray-500">{order.items.length} items</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-xs text-gray-500">Processing</p>
                <p className="text-sm font-medium text-green-600">In Progress</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">Shipping</p>
                <p className="text-sm font-medium text-gray-400">Pending</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">Delivered</p>
                <p className="text-sm font-medium text-gray-400">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-200 w-full max-w-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Estimated Delivery</p>
              <p className="text-sm text-blue-600">Tomorrow by 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-200 w-full max-w-sm">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Delivery Address</p>
              <p className="text-sm text-gray-600">
                {selectedAddress ? selectedAddress.address : order?.address || 'Village Rampur, Dist. Hardoi, UP 241001'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 w-full max-w-sm">
          <Button 
            onClick={() => navigate('/orders')}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
          >
            <Package className="w-5 h-5 mr-2" />
            Track Your Order
          </Button>

          <Button 
            onClick={() => navigate('/shop')}
            variant="outline"
            className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-xl"
          >
            Continue Shopping
          </Button>

          <button 
            onClick={() => navigate('/orders')}
            className="w-full flex items-center justify-center space-x-2 text-green-600 hover:text-green-700 py-2"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Download Invoice</span>
          </button>
        </div>

        {/* Support Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 w-full max-w-sm">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Need Help?</p>
              <p className="text-sm text-blue-600">Call us at 1800-123-4567</p>
            </div>
          </div>
        </div>

        {/* Auto Redirect Info */}
        <p className="text-xs text-gray-500">
          Redirecting to orders page in 10 seconds...
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;