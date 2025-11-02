const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    cropType: {
      type: String,
      enum: ['Cereal', 'Vegetable', 'Fruit', 'Pulse', 'Oilseed', 'Cash Crop', 'Fodder', 'Other'],
      required: true,
    },
    variety: String,
    plantingDate: {
      type: Date,
      required: true,
    },
    expectedHarvestDate: Date,
    actualHarvestDate: Date,
    area: {
      type: Number, // in acres
      required: true,
    },
    status: {
      type: String,
      enum: ['Planning', 'Planted', 'Growing', 'Harvested', 'Failed'],
      default: 'Planning',
    },
    season: {
      type: String,
      enum: ['Kharif', 'Rabi', 'Zaid', 'Summer', 'Winter', 'Spring', 'Fall', 'Year-round'],
    },
    fieldLocation: {
      fieldName: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    soilData: {
      pH: Number,
      nitrogen: Number,
      phosphorus: Number,
      potassium: Number,
      organicMatter: Number,
    },
    irrigation: {
      type: {
        type: String,
        enum: ['Drip', 'Sprinkler', 'Surface', 'Manual', 'Rainfed'],
      },
      frequency: String,
    },
    expectedYield: Number,
    actualYield: Number,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
cropSchema.index({ user: 1, status: 1 });
cropSchema.index({ plantingDate: 1 });

module.exports = mongoose.model('Crop', cropSchema);
