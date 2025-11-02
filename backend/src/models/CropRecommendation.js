const mongoose = require('mongoose');

const cropRecommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    season: {
      type: String,
      enum: ['kharif', 'rabi', 'zaid', 'perennial'],
      required: true,
    },
    location: {
      city: String,
      state: String,
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
    },
    soilType: {
      type: String,
      enum: ['clay', 'sandy', 'loamy', 'silt', 'peaty', 'chalky'],
      required: true,
    },
    soilNutrients: {
      nitrogen: Number,
      phosphorus: Number,
      potassium: Number,
      pH: Number,
    },
    climateData: {
      averageTemperature: Number, // in Celsius
      rainfall: Number, // in mm
      humidity: Number, // percentage
    },
    availableArea: {
      type: Number, // in acres
      required: true,
    },
    irrigationAvailable: {
      type: Boolean,
      default: false,
    },
    budget: {
      type: Number, // in currency
    },
    recommendations: [
      {
        cropName: {
          type: String,
          required: true,
        },
        variety: String,
        category: {
          type: String,
          enum: [
            'cereals',
            'pulses',
            'vegetables',
            'fruits',
            'oilseeds',
            'cash_crops',
            'spices',
          ],
        },
        suitabilityScore: {
          type: Number,
          min: 0,
          max: 100,
        },
        reasoning: String,
        advantages: [String],
        challenges: [String],
        estimatedYield: {
          value: Number,
          unit: String,
        },
        estimatedIncome: Number,
        growthDuration: {
          value: Number,
          unit: {
            type: String,
            default: 'days',
          },
        },
        waterRequirement: {
          type: String,
          enum: ['low', 'moderate', 'high'],
        },
        laborRequirement: {
          type: String,
          enum: ['low', 'moderate', 'high'],
        },
        marketDemand: {
          type: String,
          enum: ['low', 'moderate', 'high'],
        },
        riskLevel: {
          type: String,
          enum: ['low', 'moderate', 'high'],
        },
        cultivation: {
          sowingTime: String,
          harvestTime: String,
          spacing: String,
          seedRate: String,
        },
      },
    ],
    preferences: {
      organicFarming: {
        type: Boolean,
        default: false,
      },
      cashCropPreference: Boolean,
      foodCropPreference: Boolean,
    },
    generatedBy: {
      type: String,
      enum: ['ai', 'expert', 'hybrid'],
      default: 'ai',
    },
    status: {
      type: String,
      enum: ['active', 'accepted', 'rejected', 'expired'],
      default: 'active',
    },
    userFeedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      acceptedCrops: [String],
    },
    expiresAt: {
      type: Date,
      default: function () {
        // Recommendations expire after 90 days
        return new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
      },
    },
  },
  {
    timestamps: true,
  }
);

// Sort recommendations by suitability score
cropRecommendationSchema.pre('save', function (next) {
  if (this.recommendations && this.recommendations.length > 0) {
    this.recommendations.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  }
  next();
});

// Indexes
cropRecommendationSchema.index({ user: 1, createdAt: -1 });
cropRecommendationSchema.index({ season: 1 });
cropRecommendationSchema.index({ status: 1 });
cropRecommendationSchema.index({ expiresAt: 1 });

const CropRecommendation = mongoose.model('CropRecommendation', cropRecommendationSchema);

module.exports = CropRecommendation;
