const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const {
    getAllPosts,
    getVetPosts
} = require('../controllers/owner_posts');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/owner/:ownerEmail', getOwnerPosts);

module.exports = router;