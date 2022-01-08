const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const connection = require('../connection.js');

dotenv.config();

const getVetByEmail=(req,res)=>{
    const sqlStr = `SELECT EMAIL, FNAME, LNAME, CHARGE, STATE,password FROM VET WHERE EMAIL = '${req.body.email}';`;
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


const getAllVets = (req, res) => {
    const sqlStr = `SELECT EMAIL, FNAME, LNAME, CHARGE, STATE FROM VET;`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ vetArray: results});
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
    const sqlStr = `SELECT EMAIL, FNAME, LNAME, CHARGE, STATE, password FROM VET WHERE EMAIL = '${email}';`;
    try {
        connection.query(sqlStr, async(error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(404).json({ message: 'User does not exist' });

            existingUser = results[0];
			let x=await bcrypt.compare(req.body.password, existingUser.password);
			if(!x) return res.status(400).json({ message: 'Invalid Credintials' });
			
			const token = jwt.sign({ email: existingUser.Email }, "this_should_be_very_long", { expiresIn: '1h' });    //  creating token to send it back to the client        //  'test' is a secret string

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


        


        var state1=true;
        if(req.body.state==='0'){
            state1=false;
        }else{
            state1=true;
        }
        console.log(state1);
        const req2={
            email:req.body.email,
            password:req.body.password,
            fName:req.body.fName,
            lName:req.body.lName,
            charge:req.body.charge,
            state:state1
        }
      const { email, password, fName, lName, charge, state } = req2;
    
      try {
        let sqlStr2 = `SELECT * FROM OWNER_TABLE WHERE EMAIL = '${req.body.email}';`;
        connection.query(sqlStr2, async(error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length > 0) return res.status(400).json({ message: 'User already exist' });
        });
        
        sqlStr2 = `SELECT * FROM PHARMACIST WHERE EMAIL = '${req.body.email}';`;
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length > 0) return res.status(400).json({ message: 'User already exist' });
        });
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const sqlStr = `INSERT INTO VET VALUES('${req.body.email}', '${req.body.fName}', '${req.body.lName}', ${req.body.charge}, ${state1}, '${hashedPassword}');`;
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ result: results[0],message:'SignUp vet is done' });
         
        });

      
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const updatePassofVet = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    console.log(req.body);

    try {
		const hashedPassword = await bcrypt.hash(req.body.newpassword, 12);
        let sqlStr = `UPDATE VET SET  PASSWORD = '${hashedPassword}' WHERE EMAIL = '${req.body.email}';`;
       
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateVet = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { currentUserEmail, password, fName, lName, charge, state } = req.body;

    try {
		const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const sqlStr = `UPDATE VET SET FNAME = '${fName}', LNAME = '${lName}', CHARGE = ${charge}, STATE = ${state}, PASSWORD = '${hashedPassword}' WHERE EMAIL = '${currentUserEmail}';`;
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getAllVets,
    signin,
    signup,
    updateVet,
    getVetByEmail,
    updatePassofVet
};