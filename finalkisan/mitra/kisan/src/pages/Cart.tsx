import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2,
  Tag,
  Truck,
  ShoppingBag,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cartManager, CartItem } from '@/lib/cart';

const Cart = () => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
    const unsubscribe = cartManager.onCartChange(() => {
      loadCart();
    });
    return unsubscribe;
  }, []);

  const loadCart = () => {
    setCartItems(cartManager.getCart());
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    cartManager.updateQuantity(id, newQuantity);
  };

  const removeItem = (id: string) => {
    cartManager.deleteItem(id);
  };

  const applyPromoCode = () => {
    if (promoCode === 'FARMER10') {
      setAppliedPromo(promoCode);
      setPromoCode('');
    }
  };

  const subtotal = cartManager.getCartSubtotal();
  const savings = cartManager.getCartSavings();
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const deliveryFee = subtotal >= 500 ? 0 : 40;
  const total = subtotal - discount + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="mobile-container bg-background">
        <div className="mobile-header">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate('/shop')}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-text-secondary">Cart</h1>
          </div>
        </div>

        <div className="mobile-content flex flex-col items-center justify-center min-h-[60vh]">
          <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 text-center">Add some products to get started</p>
          <Button 
            onClick={() => navigate('/shop')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <div className="mobile-header">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/shop')}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-text-secondary">Cart ({cartItems.length})</h1>
        </div>
      </div>

      <div className="mobile-content space-y-6 pt-4">
        {/* Delivery Info */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <Truck className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">
                {deliveryFee === 0 ? 'Free Delivery!' : `₹${40 - (subtotal/500*40)} more for free delivery`}
              </p>
              <p className="text-sm text-green-600">
                {deliveryFee === 0 ? 'Your order qualifies for free delivery' : 'Add more items to get free delivery'}
              </p>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-green-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.brand} • {item.size}</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                        <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Save ₹{item.originalPrice - item.price}
                        </Badge>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="font-semibold text-gray-900 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-500">₹{item.price} each</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-3">
            <Tag className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Promo Code</h3>
          </div>
          
          {appliedPromo ? (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-600 text-white">{appliedPromo}</Badge>
                <span className="text-sm text-green-700">10% discount applied</span>
              </div>
              <button 
                onClick={() => setAppliedPromo('')}
                className="text-sm text-green-600 hover:text-green-800"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={applyPromoCode}
                variant="outline"
                className="border-green-600 text-green-600"
              >
                Apply
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span className="font-medium">₹{subtotal}</span>
            </div>
            
            {savings > 0 && (
              <div className="flex justify-between text-green-600">
                <span>You saved</span>
                <span className="font-medium">-₹{savings}</span>
              </div>
            )}
            
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Promo discount</span>
                <span className="font-medium">-₹{discount}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery fee</span>
              <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-green-600">₹{total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <Shield className="w-4 h-4" />
          <span className="text-sm">100% Secure Checkout</span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button 
          onClick={() => {
            // Pass cart data to checkout
            navigate('/checkout', { 
              state: { 
                cartItems,
                subtotal,
                savings,
                discount,
                deliveryFee,
                total,
                appliedPromo
              }
            })
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold"
        >
          Proceed to Checkout • ₹{total}
        </Button>
      </div>
    </div>
  );
};

export default Cart;