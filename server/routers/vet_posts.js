const express = require('express');
const { body, param } = require('express-validator');
const auth = require('../middlewares/auth');
const {
    getAllPosts,
    getVetPosts,
    getPostById, 
    getCommentsOfPost, 
    createPost, 
    updatePost, 
    deletePost
} = require('../controllers/vet_posts');

const router = express.Router();

router.get('/', getAllPosts);
router.get(
    '/vet/:vetEmail', 
    param('vetEmail').isEmail().normalizeEmail().notEmpty(), 
    getVetPosts
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