// Cart state management using localStorage
export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  quantity: number;
  size: string;
  category: string;
  features: string[];
  inStock: boolean;
}

export interface Order {
  id: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  orderDate: string;
  estimatedDelivery?: string;
  deliveryDate?: string;
  address: string;
  paymentMethod: string;
}

class CartManager {
  private static instance: CartManager;
  private cartKey = 'hariyali_mitra_cart';
  private ordersKey = 'hariyali_mitra_orders';

  static getInstance(): CartManager {
    if (!CartManager.instance) {
      CartManager.instance = new CartManager();
    }
    return CartManager.instance;
  }

  // Cart operations
  getCart(): CartItem[] {
    try {
      const cart = localStorage.getItem(this.cartKey);
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  }

  addToCart(product: any): void {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity: 1,
        size: product.size,
        category: product.category,
        features: product.features,
        inStock: product.inStock
      };
      cart.push(cartItem);
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.notifyCartChange();
  }

  removeFromCart(productId: string): void {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      const index = cart.findIndex(item => item.id === productId);
      if (index > -1) {
        cart.splice(index, 1);
      }
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.notifyCartChange();
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.deleteItem(productId);
      return;
    }

    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity = quantity;
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
      this.notifyCartChange();
    }
  }

  deleteItem(productId: string): void {
    const cart = this.getCart();
    const filteredCart = cart.filter(item => item.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(filteredCart));
    this.notifyCartChange();
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.notifyCartChange();
  }

  getCartCount(): number {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartSubtotal(): number {
    return this.getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartSavings(): number {
    return this.getCart().reduce((total, item) => total + ((item.originalPrice - item.price) * item.quantity), 0);
  }

  // Order operations
  getOrders(): Order[] {
    try {
      const orders = localStorage.getItem(this.ordersKey);
      return orders ? JSON.parse(orders) : [];
    } catch {
      return [];
    }
  }

  createOrder(orderData: {
    address: string;
    paymentMethod: string;
    discount?: number;
  }): Order {
    const cart = this.getCart();
    if (cart.length === 0) {
      throw new Error('Cart is empty');
    }

    const subtotal = this.getCartSubtotal();
    const discount = orderData.discount || 0;
    const deliveryFee = subtotal >= 500 ? 0 : 40;
    const total = subtotal - discount + deliveryFee;

    const orderId = 'ORD' + Date.now();
    const orderDate = new Date().toISOString();
    const estimatedDelivery = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // Tomorrow

    const order: Order = {
      id: orderId,
      status: 'processing',
      items: [...cart],
      subtotal,
      discount,
      deliveryFee,
      total,
      orderDate,
      estimatedDelivery,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod
    };

    const orders = this.getOrders();
    orders.unshift(order); // Add to beginning
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));

    // Clear cart after successful order
    this.clearCart();

    return order;
  }

  updateOrderStatus(orderId: string, status: Order['status']): void {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
      order.status = status;
      if (status === 'delivered') {
        order.deliveryDate = new Date().toISOString();
      }
      localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    }
  }

  // Event system for cart changes
  private notifyCartChange(): void {
    window.dispatchEvent(new CustomEvent('cartChanged'));
  }

  // Subscribe to cart changes
  onCartChange(callback: () => void): () => void {
    const handler = () => callback();
    window.addEventListener('cartChanged', handler);
    
    // Return unsubscribe function
    return () => window.removeEventListener('cartChanged', handler);
  }
}

export const cartManager = CartManager.getInstance();