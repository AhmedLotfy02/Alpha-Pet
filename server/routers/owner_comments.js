const express = require('express');
const { body, param } = require('express-validator');
const auth = require('../middlewares/auth');
const { 
    getCommentsOfOwner,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/owner_comments.js');

const router = express.Router();

router.get(
    '/owner/:email', 
    param('email').isEmail().normalizeEmail().customSanitizer().notEmpty(),
    getCommentsOfOwner
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