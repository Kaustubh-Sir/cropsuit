const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      name: String, // Location name/city
      country: String,
    },
    current: {
      temperature: Number, // in Celsius
      feelsLike: Number,
      humidity: Number, // percentage
      pressure: Number, // in hPa
      windSpeed: Number, // in m/s
      windDirection: Number, // in degrees
      cloudiness: Number, // percentage
      visibility: Number, // in meters
      uvIndex: Number,
      rainfall: Number, // in mm
      description: String, // e.g., "clear sky", "light rain"
      icon: String, // weather icon code
    },
    daily: [
      {
        date: Date,
        temperature: {
          min: Number,
          max: Number,
          morning: Number,
          day: Number,
          evening: Number,
          night: Number,
        },
        humidity: Number,
        windSpeed: Number,
        rainfall: Number,
        chanceOfRain: Number, // percentage
        description: String,
        icon: String,
      },
    ],
    hourly: [
      {
        timestamp: Date,
        temperature: Number,
        humidity: Number,
        windSpeed: Number,
        rainfall: Number,
        description: String,
      },
    ],
    alerts: [
      {
        event: String, // e.g., "Heavy Rain", "Heat Wave"
        severity: {
          type: String,
          enum: ['low', 'medium', 'high', 'extreme'],
        },
        description: String,
        start: Date,
        end: Date,
      },
    ],
    agriculturalAdvice: {
      irrigation: String,
      pestControl: String,
      harvesting: String,
      general: String,
    },
    dataSource: {
      type: String,
      default: 'OpenWeatherMap',
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create geospatial index
weatherDataSchema.index({ location: '2dsphere' });
weatherDataSchema.index({ user: 1, lastUpdated: -1 });

// TTL index to automatically delete old weather data after 7 days
weatherDataSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

const WeatherData = mongoose.model('WeatherData', weatherDataSchema);

module.exports = WeatherData;
