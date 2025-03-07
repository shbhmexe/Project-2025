const db = require('../config/db');

const School = {
    addSchool: async (name, address, latitude, longitude) => {
        const [result] = await db.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );
        return result;
    },

    addMultipleSchools: async (schools) => {
        const values = schools.map(school => [school.name, school.address, school.latitude, school.longitude]);
        const [result] = await db.query(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES ?',
            [values]
        );
        return result;
    },

    getAllSchools: async () => {
        const [schools] = await db.execute('SELECT * FROM schools');
        return schools;
    },

    findByNameAndAddress: async (name, address) => {
        const [rows] = await db.execute(
            'SELECT * FROM schools WHERE name = ? AND address = ? LIMIT 1',
            [name, address]
        );
        return rows.length ? rows[0] : null;
    }
};

module.exports = School;
