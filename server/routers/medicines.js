const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const { 
    getAllMedicines,
    getMedicineById,
    getMedicineByName,
    getMedicinesByPrice,
    getMedicinesOfPharmacy,
    getMedicineQuantity,
    createMedicine,
    addMedicine,
    updateMedicine,
    deleteMedicine
} = require('../controllers/medicines.js');

const router = express.Router();

router.get('/', getAllMedicines);
router.get('id/:id', getMedicineById);
router.get('name/:name', getMedicineByName);
router.get('price/:price', getMedicinesByPrice);
router.get('pharmacyMedicines/:pharmacyId', getMedicinesOfPharmacy);
router.get('quantity/:pharmacyId/:medicineId', getMedicineQuantity);
router.post(
    '/', 
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('medicineId').isInt().notEmpty(),
    body('medicineName').notEmpty(),
    body('description').notEmpty(),
    body('price').isInt().notEmpty(),
    createMedicine
);
router.post(
    '/add', 
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('medicineId').isInt().notEmpty(), 
    body('pharmacyId').isInt().notEmpty(), 
    body('quantity').isInt(), 
    addMedicine
);
router.patch(
    '/update', 
    auth, 
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('medicineId').isInt().notEmpty(), 
    body('pharmacyId').isInt().notEmpty(), 
    body('quantity').isInt(),
    updateMedicine
);
router.delete(
    '/delete', 
    auth, 
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('medicineId').isInt().notEmpty(), 
    body('pharmacyId').isInt().notEmpty(), 
    deleteMedicine
);

module.exports = router;