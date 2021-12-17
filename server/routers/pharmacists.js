const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const {
    getAllPharmacists,
    signin,
    signup,
    updatePharmacist
} = require('../controllers/pharmacists.js');

const router = express.Router();

router.get('/', getAllPharmacists);
router.post(
    '/signin',
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    signin
);
router.post(
    '/signup',
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    body('fName').notEmpty(),
    body('lName').notEmpty(),
    signup
);
router.patch(
    '/update',
    auth,
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    body('fName').notEmpty(),
    body('lName').notEmpty(),
    updatePharmacist
);

module.exports = router;