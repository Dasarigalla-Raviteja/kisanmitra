import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20 rounded-full p-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="text-xl font-bold text-white">Page Not Found</h1>
          
          <div className="w-12" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center p-8">
          <div className="text-8xl mb-6">🌾</div>
          <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! This page doesn't exist</p>
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl flex items-center space-x-2 mx-auto"
            >
              <Home className="w-5 h-5" />
              <span>Return to Home</span>
            </Button>
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-2xl flex items-center space-x-2 mx-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
