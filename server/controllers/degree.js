const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAllDegrees = (req, res) => {
    const sqlStr = `SELECT * FROM DEGREE`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDegreesOfYear = (req, res) => {
    const { year } = req.params;
    const sqlStr = `SELECT * FROM DEGREE WHERE DEGREEYEAR = ${year}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDegreesOfCollege = (req, res) => {
    const { college } = req.params;
    const sqlStr = `SELECT * FROM DEGREE WHERE COLLEGE = ${college}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDegreesWithName = (req, res) => {
    const { degreeName } = req.params;
    const sqlStr = `SELECT * FROM DEGREE WHERE DEGREENAME = ${degreeName}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDegreesOfVet = (req, res) => {
    const { vetEmail } = req.params;
    const sqlStr = `SELECT * FROM DEGREE WHERE VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDegree = (req, res) => {
    const { email, name, college, year } = req.params;
    const sqlStr = `SELECT * FROM DEGREE WHERE VETEMAIL = ${email} AND DEGREENAME = ${name} AND DEGREEYEAR = ${year} AND COLLEGE = ${college}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createDegree = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //  Request body is invalid
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { vetEmail, currentUserEmail, degreeYear, collegeName, degreeName } = req.body;

    if(vetEmail != currentUserEmail){
        return res.status(400).json({ message: "Unauthorized User" });
    }

    const sqlStr2 = `SELECT * FROM DEGREE WHERE DEGREEYEAR = ${degreeYear} AND COLLEGE = ${collegeName} AND DEGREENAME = ${degreeName} AND VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr2, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }

            if(results.length > 0){
                return res.status(400).json({ message: "This degree already exists" });
            }            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    const sqlStr = `INSERT INTO DEGREE VALUES (${degreeYear}, ${collegeName}, ${degreeName}, ${vetEmail})`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateDegree = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //  Request body is invalid
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { vetEmail, currentUserEmail, degreeYear, collegeName, degreeName } = req.body;

    if(vetEmail != currentUserEmail){
        return res.status(400).json({ message: "Unauthorized User" });
    }

    const sqlStr2 = `SELECT * FROM DEGREE WHERE DEGREEYEAR = ${degreeYear} AND COLLEGE = ${collegeName} AND DEGREENAME = ${degreeName} AND VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr2, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }

            if(results.length == 0){
                return res.status(400).json({ message: "This degree doesn't exist" });
            }           
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    const sqlStr = `UPDATE DEGREE SET DEGREEYEAR = ${degreeYear}, COLLEGE = ${collegeName}, DEGREENAME = ${degreeName}, VETEMAIL = ${vetEmail} WHERE DEGREEYEAR = ${degreeYear} AND COLLEGE = ${collegeName} AND DEGREENAME = ${degreeName} AND VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteDegree = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //  Request body is invalid
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { vetEmail, currentUserEmail, degreeYear, collegeName, degreeName } = req.body;

    if(vetEmail != currentUserEmail){
        return res.status(400).json({ message: "Unauthorized User" });
    }

    const sqlStr2 = `SELECT * FROM DEGREE WHERE DEGREEYEAR = ${degreeYear} AND COLLEGE = ${collegeName} AND DEGREENAME = ${degreeName} AND VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr2, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }

            if(results.length == 0){
                return res.status(400).json({ message: "This degree doesn't exist" });
            }           
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    const sqlStr = `DELETE FROM DEGREE WHERE DEGREEYEAR = ${degreeYear} AND COLLEGE = ${collegeName} AND DEGREENAME = ${degreeName} AND VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }

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
