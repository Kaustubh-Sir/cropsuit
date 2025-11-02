const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    location: {
      city: String,
      state: String,
      country: String,
      coordinates: {
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
      },
    },
    current: {
      temperature: Number, // in Celsius
      feelsLike: Number,
      humidity: Number, // percentage
      pressure: Number, // in hPa
      windSpeed: Number, // in m/s
      windDirection: Number, // in degrees
      cloudCover: Number, // percentage
      visibility: Number, // in meters
      uvIndex: Number,
      description: String,
      icon: String,
    },
    forecast: [
      {
        date: Date,
        day: String,
        tempMin: Number,
        tempMax: Number,
        humidity: Number,
        precipitation: Number, // in mm
        precipitationProbability: Number, // percentage
        windSpeed: Number,
        description: String,
        icon: String,
      },
    ],
    alerts: [
      {
        event: String,
        severity: {
          type: String,
          enum: ['Minor', 'Moderate', 'Severe', 'Extreme'],
        },
        description: String,
        start: Date,
        end: Date,
      },
    ],
    agricultural: {
      soilTemperature: Number,
      soilMoisture: Number,
      evapotranspiration: Number,
      growingDegreeDays: Number,
      frostWarning: Boolean,
      heatStress: Boolean,
      recommendations: [String],
    },
    source: {
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

// Index for faster queries
weatherDataSchema.index({ 'location.coordinates': '2dsphere' });
weatherDataSchema.index({ lastUpdated: 1 });

module.exports = mongoose.model('WeatherData', weatherDataSchema);
