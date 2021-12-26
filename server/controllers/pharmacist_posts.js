const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAllPosts = (req, res) => {
    const sqlStr = 'SELECT * FROM Pharmacist_Post;';
    connection.query(sqlStr, (error, results, fields) => {
        if(error) return res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
};

const getPharmacistPosts = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { pharmacistEmail } = req.params;
    const sqlStr = `SELECT * FROM Pharmacist_Post WHERE pharmacistEmail = '${pharmacistEmail}';`;

    connection.query(sqlStr, (error, results, fields) => {
        if(error) res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
};

const getPostById = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const sqlStr = `SELECT * FROM Pharmacist_Post WHERE P_ID = ${id};`;
    connection.query(sqlStr, (error, results, fields) => {
        if(error) return res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
};

const getCommentsOfPost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const ownerComments = `SELECT * FROM Owner_Comment, PharmacistPost_OwnerComment WHERE OwnerComment_ID = C_Id AND PharmacistPost_ID = ${id};`;    
    const vetComments = `SELECT * FROM Vet_Comment, PharmacistPost_VetComment WHERE VetComment_ID = C_Id AND PharmacistPost_ID = ${id};`;    
    const pharmacistComments = `SELECT * FROM Pharmacist_Comment, PharmacistPost_PharmacistComment WHERE PharmacistComment_ID = C_Id AND PharmacistPost_ID = ${id};`;
    
    const sqlStr = `${ownerComments} UNION ${vetComments} UNION ${pharmacistComments}`;
    connection.query(sqlStr, (error, results, fields) => {
        if(error) return res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
}

const createPost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentUserEmail, content } = req.body;
    const sqlStr = `INSERT INTO Pharmacist_Post(Post_Content, PharmacistEmail) VALUES ('${content}', '${currentUserEmail}');`
    connection.query(sqlStr, (error, results, fields) => {
        if(error) return res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
}

const updatePost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentUserEmail, postId, content } = req.body;
    const sqlStr = `UPDATE Pharmacist_Post SET Post_Content = '${content}' WHERE PharmacistEMAIL = '${currentUserEmail}' AND P_ID = ${postId};`;
    connection.query(sqlStr, (error, results, fields) => {
        if(error) return res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
}

const deletePost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentUserEmail, postId } = req.body;
    const sqlStr = `DELETE FROM Pharmacist_Post WHERE PharmacistEMAIL = '${currentUserEmail}' AND P_ID = ${postId};`;
    connection.query(sqlStr, (error, results, fields) => {
        if(error) return res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
}

module.exports = {
    getAllPosts,
    getPharmacistPosts,
    getPostById, 
    getCommentsOfPost, 
    createPost, 
    updatePost, 
    deletePost
}

