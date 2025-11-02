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
    soilType: {
      type: String,
      enum: ['clay', 'sandy', 'loamy', 'silt', 'peaty', 'chalky'],
      required: true,
    },
    soilNutrients: {
      nitrogen: {
        type: Number, // N content in kg/ha or ppm
        required: true,
      },
      phosphorus: {
        type: Number, // P content in kg/ha or ppm
        required: true,
      },
      potassium: {
        type: Number, // K content in kg/ha or ppm
        required: true,
      },
      pH: {
        type: Number,
        min: 0,
        max: 14,
      },
      organicCarbon: Number,
    },
    recommendations: [
      {
        fertilizer: {
          name: String,
          type: {
            type: String,
            enum: ['organic', 'inorganic', 'bio-fertilizer'],
          },
          npkRatio: String, // e.g., "10-26-26"
        },
        quantity: {
          value: Number,
          unit: {
            type: String,
            default: 'kg/acre',
          },
        },
        applicationMethod: {
          type: String,
          enum: ['broadcasting', 'drilling', 'foliar_spray', 'fertigation', 'side_dressing'],
        },
        applicationStage: String, // e.g., "At sowing", "30 days after sowing"
        frequency: String,
        estimatedCost: Number,
        benefits: [String],
        precautions: [String],
      },
    ],
    season: {
      type: String,
      enum: ['kharif', 'rabi', 'zaid', 'perennial'],
    },
    climateConditions: {
      temperature: Number,
      rainfall: Number,
      humidity: Number,
    },
    totalEstimatedCost: {
      type: Number,
      default: 0,
    },
    expectedYieldIncrease: {
      type: String, // e.g., "15-20%"
    },
    status: {
      type: String,
      enum: ['pending', 'applied', 'completed'],
      default: 'pending',
    },
    appliedDate: Date,
    results: {
      yieldAchieved: Number,
      qualityRating: {
        type: String,
        enum: ['excellent', 'good', 'average', 'poor'],
      },
      feedback: String,
    },
    generatedBy: {
      type: String,
      enum: ['ai', 'expert', 'manual'],
      default: 'ai',
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total estimated cost before saving
fertilizerRecommendationSchema.pre('save', function (next) {
  if (this.recommendations && this.recommendations.length > 0) {
    this.totalEstimatedCost = this.recommendations.reduce((total, rec) => {
      return total + (rec.estimatedCost || 0);
    }, 0);
  }
  next();
});

// Index for querying
fertilizerRecommendationSchema.index({ user: 1, createdAt: -1 });
fertilizerRecommendationSchema.index({ crop: 1 });

const FertilizerRecommendation = mongoose.model(
  'FertilizerRecommendation',
  fertilizerRecommendationSchema
);

module.exports = FertilizerRecommendation;
