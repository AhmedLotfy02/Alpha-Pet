const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const { 
    getAllClinics,
    getClinicOfVet,
    getClinicsWithStartDay,
    getClinicsWithEndDay,
    getClinicsWithStartHour,
    getClinicsWithEndHour,
    createClinic,
    updateClinic,
    deleteClinic
} = require('../controllers/clinic.js');

const router = express.Router();

router.get('/', getAllClinics);
router.get('/vet/:vetEmail', getClinicOfVet);
router.get('/startDay/:startDay', getClinicsWithStartDay);
router.get('/endDay/:endDay', getClinicsWithEndDay);
router.get('/starHour/:startHour', getClinicsWithStartHour);
router.get('/endHour/:endHour', getClinicsWithEndHour);
router.post(
    '/', 
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('address').notEmpty(),
    body('phone').notEmpty(),
    createClinic
);
router.patch(
    '/',
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('address').notEmpty(),
    body('phone').notEmpty(),
    updateClinic
);
router.delete(
    '/',
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    deleteClinic
);

module.exports = router;