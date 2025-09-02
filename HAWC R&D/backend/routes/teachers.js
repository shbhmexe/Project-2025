const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachersController');
const { verifyToken } = require('../middleware/auth');

// Get all teachers
router.get('/', verifyToken, teachersController.getAllTeachers);

// Get teacher by ID
router.get('/:id', verifyToken, teachersController.getTeacherById);

// Create a new teacher
router.post('/', verifyToken, teachersController.createTeacher);

// Update a teacher
router.put('/:id', verifyToken, teachersController.updateTeacher);

// Delete a teacher
router.delete('/:id', verifyToken, teachersController.deleteTeacher);

module.exports = router;