const jwt = require('jsonwebtoken');
const connection = require('../connection.js');

const getAllPosts = (req, res) => {
    const sqlStr = 'SELECT Post_Content FROM Owner_Post';
    connection.query(sqlStr, (error, results, fields) => {
        if(error){
            console.log(error);
            return;
        }
        
        res.status(200).json({ data: results, fields });
    });
};

const getPOwnerPosts = (req, res) => {
    
    const {OwnerEmail} = req.params;
    const sqlStr = `SELECT Post_Content FROM Owner_Post WHERE ownerEmail = ${OwnerEmail} `;

    connection.query(sqlStr, (error, results, fields) => {
        if(error) res.status(500).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
};

module.exports = {
    getAllPosts,
    getOwnerPosts
}

