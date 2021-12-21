const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const connection = require('../connection.js');

dotenv.config();

const getAllPharmacists = (req, res) => {
    const sqlStr = `SELECT EMAIL, FNAME, LNAME, PHARMACY_ID FROM PHARMACIST`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const signin =  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const existingUser;
    const sqlStr = `SELECT * FROM PHARMACIST WHERE EMAIL = ${email}`;

    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(404).json({ message: 'User does not exist' });

            existingUser = results[0];
        });
        
        if(existingUser.password != password) return res.status(400).json({ message: 'Invalid Credintials' });

        const token = jwt.sign({ email: existingUser.Email }, process.env.JWTSECRETKEY, { expiresIn: '1h' });    //  creating token to send it back to the client

        res.status(200).json({ data: existingUser, token });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, fName, lName, pharmacy_id } = req.body;
    try {
        const sqlStr2 = `SELECT * FROM OWNER_TABLE WHERE EMAIL = ${email}`;
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length > 0) return res.status(400).json({ message: 'User already exist' });
        });
        
        sqlStr2 = `SELECT * FROM VET WHERE EMAIL = ${email}`;
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length > 0) return res.status(400).json({ message: 'User already exist' });
        });

        const token = jwt.sign({ email }, process.env.JWTSECRETKEY, { expiresIn: '1h' });
        
        const sqlStr = `INSERT INTO PHARMACIST VALUES(${email}, ${fName}, ${lName}, ${pharmacy_id}, ${password})`;
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results[0], token });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updatePharmacist = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { currentUserEmail, password, fName, lName, pharmacy_id } = req.body;

    try {
        const sqlStr = `UPDATE PHARMACIST SET FNAME = ${fName}, LNAME = ${lName}, PHARMACY_ID = ${pharmacy_id}, PASSWORD ${password} WHERE EMAIL = ${currentUserEmail}`;
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getAllPharmacists,
    signin,
    signup,
    updatePharmacist
};