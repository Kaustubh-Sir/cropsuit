const mongoose = require('mongoose');

const seasonalPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    season: {
      type: String,
      enum: ['kharif', 'rabi', 'zaid', 'annual'],
      required: true,
    },
    planName: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalArea: {
      type: Number, // in acres
      required: true,
    },
    crops: [
      {
        crop: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Crop',
        },
        cropName: String,
        allocatedArea: Number, // in acres
        expectedYield: Number,
        estimatedCost: Number,
        expectedRevenue: Number,
        priority: {
          type: String,
          enum: ['high', 'medium', 'low'],
          default: 'medium',
        },
        status: {
          type: String,
          enum: ['planned', 'in_progress', 'completed', 'cancelled'],
          default: 'planned',
        },
      },
    ],
    rotationStrategy: {
      type: String,
      enum: ['monocropping', 'crop_rotation', 'intercropping', 'mixed_cropping'],
    },
    financials: {
      totalBudget: Number,
      totalEstimatedCost: Number,
      totalExpectedRevenue: Number,
      totalExpectedProfit: Number,
      actualCost: Number,
      actualRevenue: Number,
      actualProfit: Number,
    },
    resources: {
      laborRequired: Number, // man-days
      waterRequired: Number, // in liters or cubic meters
      machineryNeeded: [String],
      fertilizersNeeded: [
        {
          type: String,
          quantity: Number,
          unit: String,
        },
      ],
    },
    milestones: [
      {
        title: String,
        description: String,
        targetDate: Date,
        completed: {
          type: Boolean,
          default: false,
        },
        completedDate: Date,
      },
    ],
    risks: [
      {
        type: {
          type: String,
          enum: ['weather', 'pest', 'disease', 'market', 'financial', 'other'],
        },
        description: String,
        severity: {
          type: String,
          enum: ['low', 'medium', 'high'],
        },
        mitigationStrategy: String,
      },
    ],
    weatherConsiderations: {
      expectedRainfall: Number,
      temperatureRange: {
        min: Number,
        max: Number,
      },
      criticalPeriods: [
        {
          period: String,
          concern: String,
        },
      ],
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'completed', 'cancelled'],
      default: 'draft',
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    notes: [
      {
        content: String,
        date: {
          type: Date,
          default: Date.now,
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Calculate financial totals before saving
seasonalPlanSchema.pre('save', function (next) {
  if (this.crops && this.crops.length > 0) {
    this.financials.totalEstimatedCost = this.crops.reduce(
      (total, crop) => total + (crop.estimatedCost || 0),
      0
    );
    this.financials.totalExpectedRevenue = this.crops.reduce(
      (total, crop) => total + (crop.expectedRevenue || 0),
      0
    );
    this.financials.totalExpectedProfit =
      this.financials.totalExpectedRevenue - this.financials.totalEstimatedCost;
  }

  // Calculate progress based on completed milestones
  if (this.milestones && this.milestones.length > 0) {
    const completedMilestones = this.milestones.filter((m) => m.completed).length;
    this.progress = Math.round((completedMilestones / this.milestones.length) * 100);
  }

  next();
});

// Indexes
seasonalPlanSchema.index({ user: 1, year: -1, season: 1 });
seasonalPlanSchema.index({ status: 1 });
seasonalPlanSchema.index({ startDate: 1, endDate: 1 });

const SeasonalPlan = mongoose.model('SeasonalPlan', seasonalPlanSchema);

module.exports = SeasonalPlan;
