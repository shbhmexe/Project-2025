const School = require('../models/schoolModel');
const geoUtils = require('../utils/geoUtils');

exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    
    if (!name || !address || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: 'All fields (name, address, latitude, longitude) are required' });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Latitude and Longitude must be valid numbers' });
    }

    try {
        
        const existingSchool = await School.findByNameAndAddress(name, address);
        if (existingSchool) {
            return res.status(409).json({ error: 'School with this name and address already exists' });
        }

        // Add school
        const result = await School.addSchool(name, address, latitude, longitude);
        res.status(201).json({ message: 'School added successfully', id: result.insertId });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: 'Database error', details: error.message });
    }
};

exports.addMultipleSchools = async (req, res) => {
    const schools = req.body.schools; 

    if (!Array.isArray(schools) || schools.length === 0) {
        return res.status(400).json({ error: 'Invalid input. Provide an array of schools.' });
    }

    let insertedSchools = [];
    let failedEntries = [];

    for (const school of schools) {
        const { name, address, latitude, longitude } = school;

        if (!name || !address || latitude === undefined || longitude === undefined || isNaN(latitude) || isNaN(longitude)) {
            failedEntries.push({ school, error: 'Invalid school data' });
            continue;
        }

        try {
            
            const existingSchool = await School.findByNameAndAddress(name, address);
            if (existingSchool) {
                failedEntries.push({ school, error: 'Duplicate school' });
                continue;
            }

            const result = await School.addSchool(name, address, latitude, longitude);
            insertedSchools.push({ id: result.insertId, name, address });

        } catch (error) {
            failedEntries.push({ school, error: error.message });
        }
    }

    res.status(201).json({
        message: 'Batch insert complete',
        added: insertedSchools,
        failed: failedEntries
    });
};

exports.listSchools = async (req, res) => {
    const { lat, lng } = req.query;

    
    if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ error: 'Latitude and Longitude must be valid numbers' });
    }

    try {
        const schools = await School.getAllSchools();
        
        if (!schools.length) {
            return res.status(404).json({ message: 'No schools found' });
        }

        
        const sortedSchools = geoUtils.sortByDistance(schools, parseFloat(lat), parseFloat(lng));
        res.status(200).json(sortedSchools);
        
    } catch (error) {
        console.error("Fetching Schools Error:", error);
        res.status(500).json({ error: 'Error fetching schools', details: error.message });
    }
};
