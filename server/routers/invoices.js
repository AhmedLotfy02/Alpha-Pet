const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const { 
    getAllInvoices,
    getInvoiceById,
    getInvoicesOfPharmacy,
    getInvoicesOfVet,
	getInvoicesOfOwner,
    createInvoice,
    updateInvoice,
    deleteInvoice
} = require('../controllers/invoices.js');

const router = express.Router();

router.get('/', getAllInvoices);
router.get('/id/:invoiceId', getInvoiceById);
router.get('/pharmacy/:pharmacyId', getInvoicesOfPharmacy);
router.get('/vet/:vetEmail', getInvoicesOfVet);
router.get('/owner/:ownerEmail', getInvoicesOfOwner);
router.post(
    '/', 
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(), 
	body('ownerEmail').isEmail().normalizeEmail(),
	body('price').isFloat({ min: 5, max: 5000 }), 	
    body('requiredMedicines').notEmpty(),
    body('invoiceId').isInt(),
    body('pharmacyId').isInt(),
    createInvoice
);
router.patch(
    '/',
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(), 
    body('requiredMedicines').notEmpty(),
	body('ownerEmail').isEmail().normalizeEmail(),
	body('price').isFloat({ min: 5, max: 5000 }),
    body('invoiceId').isInt(),
    body('pharmacyId').isInt(),
    updateInvoice
);
router.delete(
    '/',
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('invoiceId').isInt(),
    deleteInvoice
);

module.exports = router;