const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAllInvoices = (req, res) => {
    const sqlStr = `SELECT * FROM INVOICE;`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getInvoiceById = (req, res) => {
    const { invoiceId } = req.params;
    const sqlStr = `SELECT * FROM INVOICE WHERE INVOICEID = ${invoiceId};`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getInvoicesOfPharmacy = (req, res) => {
    const { pharmacyId } = req.params;
    const sqlStr = `SELECT * FROM INVOICE WHERE PHARMACYID = ${pharmacyId};`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getInvoicesOfVet = (req, res) => {
    const { vetEmail } = req.params;
    const sqlStr = `SELECT * FROM INVOICE WHERE VETEMAIL = '${vetEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createInvoice = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { invoiceId, pharmacyId, notes, requiredMedicines, currentUserEmail } = req.body;
    
    const sqlStr = `INSERT INTO INVOICE VALUES (${invoiceId}, '${notes}', '${requiredMedicines}', ${pharmacyId}, '${currentUserEmail}');`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateInvoice = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { invoiceId, pharmacyId, notes, requiredMedicines, currentUserEmail } = req.body;
    
    const sqlStr = `UPDATE INVOICE SET NOTES = '${notes}', REQUIREDMEDICINES = '${requiredMedicines}', PHARMACYID = '${pharmacyId}' WHERE INVOICEID = ${invoiceId} AND VETEMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteInvoice = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { invoiceId, currentUserEmail } = req.body;

    const sqlStr = `DELETE FROM INVOICE WHERE INVOICEID = ${invoiceId} AND VETEMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getAllInvoices,
    getInvoiceById,
    getInvoicesOfPharmacy,
    getInvoicesOfVet,
    createInvoice,
    updateInvoice,
    deleteInvoice
}
