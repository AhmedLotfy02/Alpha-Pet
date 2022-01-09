const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAllPets = (req, res) => {
    const sqlStr = `SELECT * FROM PET;`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPetOfOwner = (req, res) => {
    const { ownerEmail } = req.params;
    const sqlStr = `SELECT * FROM PET WHERE OWNEREMAIL = '${ownerEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            res.status(200).json({ pet:results[0] });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPetsWithColor = (req, res) => {
    const { color } = req.params;
    const sqlStr = `SELECT * FROM PET WHERE COLOR = '${color}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPetsWithAge = (req, res) => {
    const { age } = req.params;
    const sqlStr = `SELECT * FROM PET WHERE AGE = ${age};`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createPet = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      console.log(req.body);
    const { currentUserEmail, petName, color, age } = req.body;
    
    const sqlStr = `INSERT INTO PET VALUES ('${currentUserEmail}', '${petName}', '${color}', ${age});`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updatePet = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { petName, color, age, currentUserEmail } = req.body;
    console.log(req.body);
    const sqlStr = `UPDATE PET SET PETNAME = '${petName}', COLOR = '${color}',  AGE = ${age} WHERE OWNEREMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deletePet = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentUserEmail } = req.body;
    
    const sqlStr = `DELETE FROM PET WHERE OWNEREMAIL = '${currentUserEmail}';`;
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
    getAllPets,
    getPetOfOwner,
    getPetsWithColor,
    getPetsWithAge,
    createPet,
    updatePet,
    deletePet
}
