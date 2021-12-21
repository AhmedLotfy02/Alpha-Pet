const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const { 
    getAllReviews,
    getReviewsOfOwner,
    getReviewsOfVet,
    getReviewsWithRating,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviews.js');

const router = express.Router();

router.get('/', getAllReviews);
router.get('/owner/:ownerEmail', getReviewsOfOwner);
router.get('/vet/:vetEmail', getReviewsOfVet);
router.get('/rating/:rating', getReviewsWithRating);
router.post(
    '/',
    auth,
    body('vetEmail').isEmail().normalizeEmail(),
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('rating').isInt().notEmpty(),
    createReview
);
router.patch(
    '/',
    auth,
    body('vetEmail').isEmail().normalizeEmail(),
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('rating').isInt().notEmpty(),
    updateReview
);
router.delete(
    '/',
    auth,
    body('vetEmail').isEmail().normalizeEmail(),
    body('currentUserEmail').isEmail().normalizeEmail(),
    deleteReview
);

module.exports = router;