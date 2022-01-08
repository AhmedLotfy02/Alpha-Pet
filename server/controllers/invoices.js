const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAllInvoices = (req, res) => {
    const sqlStr = `SELECT * FROM INVOICE;`;
   
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            console.log(results);
            res.status(200).json({ data: results });
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

const getInvoicesOfOwner = (req, res) => {
    console.log(req.params);
    const { ownerEmail } = req.params;
    const sqlStr = `SELECT * FROM INVOICE WHERE OWNEREMAIL = '${ownerEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            console.log(results); 
            res.status(200).json({ data: results });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createInvoice = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    console.log(req.body);
    const { invoiceId, pharmacyId, notes, requiredMedicines, ownerEmail, price, currentUserEmail,state} = req.body;
    
    const sqlStr = `INSERT INTO INVOICE VALUES ( '${notes}', '${requiredMedicines}', ${pharmacyId}, '${currentUserEmail}', '${ownerEmail}', ${price},${state});`;
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

    const { invoiceId, pharmacyId, notes, requiredMedicines, ownerEmail, price, currentUserEmail } = req.body;
    
const sqlStr = `UPDATE INVOICE SET NOTES = '${notes}', REQUIREDMEDICINES = '${requiredMedicines}', PHARMACYID = ${pharmacyId}, OWNEREMAIL = '${ownerEmail}', PRICE = ${price} WHERE INVOICEID = ${invoiceId} AND VETEMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const checkInvoice = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { invoiceId, state } = req.body;
    
	let sqlStr = `UPDATE INVOICE SET STATE = ${state} WHERE INVOICEID = ${invoiceId};`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            console.log(state);
            if(state == 2){
				sqlStr = `SELECT OWNEREMAIL, PRICE FROM INVOICE WHERE INVOICEID = ${invoiceId};`;
				connection.query(sqlStr, (error, results, fields) => {
					if(error) return res.status(400).json({ message: error.message });
					let price = results[0].PRICE;
					let ownerEmail = results[0].OWNEREMAIL;
					console.log(results[0]);
                    
                    console.log(results[0].OWNEREMAIL);
					sqlStr = `UPDATE OWNER_TABLE SET BALANCE = BALANCE - ${price} WHERE EMAIL = '${ownerEmail}';`;
					connection.query(sqlStr, (error, results, fields) => {
						if(error) return res.status(400).json({ message: error.message }); 
						return res.status(200).json({ data: "Invoice is Accepted" }); 
					});
				});
			}
           
            else{
                return res.status(200).json({ data: "Invoice is Rejected" }); 

            }
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
	getInvoicesOfOwner,
    createInvoice,
    updateInvoice,
	checkInvoice,
    deleteInvoice
}
