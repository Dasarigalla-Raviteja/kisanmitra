import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Thermometer, Droplets, Wind, Eye, Sunrise, Sunset, AlertTriangle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { weatherService, WeatherData, DailyForecast } from '@/lib/weather';

const Weather = () => {
  const navigate = useNavigate();
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState({ lat: 0, lon: 0 });

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get current location first
      try {
        const currentLocation = await weatherService.getCurrentLocation();
        setLocation(currentLocation);
        
        // Fetch current weather and forecast
        const [weather, forecastData] = await Promise.all([
          weatherService.getCurrentWeather(currentLocation.lat, currentLocation.lon),
          weatherService.getForecast(currentLocation.lat, currentLocation.lon)
        ]);
        
        setCurrentWeather(weather);
        setForecast(forecastData);
      } catch (locationError) {
        // If location access fails, use a default location (Delhi, India)
        console.warn('Location access failed, using default location');
        const defaultWeather = await weatherService.getWeatherByCity('Delhi, IN');
        const defaultForecast = await weatherService.getForecast(28.6139, 77.2090); // Delhi coordinates
        
        setCurrentWeather(defaultWeather);
        setForecast(defaultForecast);
      }
    } catch (err) {
      setError('Unable to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherAdvice = (weather: WeatherData) => {
    return weatherService.generateFarmingAdvice(weather);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-green-700"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-green-800">Weather Forecast</h1>
            <div className="w-16" />
          </div>
          
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="h-8 w-8 animate-spin text-green-600" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-green-700"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-green-800">Weather Forecast</h1>
            <div className="w-16" />
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={loadWeatherData} variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-green-700"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </Button>
          <h1 className="text-xl font-bold text-green-800">Weather Forecast</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadWeatherData}
            className="text-green-700"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>

        {/* Current Weather */}
        {currentWeather && (
          <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{currentWeather.location}</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {currentWeather.temperature}°C
                  </div>
                  <div className="text-sm opacity-90 capitalize">
                    {currentWeather.description}
                  </div>
                  <div className="text-sm opacity-90">
                    Feels like {currentWeather.feelsLike}°C
                  </div>
                </div>
                <img
                  src={weatherService.getWeatherIconUrl(currentWeather.icon)}
                  alt={currentWeather.description}
                  className="h-20 w-20"
                />
              </div>

              {/* Weather Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Droplets className="h-4 w-4 mr-2" />
                  <span>Humidity: {currentWeather.humidity}%</span>
                </div>
                <div className="flex items-center">
                  <Wind className="h-4 w-4 mr-2" />
                  <span>Wind: {currentWeather.windSpeed} m/s</span>
                </div>
                <div className="flex items-center">
                  <Thermometer className="h-4 w-4 mr-2" />
                  <span>Pressure: {currentWeather.pressure} hPa</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  <span>Visibility: {currentWeather.visibility} km</span>
                </div>
              </div>

              {/* Sun Times */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center">
                  <Sunrise className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    Sunrise: {formatTime(currentWeather.sunrise)}
                  </span>
                </div>
                <div className="flex items-center">
                  <Sunset className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    Sunset: {formatTime(currentWeather.sunset)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Farming Advice */}
        {currentWeather && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-green-800">🌾 Farming Advice</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-green-700">
                {getWeatherAdvice(currentWeather)}
              </p>
            </CardContent>
          </Card>
        )}

        {/* 7-Day Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">7-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {forecast.map((day, index) => (
              <div
                key={day.date}
                className={`p-4 flex items-center justify-between ${
                  index !== forecast.length - 1 ? 'border-b border-gray-100' : ''
                } ${index === 0 ? 'bg-green-50' : ''}`}
              >
                <div className="flex items-center flex-1">
                  <img
                    src={weatherService.getWeatherIconUrl(day.icon)}
                    alt={day.description}
                    className="h-10 w-10 mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      {index === 0 ? 'Today' : day.dayName}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {day.description}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-gray-800">
                    {day.temperature.max}°/{day.temperature.min}°
                  </div>
                  <div className="text-xs text-gray-500">
                    {day.humidity}% humidity
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Data provided by OpenWeatherMap
        </div>
      </div>
    </div>
  );
};

export default Weather;