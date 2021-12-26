const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAllDegrees = (req, res) => {
    const sqlStr = `SELECT * FROM DEGREE;`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDegreesOfYear = (req, res) => {
    const { year } = req.params;
    const sqlStr = `SELECT * FROM DEGREE WHERE DEGREEYEAR = ${year};`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDegreesOfCollege = (req, res) => {
    const { college } = req.params;
    const sqlStr = `SELECT * FROM DEGREE WHERE COLLEGE = '${college}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDegreesWithName = (req, res) => {
    const { degreeName } = req.params;
    const sqlStr = `SELECT * FROM DEGREE WHERE DEGREENAME = '${degreeName}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDegreesOfVet = (req, res) => {
    const { vetEmail } = req.params;
    const sqlStr = `SELECT * FROM DEGREE WHERE VETEMAIL = '${vetEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDegree = (req, res) => {
    const { email, name, college, year } = req.params;
    const sqlStr = `SELECT * FROM DEGREE WHERE VETEMAIL = '${email}' AND DEGREENAME = '${name}' AND DEGREEYEAR = ${year} AND COLLEGE = '${college}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createDegree = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { currentUserEmail, degreeYear, collegeName, degreeName } = req.body;

    const sqlStr = `INSERT INTO DEGREE VALUES (${degreeYear}, '${collegeName}', '${degreeName}', '${currentUserEmail}');`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateDegree = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { currentUserEmail, degreeYear, collegeName, degreeName } = req.body;

    const sqlStr = `UPDATE DEGREE SET DEGREEYEAR = ${degreeYear}, COLLEGE = '${collegeName}', DEGREENAME = '${degreeName}' WHERE DEGREEYEAR = ${degreeYear} AND COLLEGE = '${collegeName}' AND DEGREENAME = '${degreeName}' AND VETEMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteDegree = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { currentUserEmail, degreeYear, collegeName, degreeName } = req.body;

    const sqlStr = `DELETE FROM DEGREE WHERE DEGREEYEAR = ${degreeYear} AND COLLEGE = '${collegeName}' AND DEGREENAME = '${degreeName}' AND VETEMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getAllDegrees,
    getDegreesOfYear,
    getDegreesOfCollege,
    getDegreesWithName,
    getDegreesOfVet,
    getDegree,
    createDegree,
    updateDegree,
    deleteDegree
}
