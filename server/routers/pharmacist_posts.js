const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const {
    getAllPosts,
    getVetPosts
} = require('../controllers/pharmacist_posts');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/pharmacist/:pharmacistEmail', getPharmacistPosts);

module.exports = router;