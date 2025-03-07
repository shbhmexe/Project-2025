const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.post('/addSchool', schoolController.addSchool);
router.post('/addMultipleSchools', schoolController.addMultipleSchools);  
router.get('/listSchools', schoolController.listSchools);

module.exports = router;
