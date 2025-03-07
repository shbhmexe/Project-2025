const validateSchool = (req, res, next) => {
    const { name, address, latitude, longitude } = req.body;
  
    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ error: 'Invalid or missing fields' });
    }
  
    next();
  };
  
  module.exports = validateSchool;
  