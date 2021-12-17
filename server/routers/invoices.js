const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const { 
    getAllInvoices,
    getInvoiceById,
    getInvoicesOfPharmacy,
    getInvoicesOfVet,
    createInvoice,
    updateInvoice,
    deleteInvoice
} = require('../controllers/invoices.js');

const router = express.Router();

router.get('/', getAllInvoices);
router.get('/:invoiceId', getInvoiceById);
router.get('/pharmacy/:pharmacyId', getInvoicesOfPharmacy);
router.get('/vet/:vetEmail', getInvoicesOfVet);
router.post(
    '/', 
    auth,
    body('vetEmail').isEmail().normalizeEmail(), 
    body('currentUserEmail').isEmail().normalizeEmail(), 
    body('requiredMedicines').notEmpty(),
    body('invoiceId').isInt(),
    body('pharmacyId').isInt(),
    createInvoice
);
router.patch(
    '/',
    auth,
    body('vetEmail').isEmail().normalizeEmail(), 
    body('currentUserEmail').isEmail().normalizeEmail(), 
    body('requiredMedicines').notEmpty(),
    body('invoiceId').isInt(),
    body('pharmacyId').isInt(),
    updateInvoice
);
router.delete(
    '/',
    auth,
    body('vetEmail').isEmail().normalizeEmail(),
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('invoiceId').isInt(),
    deleteInvoice
);

module.exports = router;