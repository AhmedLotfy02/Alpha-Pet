const express = require('express');
const { body, param } = require('express-validator');
const auth = require('../middlewares/auth');
const { 
    getCommentsOfVet,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/vet_comments.js');

const router = express.Router();
val
router.get(
    '/vet/:email', 
    param('email').isEmail().normalizeEmail().customSanitizer().notEmpty(),
    getCommentsOfVet
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