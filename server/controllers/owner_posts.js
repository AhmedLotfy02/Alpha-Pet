const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAllPosts = (req, res) => {

    const sqlStr = 'SELECT * FROM Owner_Post;';
    connection.query(sqlStr, (error, results, fields) => {
        if(error) return res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
};

const getOwnerPosts = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { ownerEmail } = req.params;
    const sqlStr = `SELECT * FROM Owner_Post WHERE ownerEmail = '${ownerEmail}';`;
    connection.query(sqlStr, (error, results, fields) => {
        if(error) return res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
};

const getPostById = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const sqlStr = `SELECT * FROM Owner_Post WHERE P_ID = ${id};`;
    connection.query(sqlStr, (error, results, fields) => {
        if(error) return res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
};

const getCommentsOfPost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const ownerComments = `SELECT * FROM Owner_Comment, OwnerPost_OwnerComment WHERE OwnerComment_ID = C_Id AND OwnerPost_ID = ${id};`;    
    const vetComments = `SELECT * FROM Vet_Comment, OwnerPost_VetComment WHERE VetComment_ID = C_Id AND OwnerPost_ID = ${id};`;    
    const pharmacistComments = `SELECT * FROM Pharmacist_Comment, OwnerPost_PharmacistComment WHERE PharmacistComment_ID = C_Id AND OwnerPost_ID = ${id};`;
    
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
    const sqlStr = `INSERT INTO Owner_Post(Post_Content, OwnerEmail) VALUES ('${content}', '${currentUserEmail}');`
    connection.query(sqlStr, (error, results, fields) => {
        if(error) return res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
}

const updatePost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentUserEmail, postId, content } = req.body;
    const sqlStr = `UPDATE Owner_Post SET Post_Content = '${content}' WHERE OWNEREMAIL = '${currentUserEmail}' AND P_ID = ${postId});`
    connection.query(sqlStr, (error, results, fields) => {
        if(error) return res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
}

const deletePost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentUserEmail, postId } = req.body;
    const sqlStr = `DELETE FROM Owner_Post WHERE OWNEREMAIL = '${currentUserEmail}' AND P_ID = ${postId});`
    connection.query(sqlStr, (error, results, fields) => {
        if(error) return res.status(400).json({ message: error.message });
        
        res.status(200).json({ data: results, fields });
    });
}

module.exports = {
    getAllPosts,
    getOwnerPosts,
    getPostById,
    getCommentsOfPost, 
    createPost, 
    updatePost, 
    deletePost
}

