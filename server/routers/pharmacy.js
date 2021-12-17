const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const { 
    getAllPharmacies,
    getPharmacyOfPharmacist,
    getPharmaciesWithStartDay,
    getPharmaciesWithEndDay,
    getPharmaciesWithStartHour,
    getPharmaciesWithEndHour,
    createPharmacy,
    updatePharmacy,
    deletePharmacy
} = require('../controllers/pharmacy.js');

const router = express.Router();

router.get('/', getAllPharmacies);
router.get('/:pharmacistEmail', getPharmacyOfPharmacist);
router.get('/startDay/:startDay', getPharmaciesWithStartDay);
router.get('/endDay/:endDay', getPharmaciesWithEndDay);
router.get('/starHour/:startHour', getPharmaciesWithStartHour);
router.get('/endHour/:endHour', getPharmaciesWithEndHour);
router.post(
    '/', 
    auth,
    body('pharmacistEmail').isEmail().normalizeEmail(),
    body('id').isInt().notEmpty(),
    body('address').notEmpty(),
    body('phone').isInt().notEmpty(),
    createPharmacy
);
router.patch(
    '/',
    auth,
    body('pharmacistEmail').isEmail().normalizeEmail(),
    body('id').isInt().notEmpty(),
    body('address').notEmpty(),
    body('phone').isInt().notEmpty(),
    updatePharmacy
);
router.delete(
    '/',
    auth,
    body('pharmacistEmail').isEmail().normalizeEmail(),
    body('id').isInt().notEmpty(),
    deletePharmacy
);

module.exports = router;