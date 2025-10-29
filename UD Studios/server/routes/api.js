const express = require('express');
const router = express.Router();
const Search = require('../models/Search');
const { searchImages } = require('../services/unsplash');
const { isAuthenticated } = require('../middleware/auth');

// Get top 5 searches across all users
router.get('/top-searches', async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          term: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json(topSearches);
  } catch (error) {
    console.error('Error fetching top searches:', error);
    res.status(500).json({ error: 'Failed to fetch top searches' });
  }
});

// Search images (authenticated only)
router.post('/search', isAuthenticated, async (req, res) => {
  try {
    const { term } = req.body;

    if (!term || term.trim() === '') {
      return res.status(400).json({ error: 'Search term is required' });
    }

    // Save search to database
    await Search.create({
      userId: req.user._id,
      term: term.trim()
    });

    // Fetch images from Unsplash
    const images = await searchImages(term.trim());

    res.json({
      term: term.trim(),
      count: images.total,
      results: images.results
    });
  } catch (error) {
    console.error('Error searching images:', error);
    res.status(500).json({ error: error.message || 'Failed to search images' });
  }
});

// Get user's search history (authenticated only)
router.get('/history', isAuthenticated, async (req, res) => {
  try {
    const history = await Search.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(50)
      .select('term timestamp -_id');

    res.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

module.exports = router;
