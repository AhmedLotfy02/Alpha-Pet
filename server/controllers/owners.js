const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const connection = require('../connection.js');
const AuthCheck = require("../middlewares/auth");
dotenv.config();

const getOwnerByEmail=(req,res)=>{
    const sqlStr = `SELECT * FROM OWNER_TABLE WHERE EMAIL = '${req.body.email}';`;
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

const signin =  async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
console.log(req.body);
    const { email, password } = req.body;
    let existingUser;
    const sqlStr = `SELECT * FROM OWNER_TABLE WHERE EMAIL = '${req.body.email}';`;
    try {
        connection.query(sqlStr, async(error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(404).json({ message: 'User does not exist' });

            existingUser = results[0];
            let x=await bcrypt.compare(req.body.password, existingUser.password);

            console.log(x);

            console.log(results[0]);
            console.log(existingUser.password);
			if(!x) return res.status(400).json({ message: 'Invalid Credintials' });

            const token = jwt.sign({ email: existingUser.Email},
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
    var favEmail='none@gmail.com';
    const { email, password, fName, lName, phone, balance, favouriteVetEmail, city } = req.body;
    
    try {
        let sqlStr2 = `SELECT * FROM VET WHERE EMAIL = '${req.body.email}';`;
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length > 0) return res.status(400).json({ message: 'User already exist' });
        });
        
        sqlStr2 = `SELECT * FROM PHARMACIST WHERE EMAIL = '${req.body.email}'`;
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length > 0) return res.status(400).json({ message: 'User already exist' });
        });

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        let sqlStr = `INSERT INTO OWNER_TABLE VALUES('${req.body.email}', '${req.body.FirstName}', '${req.body.LastName}', ${req.body.phone}, ${req.body.balance}, '${req.body.favouriteVetEmail}', '${req.body.city}', '${hashedPassword}');`;
        if(!req.body.favouriteVetEmail){
			sqlStr = `INSERT INTO OWNER_TABLE VALUES('${req.body.email}', '${req.body.FirstName}', '${req.body.LastName}', ${req.body.phone}, ${req.body.balance}, ${null}, '${req.body.city}', '${hashedPassword}');`;
		} 
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results[0],message:'Signup as Owner is done' });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updatePassofOwner = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    console.log(req.body);

    try {
		const sqlStr2 = `SELECT * FROM OWNER_TABLE WHERE EMAIL = '${req.body.email}';`;
		connection.query(sqlStr2, async(error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(400).json({ message: 'User does not exist' });

            let existingUser = results[0];
            let x=await bcrypt.compare(req.body.currentpass, existingUser.password);

			if(!x) return res.status(400).json({ message: 'Invalid Credintials' });

            const hashedPassword = await bcrypt.hash(req.body.newpassword, 12);
			let sqlStr = `UPDATE OWNER_TABLE SET  PASSWORD = '${hashedPassword}' WHERE EMAIL = '${req.body.email}';`;
		   
			connection.query(sqlStr, (error, results, fields) => {
				if(error) return res.status(400).json({ message: error.message });
				
				res.status(200).json({ data: results });
			});
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const updateOwner = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    console.log(req.body);
    const { Email, password, FName, LName, phone, Balance, Favourite_Vet_Email, City } = req.body;
    
    try {
		const hashedPassword = await bcrypt.hash(req.body.password, 12);
        let sqlStr = `UPDATE OWNER_TABLE SET FNAME = '${FName}', LNAME = '${LName}', PHONE = ${phone}, BALANCE = ${Balance}, FAVOURITE_VET_EMAIL = '${Favourite_Vet_Email}', CITY = '${City}', PASSWORD = '${hashedPassword}' WHERE EMAIL = '${Email}';`;
        if(!Favourite_Vet_Email){
			sqlStr = `UPDATE OWNER_TABLE SET FNAME = '${FName}', LNAME = '${LName}', PHONE = ${phone}, BALANCE = ${Balance}, CITY = '${City}', PASSWORD = '${hashedPassword}' WHERE EMAIL = '${Email}';`;
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
    getAllOwners,
    signin,
    signup,
    updateOwner,
    getOwnerByEmail
,updatePassofOwner
};