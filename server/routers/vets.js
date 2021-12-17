const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const {
    getAllVets,
    signin,
    signup,
    updateVet
} = require('../controllers/vets.js');

const router = express.Router();

router.get('/', getAllVets);
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
    updateVet
);

module.exports = router;