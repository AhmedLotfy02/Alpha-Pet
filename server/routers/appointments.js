const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const { 
    getAppointments,
    getAppointmentsWithStartDate,
    getAppointmentsWithEndDate,
    getAppointmentsWithOwnerEmail,
    getAppointmentsWithVetEmail,
    createAppointment,
    updateAppointment,
    deleteAppointment
} = require('../controllers/appointments.js');

const router = express.Router();

router.get('/', getAppointments);
router.get('/startDate/:startDate', getAppointmentsWithStartDate);
router.get('/endDate/:endDate', getAppointmentsWithEndDate);
router.get('/owner/:ownerEmail', getAppointmentsWithOwnerEmail);
router.get('/vet/:vetEmail', getAppointmentsWithVetEmail);
router.post(
    '/',
    auth,
    body('startDate').isDate(),
    body('endDate').isDate(),
    body('ownerEmail').isEmail().normalizeEmail(),
    body('vetEmail').isEmail().normalizeEmail(),
    createAppointment
);
router.patch(
    '/',
    auth,
    body('startDate').isDate(),
    body('oldStartDate').isDate(),
    body('endDate').isDate(),
    body('ownerEmail').isEmail().normalizeEmail(),
    body('vetEmail').isEmail().normalizeEmail(),
    updateAppointment
);
router.delete(
    '/',
    auth,
    body('oldStartDate').isDate(),
    body('vetEmail').isEmail().normalizeEmail(),
    deleteAppointment
);

module.exports = router;