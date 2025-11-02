const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    provider: {
      type: String,
      enum: ['google', 'local'],
      default: 'local',
    },
    location: {
      country: String,
      state: String,
      city: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    farmDetails: {
      farmSize: Number, // in acres
      soilType: {
        type: String,
        enum: ['Clay', 'Sandy', 'Loamy', 'Silt', 'Peat', 'Chalky', 'Other'],
      },
      irrigationType: {
        type: String,
        enum: ['Drip', 'Sprinkler', 'Surface', 'Manual', 'Rainfed'],
      },
    },
    preferences: {
      units: {
        type: String,
        enum: ['metric', 'imperial'],
        default: 'metric',
      },
      language: {
        type: String,
        default: 'en',
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
