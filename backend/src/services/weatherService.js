const axios = require('axios');

class WeatherService {
  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
    this.baseUrl = process.env.WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5';
  }

  // Get current weather by coordinates
  async getCurrentWeather(lat, lon) {
    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric',
        },
      });

      return this.formatCurrentWeather(response.data);
    } catch (error) {
      console.error('Error fetching current weather:', error.message);
      throw new Error('Failed to fetch current weather data');
    }
  }

  // Get weather forecast
  async getWeatherForecast(lat, lon, days = 7) {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric',
          cnt: days * 8, // 8 data points per day (3-hour intervals)
        },
      });

      return this.formatForecast(response.data);
    } catch (error) {
      console.error('Error fetching weather forecast:', error.message);
      throw new Error('Failed to fetch weather forecast');
    }
  }

  // Get weather by city name
  async getWeatherByCity(city, country = '') {
    try {
      const query = country ? `${city},${country}` : city;
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          q: query,
          appid: this.apiKey,
          units: 'metric',
        },
      });

      return this.formatCurrentWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather by city:', error.message);
      throw new Error('Failed to fetch weather data for the specified city');
    }
  }

  // Format current weather data
  formatCurrentWeather(data) {
    return {
      location: {
        name: data.name,
        country: data.sys.country,
        coordinates: [data.coord.lon, data.coord.lat],
      },
      current: {
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        cloudiness: data.clouds.all,
        visibility: data.visibility,
        rainfall: data.rain ? data.rain['1h'] || 0 : 0,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      },
      timestamp: new Date(data.dt * 1000),
    };
  }

  // Format forecast data
  formatForecast(data) {
    const dailyData = {};

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();

      if (!dailyData[date]) {
        dailyData[date] = {
          date: new Date(item.dt * 1000),
          temperatures: [],
          humidity: [],
          windSpeed: [],
          rainfall: 0,
          descriptions: [],
          icon: item.weather[0].icon,
        };
      }

      dailyData[date].temperatures.push(item.main.temp);
      dailyData[date].humidity.push(item.main.humidity);
      dailyData[date].windSpeed.push(item.wind.speed);
      dailyData[date].rainfall += item.rain ? item.rain['3h'] || 0 : 0;
      dailyData[date].descriptions.push(item.weather[0].description);
    });

    const daily = Object.values(dailyData).map((day) => ({
      date: day.date,
      temperature: {
        min: Math.min(...day.temperatures),
        max: Math.max(...day.temperatures),
      },
      humidity: Math.round(day.humidity.reduce((a, b) => a + b) / day.humidity.length),
      windSpeed: Math.round(day.windSpeed.reduce((a, b) => a + b) / day.windSpeed.length),
      rainfall: Math.round(day.rainfall * 10) / 10,
      description: day.descriptions[0],
      icon: day.icon,
    }));

    return {
      location: {
        name: data.city.name,
        country: data.city.country,
        coordinates: [data.city.coord.lon, data.city.coord.lat],
      },
      daily,
    };
  }

  // Generate agricultural advice based on weather
  generateAgriculturalAdvice(weatherData) {
    const advice = {
      irrigation: '',
      pestControl: '',
      harvesting: '',
      general: '',
    };

    const temp = weatherData.current.temperature;
    const humidity = weatherData.current.humidity;
    const rainfall = weatherData.current.rainfall;

    // Irrigation advice
    if (rainfall > 10) {
      advice.irrigation = 'Heavy rainfall expected. Avoid irrigation and ensure proper drainage.';
    } else if (rainfall > 5) {
      advice.irrigation = 'Moderate rainfall expected. Reduce irrigation accordingly.';
    } else if (temp > 35) {
      advice.irrigation = 'High temperature. Increase irrigation frequency, preferably in early morning or evening.';
    } else if (humidity < 40) {
      advice.irrigation = 'Low humidity. Monitor soil moisture and irrigate as needed.';
    } else {
      advice.irrigation = 'Normal irrigation schedule can be maintained.';
    }

    // Pest control advice
    if (humidity > 80 && temp > 20 && temp < 30) {
      advice.pestControl = 'High humidity and moderate temperature favor pest activity. Monitor crops closely.';
    } else if (rainfall > 0) {
      advice.pestControl = 'Rainfall may wash away pesticides. Reapply after rain if necessary.';
    } else {
      advice.pestControl = 'Regular monitoring recommended. Weather conditions are moderate.';
    }

    // Harvesting advice
    if (rainfall > 5) {
      advice.harvesting = 'Avoid harvesting during or immediately after rainfall to prevent crop damage.';
    } else if (humidity < 60 && rainfall === 0) {
      advice.harvesting = 'Good conditions for harvesting. Dry weather will help in proper drying.';
    } else {
      advice.harvesting = 'Monitor weather closely before planning harvest operations.';
    }

    // General advice
    if (temp > 40) {
      advice.general = 'Extreme heat warning. Protect crops from heat stress and ensure adequate water supply.';
    } else if (temp < 10) {
      advice.general = 'Cold weather alert. Protect sensitive crops from frost damage.';
    } else {
      advice.general = 'Weather conditions are favorable for normal farming operations.';
    }

    return advice;
  }
}

module.exports = new WeatherService();
