const pool = require('../config/database');

// Get all teachers with user data
exports.getAllTeachers = async (req, res) => {
  try {
    const [teachers] = await pool.query(
      `SELECT t.*, u.email, u.first_name, u.last_name 
       FROM teachers t 
       JOIN auth_user u ON t.user_id = u.id`
    );
    
    res.json({ teachers });
  } catch (error) {
    console.error('Get all teachers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get teacher by ID
exports.getTeacherById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [teachers] = await pool.query(
      `SELECT t.*, u.email, u.first_name, u.last_name 
       FROM teachers t 
       JOIN auth_user u ON t.user_id = u.id 
       WHERE t.id = ?`,
      [id]
    );
    
    if (teachers.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    res.json({ teacher: teachers[0] });
  } catch (error) {
    console.error('Get teacher by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new teacher
exports.createTeacher = async (req, res) => {
  const { user_id, university_name, gender, year_joined } = req.body;
  
  try {
    // Check if user exists
    const [users] = await pool.query('SELECT * FROM auth_user WHERE id = ?', [user_id]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if teacher already exists for this user
    const [existingTeachers] = await pool.query('SELECT * FROM teachers WHERE user_id = ?', [user_id]);
    
    if (existingTeachers.length > 0) {
      return res.status(400).json({ message: 'Teacher profile already exists for this user' });
    }
    
    // Insert teacher into database
    const [result] = await pool.query(
      'INSERT INTO teachers (user_id, university_name, gender, year_joined) VALUES (?, ?, ?, ?)',
      [user_id, university_name, gender, year_joined]
    );
    
    res.status(201).json({
      message: 'Teacher created successfully',
      teacher: {
        id: result.insertId,
        user_id,
        university_name,
        gender,
        year_joined
      }
    });
  } catch (error) {
    console.error('Create teacher error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a teacher
exports.updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { university_name, gender, year_joined } = req.body;
  
  try {
    // Check if teacher exists
    const [teachers] = await pool.query('SELECT * FROM teachers WHERE id = ?', [id]);
    
    if (teachers.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    // Update teacher in database
    await pool.query(
      'UPDATE teachers SET university_name = ?, gender = ?, year_joined = ? WHERE id = ?',
      [university_name, gender, year_joined, id]
    );
    
    res.json({
      message: 'Teacher updated successfully',
      teacher: {
        id: parseInt(id),
        university_name,
        gender,
        year_joined
      }
    });
  } catch (error) {
    console.error('Update teacher error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a teacher
exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Check if teacher exists
    const [teachers] = await pool.query('SELECT * FROM teachers WHERE id = ?', [id]);
    
    if (teachers.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    // Delete teacher from database
    await pool.query('DELETE FROM teachers WHERE id = ?', [id]);
    
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Delete teacher error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};