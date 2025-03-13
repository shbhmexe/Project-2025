const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema({
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon',
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  claimedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['CLAIMED', 'EXPIRED'],
    default: 'CLAIMED'
  }
}, {
  timestamps: true
});

// Indexing for performance
ClaimSchema.index({ coupon: 1, sessionId: 1 });
ClaimSchema.index({ ipAddress: 1, claimedAt: -1 });

module.exports = mongoose.model('Claim', ClaimSchema); 