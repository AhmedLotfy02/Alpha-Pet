const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const connection = require('../connection.js');

dotenv.config();

const getPharmacistByEmail=(req,res)=>{
    const sqlStr = `SELECT * FROM PHARMACIST WHERE EMAIL = '${req.body.email}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(404).json({ message: 'User does not exist' });

            existingUser = results[0];
			
			
			
			res.status(200).json({ user: existingUser });
        });
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

const getAllPharmacists = (req, res) => {
    const sqlStr = `SELECT EMAIL, FNAME, LNAME, PHARMACY_ID FROM PHARMACIST;`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const signin =  async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    let existingUser;
    const sqlStr = `SELECT * FROM PHARMACIST WHERE EMAIL = '${email}';`;

    try {
        connection.query(sqlStr, async(error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(404).json({ message: 'User does not exist' });

            existingUser = results[0];
			const hashedPassword = await bcrypt.hash(password, 12);
			if(existingUser.password != hashedPassword) return res.status(400).json({ message: 'Invalid Credintials' });

            const token = jwt.sign({ email: existingUser.Email },
                "this_should_be_very_long", { expiresIn: "1h" }
            );
			res.status(200).json({   token: token,
                expiresIn: 3600,
                user: existingUser, });
        });
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const signup = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        console.log(req.body);
    const { email, password, fName, lName, pharmacy_id } = req.body;
    try {
        const sqlStr2 = `SELECT * FROM OWNER_TABLE WHERE EMAIL = '${req.body.email}';`;
        connection.query(sqlStr2, async(error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message ,errorLoc:'1'});
            
            if(results.length > 0) return res.status(400).json({ message: 'User already exist' });
        });
        
        const sqlStr3 = `SELECT * FROM VET WHERE EMAIL = '${req.body.email}';`;
        connection.query(sqlStr3, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length > 0) return res.status(400).json({ message: 'User already exist' });
        });
		
		const hashedPassword = await bcrypt.hash(req.body.password, 12);
        let sqlStr = `INSERT INTO PHARMACIST VALUES('${req.body.email}', '${req.body.FirstName}', '${req.body.LastName}', ${req.body.pharmacy_id}, '${hashedPassword}');`;
		if(!pharmacy_id){
			sqlStr = `INSERT INTO PHARMACIST(EMAIL, FNAME, LNAME, PASSWORD) VALUES('${req.body.email}', '${req.body.FirstName}', '${req.body.LastName}', '${hashedPassword}');`;
		}
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results[0],message:'SignUp as Pharmacist is done ' });
        });
    } catch (error) {
        res.status(404).json({ message: error.message ,errorLoc:'catch Block'});
    }
}

const updatePharmacist = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { currentUserEmail, password, fName, lName, pharmacy_id } = req.body;

    try {
		const hashedPassword = await bcrypt.hash(password, 12);
        let sqlStr = `UPDATE PHARMACIST SET FNAME = '${fName}', LNAME = '${lName}', PHARMACY_ID = ${pharmacy_id}, PASSWORD = '${hashedPassword}' WHERE EMAIL = '${currentUserEmail}';`;
        if(!pharmacy_id){
			sqlStr = `UPDATE PHARMACIST SET FNAME = '${fName}', LNAME = '${lName}', PASSWORD = '${hashedPassword}', PHARMACY_ID = ${null}, WHERE EMAIL = '${currentUserEmail}';`;
		}
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
    updatePharmacist,
    getPharmacistByEmail
};