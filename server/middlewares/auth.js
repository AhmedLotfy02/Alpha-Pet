const jwt  = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function auth(req,res,next){
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json('Unauthorized user');

   try{
        const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
        req.user = decoded;
        req.body.currentUserEmail = decoded.email;
        next();
   }catch(e){
        res.status(400).json('Token not valid');
   }
}

module.exports = auth;