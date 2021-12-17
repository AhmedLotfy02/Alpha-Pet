const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const {
    getAllOwners,
    signin,
    signup,
    updateOwner
} = require('../controllers/owners.js');

const router = express.Router();

router.get('/', getAllOwners);
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
    body('phone').notEmpty(),
    body('city').notEmpty(),
    signup
);
router.patch(
    '/update',
    auth,
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    body('fName').notEmpty(),
    body('lName').notEmpty(),
    body('phone').notEmpty(),
    body('city').notEmpty(),
    updateOwner
);

module.exports = router;