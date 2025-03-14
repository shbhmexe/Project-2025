require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import Models
const Coupon = require('./models/Coupon');
const Claim = require('./models/Claim');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB_NAME
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch((err) => console.error('MongoDB Connection Error:', err));

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(bodyParser.json());

// Logging middleware
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};
app.use(logRequest);

// Seed Initial Coupons if not exists
async function seedCoupons() {
  const couponCount = await Coupon.countDocuments();
  if (couponCount === 0) {
    const initialCoupons = [
      { 
        code: 'SUMMER20', 
        discount: '20% Off', 
        description: 'Summer Sale Discount',
        claimLimit: 50
      },
      { 
        code: 'WELCOME10', 
        discount: '10% Off', 
        description: 'New User Discount',
        claimLimit: 100
      },
      { 
        code: 'FREESHIP', 
        discount: 'Free Shipping', 
        description: 'Free Shipping Coupon',
        claimLimit: 25
      }
    ];
    await Coupon.insertMany(initialCoupons);
    console.log('Initial coupons seeded');
  }
}

// Get available coupons
app.get('/api/coupons', async (req, res) => {
  try {
    const coupons = await Coupon.find({ 
      isActive: true, 
      $expr: { $lt: ["$currentClaims", "$claimLimit"] }
    });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coupons', error: error.message });
  }
});

// Claim a coupon
app.post('/api/claim-coupon', async (req, res) => {
  try {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const sessionId = req.headers['x-session-id'];

    // Check if session already claimed max coupons
    const sessionClaimCount = await Claim.countDocuments({ sessionId });
    const maxCouponsPerSession = parseInt(process.env.MAX_COUPONS_PER_SESSION) || 10;
    
    if (sessionClaimCount >= maxCouponsPerSession) {
      return res.status(429).json({ 
        message: `You have already claimed the maximum of ${maxCouponsPerSession} coupons in this session.` 
      });
    }

    // Check IP-based claim (cooldown period)
    const cooldownHours = parseFloat(process.env.COUPON_CLAIM_COOLDOWN_HOURS) || 0.00278; // Default to 10 seconds
    const cooldownSeconds = Math.round(cooldownHours * 3600); // Convert hours to seconds
    const cooldownTime = new Date(Date.now() - (cooldownHours * 60 * 60 * 1000));
    
    const recentClaim = await Claim.findOne({ 
      ipAddress: clientIP, 
      claimedAt: { $gte: cooldownTime } 
    });

    if (recentClaim) {
      return res.status(429).json({ 
        message: `You can only claim one coupon every ${cooldownSeconds} seconds. Please try again shortly.` 
      });
    }

    // Find an available coupon
    const availableCoupon = await Coupon.findOne({ 
      isActive: true, 
      $expr: { $lt: ["$currentClaims", "$claimLimit"] }
    });

    if (!availableCoupon) {
      return res.status(404).json({ 
        message: 'No coupons available at the moment.' 
      });
    }

    // Create claim
    const claim = new Claim({
      coupon: availableCoupon._id,
      sessionId,
      ipAddress: clientIP
    });
    await claim.save();

    // Update coupon claims
    availableCoupon.currentClaims += 1;
    if (availableCoupon.currentClaims >= availableCoupon.claimLimit) {
      availableCoupon.isActive = false;
    }
    await availableCoupon.save();

    res.json({
      code: availableCoupon.code,
      discount: availableCoupon.discount,
      description: availableCoupon.description
    });

  } catch (error) {
    console.error('Coupon claim error:', error);
    res.status(500).json({ 
      message: 'Error claiming coupon', 
      error: error.message 
    });
  }
});

// Initialize server
async function startServer() {
  await seedCoupons();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
}

startServer().catch(console.error);

module.exports = app; 