const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  discount: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  claimLimit: {
    type: Number,
    default: 100
  },
  currentClaims: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure code is unique and uppercase
CouponSchema.pre('save', function(next) {
  this.code = this.code.toUpperCase();
  next();
});

// Method to check if coupon is available
CouponSchema.methods.isAvailable = function() {
  return this.isActive && this.currentClaims < this.claimLimit;
};

module.exports = mongoose.model('Coupon', CouponSchema); 