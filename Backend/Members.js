const mongoose = require("mongoose");

const schema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Phone: {
    type: String,
    required: true,
    trim: true
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  Password: {
    type: String,
    required: true,
    minlength: 6
  },
  Plan: {
    type: String,
    required: true,
    enum: ['Basic', 'Standard', 'Premium'],
    default: 'Basic'
  },
  Age: {
    type: Number,
    required: true,
    min: 13,
    max: 100
  },
  Gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other', 'PreferNotToSay']
  },
  FitnessGoal: {
    type: String,
    required: true,
    enum: ['WeightLoss', 'MuscleBuilding', 'Cardio', 'Strength', 'Flexibility', 'GeneralFitness', 'SportSpecific']
  },
  MedicalConditions: {
    type: String,
    trim: true,
    default: ''
  },
  EmergencyContact: {
    type: String,
    trim: true,
    default: ''
  },
  TermsAccepted: {
    type: Boolean,
    required: true,
    default: false
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  UpdatedAt: {
    type: Date,
    default: Date.now
  },
  Status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active'
  }
});

// Update the UpdatedAt field before saving
schema.pre('save', function(next) {
  this.UpdatedAt = Date.now();
  next();
});

// Add indexes for better performance
schema.index({ Email: 1 });
schema.index({ Phone: 1 });
schema.index({ Plan: 1 });
schema.index({ Status: 1 });

module.exports = mongoose.model("member", schema, "Members");
