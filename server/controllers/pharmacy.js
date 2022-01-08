const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAllPharmacies = (req, res) => {
    const sqlStr = `SELECT * FROM PHARMACY;`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPharmacyOfPharmacist = (req, res) => {
    const { pharmacistEmail } = req.params;
    const sqlStr = `SELECT ID, ADDRESS, PHONE, STARTDAY, ENDDAY, STARTHOUR, ENDHOUR FROM PHARMACY, PHARMACIST WHERE ID = PHARMACY_ID AND EMAIL = '${pharmacistEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPharmaciesWithStartDay = (req, res) => {
    const { startDay } = req.params;
    const sqlStr = `SELECT * PHARMACY WHERE STARTDAY = '${startDay}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPharmaciesWithEndDay = (req, res) => {
    const { endDay } = req.params;
    const sqlStr = `SELECT * FROM PHARMACY WHERE ENDDAY = '${endDay}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPharmaciesWithStartHour = (req, res) => {
    const { startHour } = req.params;
    const sqlStr = `SELECT * FROM PHARMACY WHERE STARTHOUR = '${startHour}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPharmaciesWithEndHour = (req, res) => {
    const { endHour } = req.params;
    const sqlStr = `SELECT * FROM PHARMACY WHERE ENDHOUR = '${endHour}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createPharmacy = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id, address, phone, startDay, endDay, startHour, endHour, currentUserEmail } = req.body;

    const sqlStr2 = `SELECT EMAIL FROM PHARMACIST WHERE EMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(400).json({ message: "This user is not a pharmacist" });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
    const sqlStr = `INSERT INTO PHARMACY VALUES (${id}, '${address}', ${phone}, '${startDay}', '${endDay}', '${startHour}', '${endHour}');`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updatePharmacy = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id, address, phone, startDay, endDay, startHour, endHour, currentUserEmail } = req.body;

    const sqlStr2 = `SELECT EMAIL FROM PHARMACIST, PHARMACY WHERE ID = PHARMACY_ID AND EMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(400).json({ message: "This user doesn't work in this pharmacy" });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
    const sqlStr = `UPDATE PHARMACY SET  ADDRESS = '${address}', PHONE = ${phone}, STARTDAY = '${startDay}', ENDDAY = '${endDay}', STARTHOUR = '${startHour}', ENDHOUR = '${endHour}' WHERE ID = ${id};`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deletePharmacy = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id, currentUserEmail } = req.body;
    
    const sqlStr2 = `SELECT EMAIL FROM PHARMACIST, PHARMACY WHERE ID = PHARMACY_ID AND EMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) res.status(500).json({ message: error.message });
            
            if(results.length == 0) return res.status(400).json({ message: "This user doesn't work in this pharmacy" });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
    const sqlStr = `DELETE FROM PHARMACY WHERE ID = ${id};`;
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
    getAllPharmacies,
    getPharmacyOfPharmacist,
    getPharmaciesWithStartDay,
    getPharmaciesWithEndDay,
    getPharmaciesWithStartHour,
    getPharmaciesWithEndHour,
    createPharmacy,
    updatePharmacy,
    deletePharmacy
}