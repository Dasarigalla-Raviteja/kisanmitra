// Weather service for fetching real weather data from OpenWeatherMap API

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  feelsLike: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  sunrise: number;
  sunset: number;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  temperature: {
    max: number;
    min: number;
  };
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export interface WeatherAlert {
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  type: string;
}

class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor() {
    // Get API key from environment variables
    this.apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY || process.env.OPENWEATHERMAP_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('OpenWeatherMap API key not found. Weather functionality will not work properly.');
    }
  }

  // Get API key - will be initialized in constructor
  private getApiKey(): string {
    if (!this.apiKey) {
      throw new Error('OpenWeatherMap API key not configured');
    }
    return this.apiKey;
  }

  // Get current weather by coordinates
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const apiKey = this.getApiKey();
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        location: `${data.name}, ${data.sys.country}`,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, // Convert to km
        uvIndex: 0, // Will be fetched from UV API if needed
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  }

  // Get 7-day forecast
  async getForecast(lat: number, lon: number): Promise<DailyForecast[]> {
    try {
      const apiKey = this.getApiKey();
      const response = await fetch(
        `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Group by day and take one forecast per day
      const dailyForecasts: DailyForecast[] = [];
      const processedDates = new Set();
      
      data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toISOString().split('T')[0];
        
        if (!processedDates.has(dateString) && dailyForecasts.length < 7) {
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          dailyForecasts.push({
            date: dateString,
            dayName,
            temperature: {
              max: Math.round(item.main.temp_max),
              min: Math.round(item.main.temp_min)
            },
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            precipitation: item.rain ? item.rain['3h'] || 0 : 0
          });
          
          processedDates.add(dateString);
        }
      });
      
      return dailyForecasts;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }

  // Get weather by city name
  async getWeatherByCity(city: string): Promise<WeatherData> {
    try {
      const apiKey = this.getApiKey();
      const response = await fetch(
        `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        location: `${data.name}, ${data.sys.country}`,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        visibility: data.visibility / 1000,
        uvIndex: 0,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      };
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw error;
    }
  }

  // Get current location using browser's geolocation API
  async getCurrentLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  // Get weather icon URL
  getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  // Get weather alerts (if available)
  async getWeatherAlerts(lat: number, lon: number): Promise<WeatherAlert[]> {
    try {
      const apiKey = this.getApiKey();
      // Using One Call API for alerts (requires different endpoint)
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      
      if (!response.ok) {
        return []; // No alerts or API issue
      }
      
      const data = await response.json();
      
      if (!data.alerts) {
        return [];
      }
      
      return data.alerts.map((alert: any) => ({
        title: alert.event,
        description: alert.description,
        severity: alert.severity || 'moderate',
        type: alert.tags?.[0] || 'general'
      }));
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
      return [];
    }
  }

  // Generate farming advice based on weather
  generateFarmingAdvice(weather: WeatherData): string {
    const { temperature, humidity, description } = weather;
    
    if (description.includes('rain')) {
      return 'Rain expected - avoid spraying chemicals and consider indoor farm work.';
    }
    
    if (temperature > 35) {
      return 'High temperature - increase irrigation and provide shade for crops.';
    }
    
    if (temperature < 5) {
      return 'Cold weather - protect sensitive crops and check livestock shelter.';
    }
    
    if (humidity > 80) {
      return 'High humidity - monitor crops for fungal diseases and improve ventilation.';
    }
    
    if (humidity < 30) {
      return 'Low humidity - increase watering frequency and consider mulching.';
    }
    
    return 'Good weather conditions for farming activities. Plan your field work accordingly.';
  }
}

export const weatherService = new WeatherService();