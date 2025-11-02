const axios = require('axios');

/**
 * Farmonaut API Service
 * Integrates with Farmonaut Satellite and Weather Data API via RapidAPI
 */
class FarmonautService {
  constructor() {
    this.baseURL = 'https://farmonaut-satellite-and-weather-data1.p.rapidapi.com';
    this.apiKey = process.env.RAPIDAPI_KEY || '32b151886amsheb501736023c5d3p17b391jsn997344cf031d';
    this.apiHost = 'farmonaut-satellite-and-weather-data1.p.rapidapi.com';
  }

  /**
   * Get crop recommendations based on location and soil conditions
   * @param {Object} params - { latitude, longitude, soilType, season }
   * @returns {Promise} - Crop recommendations data
   */
  async getCropRecommendations(params) {
    try {
      const { latitude, longitude, soilType = 'loamy', season = 'kharif' } = params;
      
      const response = await axios.get(`${this.baseURL}/crop-recommendations`, {
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': this.apiHost
        },
        params: {
          lat: latitude,
          lon: longitude,
          soil_type: soilType,
          season: season
        }
      });

      return this.formatCropRecommendations(response.data, season);
    } catch (error) {
      console.error('Farmonaut API Error:', error.message);
      // Return fallback data if API fails
      return this.getFallbackCropRecommendations(params);
    }
  }

  /**
   * Get weather data for farming decisions
   * @param {Object} params - { latitude, longitude }
   * @returns {Promise} - Weather data
   */
  async getWeatherData(params) {
    try {
      const { latitude, longitude } = params;
      
      const response = await axios.get(`${this.baseURL}/weather`, {
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': this.apiHost
        },
        params: {
          lat: latitude,
          lon: longitude
        }
      });

      return this.formatWeatherData(response.data);
    } catch (error) {
      console.error('Farmonaut Weather API Error:', error.message);
      return this.getFallbackWeatherData(params);
    }
  }

  /**
   * Get fertilizer recommendations based on crop and soil
   * @param {Object} params - { cropType, soilType, nitrogen, phosphorus, potassium }
   * @returns {Promise} - Fertilizer recommendations
   */
  async getFertilizerRecommendations(params) {
    try {
      const { cropType, soilType, nitrogen = 0, phosphorus = 0, potassium = 0 } = params;
      
      const response = await axios.get(`${this.baseURL}/fertilizer-recommendations`, {
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': this.apiHost
        },
        params: {
          crop: cropType,
          soil_type: soilType,
          n: nitrogen,
          p: phosphorus,
          k: potassium
        }
      });

      return this.formatFertilizerRecommendations(response.data);
    } catch (error) {
      console.error('Farmonaut Fertilizer API Error:', error.message);
      return this.getFallbackFertilizerRecommendations(params);
    }
  }

  /**
   * Get satellite data for field monitoring
   * @param {Object} params - { latitude, longitude, fieldId }
   * @returns {Promise} - Satellite data
   */
  async getSatelliteData(params) {
    try {
      const { latitude, longitude, fieldId } = params;
      
      const response = await axios.get(`${this.baseURL}/satellite-data`, {
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': this.apiHost
        },
        params: {
          lat: latitude,
          lon: longitude,
          field_id: fieldId
        }
      });

      return response.data;
    } catch (error) {
      console.error('Farmonaut Satellite API Error:', error.message);
      return null;
    }
  }

  /**
   * Format crop recommendations response
   */
  formatCropRecommendations(data, season) {
    // If API returns data, format it properly
    if (data && data.recommendations) {
      return {
        success: true,
        season: season,
        recommendations: data.recommendations,
        metadata: {
          timestamp: new Date().toISOString(),
          source: 'Farmonaut API'
        }
      };
    }
    
    // Otherwise, return fallback
    return this.getFallbackCropRecommendations({ season });
  }

  /**
   * Format weather data response
   */
  formatWeatherData(data) {
    return {
      success: true,
      current: {
        temperature: data.temperature || data.temp,
        humidity: data.humidity,
        precipitation: data.precipitation || data.rain,
        windSpeed: data.wind_speed || data.wind,
        description: data.description || data.weather_desc
      },
      forecast: data.forecast || [],
      agriculturalAdvice: {
        irrigation: this.getIrrigationAdvice(data),
        planting: this.getPlantingAdvice(data),
        harvesting: this.getHarvestingAdvice(data)
      },
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'Farmonaut API'
      }
    };
  }

  /**
   * Format fertilizer recommendations response
   */
  formatFertilizerRecommendations(data) {
    return {
      success: true,
      recommendations: data.recommendations || [],
      npkRatio: data.npk_ratio || null,
      applicationTiming: data.timing || [],
      dosage: data.dosage || {},
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'Farmonaut API'
      }
    };
  }

  /**
   * Fallback crop recommendations (when API is unavailable)
   */
  getFallbackCropRecommendations(params) {
    const { season = 'kharif', soilType = 'loamy' } = params;
    
    const recommendations = {
      kharif: [
        { name: 'Rice', suitability: 'high', expectedYield: '3-4 tons/hectare', waterRequirement: 'high', duration: '120-150 days' },
        { name: 'Cotton', suitability: 'high', expectedYield: '2-3 tons/hectare', waterRequirement: 'medium', duration: '150-180 days' },
        { name: 'Maize', suitability: 'medium', expectedYield: '2.5-3.5 tons/hectare', waterRequirement: 'medium', duration: '90-120 days' },
        { name: 'Sugarcane', suitability: 'high', expectedYield: '70-80 tons/hectare', waterRequirement: 'high', duration: '12-18 months' },
        { name: 'Soybean', suitability: 'medium', expectedYield: '1.5-2 tons/hectare', waterRequirement: 'medium', duration: '90-120 days' }
      ],
      rabi: [
        { name: 'Wheat', suitability: 'high', expectedYield: '3-4 tons/hectare', waterRequirement: 'medium', duration: '120-150 days' },
        { name: 'Barley', suitability: 'medium', expectedYield: '2-3 tons/hectare', waterRequirement: 'low', duration: '120-140 days' },
        { name: 'Mustard', suitability: 'high', expectedYield: '1-1.5 tons/hectare', waterRequirement: 'low', duration: '90-120 days' },
        { name: 'Chickpea', suitability: 'high', expectedYield: '1.5-2 tons/hectare', waterRequirement: 'low', duration: '120-150 days' },
        { name: 'Peas', suitability: 'medium', expectedYield: '2-3 tons/hectare', waterRequirement: 'medium', duration: '90-110 days' }
      ],
      zaid: [
        { name: 'Watermelon', suitability: 'high', expectedYield: '25-30 tons/hectare', waterRequirement: 'high', duration: '80-100 days' },
        { name: 'Muskmelon', suitability: 'high', expectedYield: '20-25 tons/hectare', waterRequirement: 'high', duration: '80-100 days' },
        { name: 'Cucumber', suitability: 'medium', expectedYield: '15-20 tons/hectare', waterRequirement: 'medium', duration: '50-70 days' },
        { name: 'Tomato', suitability: 'high', expectedYield: '30-40 tons/hectare', waterRequirement: 'medium', duration: '90-120 days' },
        { name: 'Green Fodder', suitability: 'medium', expectedYield: '25-30 tons/hectare', waterRequirement: 'high', duration: '60-80 days' }
      ]
    };

    return {
      success: true,
      season: season,
      recommendations: recommendations[season] || recommendations.kharif,
      soilType: soilType,
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'Fallback Data'
      }
    };
  }

  /**
   * Fallback weather data
   */
  getFallbackWeatherData(params) {
    return {
      success: true,
      current: {
        temperature: 28,
        humidity: 65,
        precipitation: 0,
        windSpeed: 12,
        description: 'Partly Cloudy'
      },
      forecast: [],
      agriculturalAdvice: {
        irrigation: 'Moderate irrigation recommended based on current conditions',
        planting: 'Good conditions for planting',
        harvesting: 'Weather suitable for harvesting activities'
      },
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'Fallback Data'
      }
    };
  }

  /**
   * Fallback fertilizer recommendations
   */
  getFallbackFertilizerRecommendations(params) {
    const { cropType } = params;
    
    return {
      success: true,
      recommendations: [
        { type: 'Urea', quantity: '100 kg/hectare', timing: 'Before sowing' },
        { type: 'DAP', quantity: '75 kg/hectare', timing: 'At sowing' },
        { type: 'Potash', quantity: '50 kg/hectare', timing: 'Before sowing' }
      ],
      npkRatio: '20:10:10',
      applicationTiming: ['Before sowing', 'At sowing', '30 days after sowing'],
      dosage: {
        nitrogen: 100,
        phosphorus: 50,
        potassium: 50
      },
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'Fallback Data',
        cropType: cropType
      }
    };
  }

  /**
   * Get irrigation advice based on weather
   */
  getIrrigationAdvice(weatherData) {
    const temp = weatherData.temperature || weatherData.temp || 25;
    const humidity = weatherData.humidity || 60;
    const rain = weatherData.precipitation || weatherData.rain || 0;

    if (rain > 10) {
      return 'Heavy rainfall expected. Avoid irrigation for next 2-3 days.';
    } else if (temp > 35 && humidity < 40) {
      return 'Hot and dry conditions. Increase irrigation frequency.';
    } else if (temp > 30) {
      return 'Moderate irrigation recommended based on current conditions.';
    } else {
      return 'Normal irrigation schedule can be maintained.';
    }
  }

  /**
   * Get planting advice based on weather
   */
  getPlantingAdvice(weatherData) {
    const temp = weatherData.temperature || weatherData.temp || 25;
    const rain = weatherData.precipitation || weatherData.rain || 0;

    if (rain > 20) {
      return 'Heavy rainfall expected. Postpone planting activities.';
    } else if (temp < 15) {
      return 'Temperature too low for most crops. Consider cold-hardy varieties.';
    } else if (temp > 35) {
      return 'High temperatures. Consider heat-tolerant varieties or wait for cooler weather.';
    } else {
      return 'Good conditions for planting activities.';
    }
  }

  /**
   * Get harvesting advice based on weather
   */
  getHarvestingAdvice(weatherData) {
    const rain = weatherData.precipitation || weatherData.rain || 0;
    const humidity = weatherData.humidity || 60;

    if (rain > 5) {
      return 'Rainfall expected. Postpone harvesting to avoid crop damage.';
    } else if (humidity > 80) {
      return 'High humidity. Ensure proper drying after harvest to prevent fungal growth.';
    } else {
      return 'Weather suitable for harvesting activities.';
    }
  }
}

module.exports = new FarmonautService();
