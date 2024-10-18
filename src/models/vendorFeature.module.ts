import mongoose, { Schema } from 'mongoose';

// Sub-feature schema for handling different types of discounts
const VendorSubFeatureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  enabled: {
    type: Boolean,
    default: false, // Control whether this specific sub-feature is active
  },
  config: {
    type: Map, // Dynamic configuration for each sub-feature (e.g., max discount, limits, etc.)
    of: Schema.Types.Mixed, // Mixed to allow flexibility for different types of values
  },
});

// Main feature schema
const VendorFeatureSchema = new Schema({
  featureName: {
    type: String,
    required: true,
  },
  keywordsForSearch: {
    type: [String],
    index: true, // Added index for faster search
  },
  description: {
    type: String,
    default: '',
  },
  enabled: {
    type: Boolean,
    default: false, // General toggle for the feature as a whole
  },
  stage: {
    type: String,
    enum: ['alpha', 'beta', 'production', 'deprecated'], // Added 'deprecated' stage
    default: 'alpha',
  },
  version: {
    type: Number, // Version number for tracking feature updates
    default: 1,
  },
  subFeatures: [VendorSubFeatureSchema], // Array of sub-features (percentage, flat discount, etc.)
  // route: {
  //   type: String,
  //   unique: true, // Ensures each feature has a unique route
  // },
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User', // Links to the users under this organization
    },
  ],
  auditLogs: [
    {
      action: String, // e.g., 'created', 'updated', 'enabled'
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  showInList:{
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deprecatedAt: {
    type: Date, // Optional field to track when a feature is deprecated
  },
});

const Feature = mongoose.model('VendorFeature', VendorFeatureSchema);
export default Feature;
