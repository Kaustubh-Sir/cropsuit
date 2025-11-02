const mongoose = require('mongoose');

const fertilizerRecommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crop',
    },
    cropName: {
      type: String,
      required: true,
    },
    soilData: {
      nitrogen: {
        type: Number,
        required: true,
      },
      phosphorus: {
        type: Number,
        required: true,
      },
      potassium: {
        type: Number,
        required: true,
      },
      pH: Number,
      organicCarbon: Number,
    },
    recommendations: [
      {
        fertilizerName: String,
        type: {
          type: String,
          enum: ['Organic', 'Inorganic', 'Bio-fertilizer'],
        },
        quantity: Number, // in kg or liters
        unit: {
          type: String,
          enum: ['kg', 'liters', 'tons'],
          default: 'kg',
        },
        npkRatio: String, // e.g., "10-26-26"
        applicationMethod: {
          type: String,
          enum: ['Broadcasting', 'Drilling', 'Foliar', 'Fertigation', 'Side-dressing'],
        },
        applicationTiming: String,
        frequency: String,
        estimatedCost: Number,
      },
    ],
    customAdvice: String,
    season: String,
    applicationSchedule: [
      {
        stage: String, // e.g., "Basal", "First Top Dressing", "Second Top Dressing"
        days: Number, // days after planting
        fertilizers: String,
        notes: String,
      },
    ],
    totalEstimatedCost: Number,
    applied: {
      type: Boolean,
      default: false,
    },
    appliedDate: Date,
    effectiveness: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      feedback: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
fertilizerRecommendationSchema.index({ user: 1, crop: 1 });

module.exports = mongoose.model('FertilizerRecommendation', fertilizerRecommendationSchema);
