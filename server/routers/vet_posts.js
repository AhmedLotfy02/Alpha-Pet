const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const {
    getAllPosts,
    getVetPosts
} = require('../controllers/vet_posts');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/vet/:vetEmail', getVetPosts);

module.exports = router;