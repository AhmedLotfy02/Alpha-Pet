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
	checkInvoice,
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
    createInvoice
);
router.patch(
    '/',
    updateInvoice
);
router.patch(
    '/check',
    
    checkInvoice
);
router.delete(
    '/',
    auth,
    body('currentUserEmail').isEmail().normalizeEmail(),
    body('invoiceId').isInt(),
    deleteInvoice
);

module.exports = router;