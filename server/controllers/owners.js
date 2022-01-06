const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const connection = require('../connection.js');
const AuthCheck = require("../middlewares/auth");
const multer = require("multer");
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    },
});
dotenv.config();

const getAllOwners = (req, res) => {
    const sqlStr = `SELECT EMAIL, FNAME, LNAME, PHONE, FAVOURITE_VET_EMAIL, CITY FROM OWNER_TABLE;`;
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
    const sqlStr = `SELECT * FROM OWNER_TABLE WHERE EMAIL = '${email}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(404).json({ message: 'User does not exist' });

            existingUser = results[0];
        });
        
        if(existingUser.password != password) return res.status(400).json({ message: 'Invalid Credintials' });

        const token = jwt.sign({ email: existingUser.Email }, process.env.JWTSECRETKEY, { expiresIn: '1h' });    //  creating token to send it back to the client        //  'test' is a secret string

        res.status(200).json({ data: existingUser, token });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, fName, lName, phone, balance, favouriteVetEmail, city } = req.body;
    try {
        const sqlStr2 = `SELECT * FROM VET WHERE EMAIL = '${email}';`;
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length > 0) return res.status(400).json({ message: 'User already exist' });
        });
        
        sqlStr2 = `SELECT * FROM PHARMACIST WHERE EMAIL = ${email}`;
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length > 0) return res.status(400).json({ message: 'User already exist' });
        });

        const token = jwt.sign({ email }, process.env.JWTSECRETKEY, { expiresIn: '1h' });
        
        const sqlStr = `INSERT INTO OWNER_TABLE VALUES('${email}', '${fName}', '${lName}', ${phone}, ${balance}, '${favouriteVetEmail}', '${city}', '${password}');`;
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results[0], token });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateOwner = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { currentUserEmail, password, fName, lName, phone, balance, favouriteVetEmail, city } = req.body;
    
    try {
        const sqlStr = `UPDATE OWNER_TABLE SET FNAME = '${fName}', LNAME = '${lName}', PHONE = ${phone}, BALANCE = ${balance}, FAVOURITE_VET_EMAIL = '${favouriteVetEmail}', CITY = '${city}', PASSWORD '${password}' WHERE EMAIL = '${currentUserEmail}'`;
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getAllOwners,
    signin,
    signup,
    updateOwner
};