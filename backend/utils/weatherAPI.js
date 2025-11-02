const axios = require('axios');

// Fetch weather data from OpenWeatherMap API
async function fetchWeatherData(latitude, longitude, days = 7) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenWeatherMap API key not configured');
    }

    // Fetch current weather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const currentResponse = await axios.get(currentWeatherUrl);
    const currentData = currentResponse.data;

    // Fetch forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&cnt=${days * 8}`; // 8 data points per day
    const forecastResponse = await axios.get(forecastUrl);
    const forecastData = forecastResponse.data;

    // Process current weather
    const current = {
      temperature: currentData.main.temp,
      feelsLike: currentData.main.feels_like,
      humidity: currentData.main.humidity,
      pressure: currentData.main.pressure,
      windSpeed: currentData.wind.speed,
      windDirection: currentData.wind.deg,
      cloudCover: currentData.clouds.all,
      visibility: currentData.visibility,
      uvIndex: 0, // Requires separate API call
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
    };

    // Process forecast (aggregate daily data)
    const forecast = processForecastData(forecastData.list);

    // Calculate agricultural data
    const agricultural = calculateAgriculturalData(current, forecast);

    return {
      location: {
        city: currentData.name,
        country: currentData.sys.country,
        coordinates: {
          latitude,
          longitude,
        },
      },
      current,
      forecast,
      agricultural,
      alerts: [], // Requires separate API call or OneCall API
      source: 'OpenWeatherMap',
      lastUpdated: new Date(),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    
    // Return mock data if API fails
    return getMockWeatherData(latitude, longitude);
  }
}

function processForecastData(forecastList) {
  const dailyData = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0];

    if (!dailyData[dateKey]) {
      dailyData[dateKey] = {
        date: date,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        temps: [],
        humidity: [],
        precipitation: 0,
        precipProb: 0,
        windSpeed: [],
        descriptions: [],
        icons: [],
      };
    }

    dailyData[dateKey].temps.push(item.main.temp);
    dailyData[dateKey].humidity.push(item.main.humidity);
    dailyData[dateKey].windSpeed.push(item.wind.speed);
    dailyData[dateKey].descriptions.push(item.weather[0].description);
    dailyData[dateKey].icons.push(item.weather[0].icon);

    if (item.rain) {
      dailyData[dateKey].precipitation += item.rain['3h'] || 0;
    }
    if (item.pop) {
      dailyData[dateKey].precipProb = Math.max(dailyData[dateKey].precipProb, item.pop * 100);
    }
  });

  return Object.values(dailyData).map((day) => ({
    date: day.date,
    day: day.day,
    tempMin: Math.min(...day.temps),
    tempMax: Math.max(...day.temps),
    humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
    precipitation: Math.round(day.precipitation * 10) / 10,
    precipitationProbability: Math.round(day.precipProb),
    windSpeed: Math.round((day.windSpeed.reduce((a, b) => a + b, 0) / day.windSpeed.length) * 10) / 10,
    description: day.descriptions[Math.floor(day.descriptions.length / 2)],
    icon: day.icons[Math.floor(day.icons.length / 2)],
  }));
}

function calculateAgriculturalData(current, forecast) {
  // Calculate growing degree days (base temperature 10°C)
  const baseTemp = 10;
  let gdd = 0;
  
  forecast.forEach((day) => {
    const avgTemp = (day.tempMax + day.tempMin) / 2;
    if (avgTemp > baseTemp) {
      gdd += avgTemp - baseTemp;
    }
  });

  // Estimate soil conditions
  const soilTemperature = current.temperature - 2; // Rough estimate
  const soilMoisture = current.humidity > 70 ? 80 : current.humidity < 40 ? 30 : 60;
  
  // Calculate evapotranspiration (simplified Penman equation)
  const et = calculateET(current.temperature, current.humidity, current.windSpeed);

  // Generate warnings
  const frostWarning = current.temperature < 5 || forecast.some(day => day.tempMin < 5);
  const heatStress = current.temperature > 38 || forecast.some(day => day.tempMax > 38);

  // Generate recommendations
  const recommendations = [];
  if (frostWarning) {
    recommendations.push('Frost warning: Protect sensitive crops with covers or mulching');
  }
  if (heatStress) {
    recommendations.push('Heat stress alert: Increase irrigation frequency');
  }
  if (current.humidity < 40) {
    recommendations.push('Low humidity: Monitor crops for water stress');
  }
  if (forecast.some(day => day.precipitation > 50)) {
    recommendations.push('Heavy rainfall expected: Ensure proper field drainage');
  }

  return {
    soilTemperature: Math.round(soilTemperature * 10) / 10,
    soilMoisture,
    evapotranspiration: Math.round(et * 10) / 10,
    growingDegreeDays: Math.round(gdd),
    frostWarning,
    heatStress,
    recommendations,
  };
}

function calculateET(temp, humidity, windSpeed) {
  // Simplified ET calculation (mm/day)
  return 0.5 * (temp / 5) * (1 - humidity / 100) + (windSpeed / 10);
}

function getMockWeatherData(latitude, longitude) {
  // Return mock data when API is unavailable
  return {
    location: {
      city: 'Unknown',
      country: 'Unknown',
      coordinates: { latitude, longitude },
    },
    current: {
      temperature: 28,
      feelsLike: 30,
      humidity: 65,
      pressure: 1013,
      windSpeed: 3.5,
      windDirection: 180,
      cloudCover: 40,
      visibility: 10000,
      uvIndex: 6,
      description: 'Partly cloudy',
      icon: '02d',
    },
    forecast: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
      tempMin: 22 + Math.random() * 3,
      tempMax: 32 + Math.random() * 3,
      humidity: 60 + Math.random() * 20,
      precipitation: Math.random() * 10,
      precipitationProbability: Math.random() * 100,
      windSpeed: 2 + Math.random() * 3,
      description: 'Partly cloudy',
      icon: '02d',
    })),
    agricultural: {
      soilTemperature: 26,
      soilMoisture: 65,
      evapotranspiration: 4.5,
      growingDegreeDays: 126,
      frostWarning: false,
      heatStress: false,
      recommendations: ['Weather data unavailable. Using estimated values.'],
    },
    alerts: [],
    source: 'Mock Data',
    lastUpdated: new Date(),
  };
}

module.exports = { fetchWeatherData };
