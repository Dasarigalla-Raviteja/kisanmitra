
import { useState, useEffect } from 'react';
import { X, Bell, Package, TrendingUp, AlertCircle, CheckCircle, Clock, MessageCircle, Trash2, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'market_request',
      title: 'Market Request Accepted!',
      message: 'FreshMart has accepted your tomatoes order for ₹800',
      time: '2 minutes ago',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      unread: true
    },
    {
      id: 2,
      type: 'price_alert',
      title: 'Price Alert',
      message: 'Tomato prices increased by ₹3/kg in your area',
      time: '1 hour ago',
      icon: TrendingUp,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      unread: true
    },
    {
      id: 3,
      type: 'treatment_reminder',
      title: 'Treatment Reminder',
      message: 'Time to apply fungicide to your wheat crop',
      time: '3 hours ago',
      icon: AlertCircle,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      unread: true
    },
    {
      id: 4,
      type: 'order_delivered',
      title: 'Order Delivered',
      message: 'Your fertilizer order has been delivered successfully',
      time: 'Yesterday',
      icon: Package,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      unread: false
    },
    {
      id: 5,
      type: 'buyer_inquiry',
      title: 'New Buyer Inquiry',
      message: 'Someone is interested in your green chilies listing',
      time: '2 days ago',
      icon: MessageCircle,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      unread: false
    },
    {
      id: 6,
      type: 'weather_alert',
      title: 'Weather Alert',
      message: 'Heavy rain expected tomorrow. Protect your crops',
      time: '2 days ago',
      icon: AlertCircle,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      unread: false
    }
  ]);

  // Load notifications from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('kisanmitra_notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kisanmitra_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
    localStorage.removeItem('kisanmitra_notifications');
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-sm h-full overflow-hidden shadow-xl animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-6 h-6" />
              <h2 className="text-xl font-bold">Notifications</h2>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="p-4 space-y-4 pb-20">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                  notification.unread 
                    ? 'border-green-200 bg-green-50/50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${notification.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <notification.icon className={`w-5 h-5 ${notification.iconColor}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {notification.title}
                      </h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center space-x-1 mt-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{notification.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-4 space-y-2">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-1 text-sm"
              onClick={handleMarkAllRead}
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 text-sm text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleClearAll}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
