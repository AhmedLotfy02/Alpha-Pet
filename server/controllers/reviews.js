const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAllReviews = (req, res) => {
    const sqlStr = `SELECT * FROM REVIEW`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getReviewsOfOwner = (req, res) => {
    const { ownerEmail } = req.params;
    const sqlStr = `SELECT * FROM REVIEW WHERE OWNEREMAIL = ${ownerEmail}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getReviewsOfVet = (req, res) => {
    const { vetEmail } = req.params;
    const sqlStr = `SELECT * FROM REVIEW WHERE VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getReviewsWithRating = (req, res) => {
    const { rating } = req.params;
    const sqlStr = `SELECT * FROM REVIEW WHERE RATING = ${rating}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createReview = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { vetEmail, currentUserEmail, rating } = req.body;
    if(rating > 5) rating = 5;
    if(rating < 0) rating = 0;
    
    const sqlStr = `INSERT INTO REVIEW VALUES(${currentUserEmail}, ${vetEmail}, ${rating})`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateReview = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { vetEmail, currentUserEmail, rating } = req.body;
    if(rating > 5) rating = 5;
    if(rating < 0) rating = 0;

    const sqlStr = `UPDATE REVIEW SET RATING = ${rating} WHERE OWNEREMAIL = ${currentUserEmail} AND VETEMAIL ${vetEmail},`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteReview = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { vetEmail, currentUserEmail } = req.body;

    const sqlStr = `DELETE REVIEW WHERE OWNEREMAIL = ${currentUserEmail} AND VETEMAIL ${vetEmail},`;
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
    getAllReviews,
    getReviewsOfOwner,
    getReviewsOfVet,
    getReviewsWithRating,
    createReview,
    updateReview,
    deleteReview
}
