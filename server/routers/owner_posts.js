const express = require('express');
const { body, param } = require('express-validator');
const auth = require('../middlewares/auth');
const {
    getAllPosts,
    getOwnerPosts,
    getPostById,
    getCommentsOfPost, 
    createPost, 
    updatePost, 
    deletePost
} = require('../controllers/owner_posts');

const router = express.Router();

router.get('/', getAllPosts);
router.get(
    '/owner/:ownerEmail',
    param('ownerEmail').isEmail().normalizeEmail().notEmpty(), 
    getOwnerPosts
);
router.get(
    '/id/:id', 
    param('id').isInt().notEmpty(), 
    getPostById
);
router.get(
    '/comments/:id', 
    param('id').isInt().notEmpty(), 
    getCommentsOfPost
);
router.post(
    '/', 
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('content').notEmpty(),
    createPost
);
router.patch(
    '/', 
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('postId').isInt().notEmpty(),
    body('content').notEmpty(),
    updatePost
);
router.delete(
    '/', 
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('postId').isInt().notEmpty(),
    deletePost
);

module.exports = router;