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
  origin: function(origin, callback) {
    const allowedOrigins = [
      'https://couponforfree.vercel.app',
      'http://localhost:5173'
    ];
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      return callback(null, true); // Still allow for testing
    }
  },
  credentials: true
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

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
    console.log('Claim coupon request received');
    console.log('Headers:', JSON.stringify(req.headers));
    
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const sessionId = req.headers['x-session-id'];
    
    // Check if session ID is provided
    if (!sessionId) {
      console.log('No session ID provided');
      return res.status(400).json({ 
        message: 'Session ID is required to claim a coupon.' 
      });
    }
    
    console.log(`Session ID: ${sessionId}, IP: ${clientIP}`);

    // Check if session already claimed max coupons
    const sessionClaimCount = await Claim.countDocuments({ sessionId });
    const maxCouponsPerSession = parseInt(process.env.MAX_COUPONS_PER_SESSION) || 10;
    
    console.log(`Session claim count: ${sessionClaimCount}, Max allowed: ${maxCouponsPerSession}`);
    
    if (sessionClaimCount >= maxCouponsPerSession) {
      console.log('Max coupons per session limit reached');
      return res.status(429).json({ 
        message: `You have already claimed the maximum of ${maxCouponsPerSession} coupons in this session.` 
      });
    }

    // Check IP-based claim (10 second cooldown)
    const cooldownSeconds = 10;
    const cooldownTime = new Date(Date.now() - (cooldownSeconds * 1000));
    
    const recentClaim = await Claim.findOne({ 
      ipAddress: clientIP, 
      claimedAt: { $gte: cooldownTime } 
    });

    if (recentClaim) {
      const timeLeft = Math.ceil((recentClaim.claimedAt.getTime() + (cooldownSeconds * 1000) - Date.now()) / 1000);
      console.log(`Cooldown active, ${timeLeft} seconds left`);
      return res.status(429).json({ 
        message: `Please wait ${timeLeft} seconds before claiming another coupon.`,
        timeLeft
      });
    }

    // Find an available coupon
    const availableCoupon = await Coupon.findOne({ 
      isActive: true, 
      $expr: { $lt: ["$currentClaims", "$claimLimit"] }
    });

    if (!availableCoupon) {
      console.log('No available coupons found');
      return res.status(404).json({ 
        message: 'No coupons available at the moment.' 
      });
    }

    console.log(`Found available coupon: ${availableCoupon.code}`);

    // Create claim
    const claim = new Claim({
      coupon: availableCoupon._id,
      sessionId,
      ipAddress: clientIP
    });
    await claim.save();
    console.log('Claim saved successfully');

    // Update coupon claims
    availableCoupon.currentClaims += 1;
    if (availableCoupon.currentClaims >= availableCoupon.claimLimit) {
      availableCoupon.isActive = false;
    }
    await availableCoupon.save();
    console.log(`Coupon ${availableCoupon.code} updated, current claims: ${availableCoupon.currentClaims}`);

    res.json({
      code: availableCoupon.code,
      discount: availableCoupon.discount,
      description: availableCoupon.description,
      cooldownSeconds
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