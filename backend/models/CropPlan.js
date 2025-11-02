const mongoose = require('mongoose');

const cropPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      enum: ['Kharif', 'Rabi', 'Zaid', 'Summer', 'Winter', 'Spring', 'Fall', 'Year-round'],
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    crops: [
      {
        cropName: String,
        cropType: String,
        variety: String,
        area: Number,
        expectedPlantingDate: Date,
        expectedHarvestDate: Date,
        estimatedCost: Number,
        estimatedRevenue: Number,
        notes: String,
      },
    ],
    totalArea: Number,
    totalBudget: Number,
    expectedProfit: Number,
    status: {
      type: String,
      enum: ['Draft', 'Active', 'Completed', 'Cancelled'],
      default: 'Draft',
    },
    weather: {
      avgTemperature: Number,
      rainfall: Number,
      humidity: Number,
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
cropPlanSchema.index({ user: 1, season: 1, year: 1 });

module.exports = mongoose.model('CropPlan', cropPlanSchema);
