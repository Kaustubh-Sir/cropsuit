const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide crop name'],
      trim: true,
    },
    variety: {
      type: String,
      trim: true,
    },
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
        'other',
      ],
      required: true,
    },
    plantingDate: {
      type: Date,
      required: [true, 'Please provide planting date'],
    },
    expectedHarvestDate: {
      type: Date,
      required: [true, 'Please provide expected harvest date'],
    },
    actualHarvestDate: {
      type: Date,
    },
    area: {
      type: Number, // in acres
      required: [true, 'Please provide cultivation area'],
      min: [0, 'Area cannot be negative'],
    },
    location: {
      field: String,
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
    },
    season: {
      type: String,
      enum: ['kharif', 'rabi', 'zaid', 'perennial'],
      required: true,
    },
    soilType: {
      type: String,
      enum: ['clay', 'sandy', 'loamy', 'silt', 'peaty', 'chalky'],
    },
    irrigationMethod: {
      type: String,
      enum: ['drip', 'sprinkler', 'flood', 'rainfed', 'other'],
    },
    status: {
      type: String,
      enum: ['planned', 'planted', 'growing', 'harvested', 'failed'],
      default: 'planned',
    },
    growthStage: {
      type: String,
      enum: [
        'germination',
        'seedling',
        'vegetative',
        'flowering',
        'fruiting',
        'maturity',
        'harvest',
      ],
    },
    health: {
      status: {
        type: String,
        enum: ['excellent', 'good', 'fair', 'poor', 'critical'],
        default: 'good',
      },
      issues: [
        {
          type: {
            type: String,
            enum: ['pest', 'disease', 'nutrient_deficiency', 'weather', 'other'],
          },
          description: String,
          severity: {
            type: String,
            enum: ['low', 'medium', 'high'],
          },
          identifiedDate: {
            type: Date,
            default: Date.now,
          },
          resolved: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
    yield: {
      expected: Number, // in quintals
      actual: Number, // in quintals
      unit: {
        type: String,
        default: 'quintals',
      },
    },
    costTracking: {
      seeds: Number,
      fertilizers: Number,
      pesticides: Number,
      labor: Number,
      irrigation: Number,
      other: Number,
      total: Number,
    },
    revenue: {
      sellingPrice: Number, // per quintal
      totalRevenue: Number,
      profit: Number,
    },
    notes: [
      {
        content: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create indexes
cropSchema.index({ user: 1, status: 1 });
cropSchema.index({ plantingDate: 1 });
cropSchema.index({ category: 1 });

// Calculate total cost before saving
cropSchema.pre('save', function (next) {
  if (this.costTracking) {
    this.costTracking.total =
      (this.costTracking.seeds || 0) +
      (this.costTracking.fertilizers || 0) +
      (this.costTracking.pesticides || 0) +
      (this.costTracking.labor || 0) +
      (this.costTracking.irrigation || 0) +
      (this.costTracking.other || 0);
  }

  // Calculate profit
  if (this.revenue && this.revenue.totalRevenue && this.costTracking) {
    this.revenue.profit = this.revenue.totalRevenue - this.costTracking.total;
  }

  next();
});

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;
