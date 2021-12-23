const express = require('express');
const { body, param } = require('express-validator');
const auth = require('../middlewares/auth');
const { 
    getCommentsOfPharmacist,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/pharmacist_comments.js');

const router = express.Router();

router.get(
    '/pharmacist/:email', 
    param('email').isEmail().normalizeEmail().customSanitizer().notEmpty(),
    getCommentsOfPharmacist
);
router.get(
    '/comment/:id', 
    param('id').isInt().customSanitizer().notEmpty(),
    getCommentById
);
router.post(
    '/', 
    auth, 
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('postId').isInt().notEmpty(),
    body('content').notEmpty(),
    createComment
);
router.patch(
    '/', 
    auth, 
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('commentId').isInt().notEmpty(),
    body('content').notEmpty(),
    updateComment
);
router.delete(
    '/', 
    auth, 
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('commentId').isInt().notEmpty(),
    deleteComment
);

module.exports = router;