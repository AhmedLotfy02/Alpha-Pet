const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAllMedicines = (req, res) => {
    const sqlStr = `SELECT * FROM MEDICINES;`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getMedicineById = (req, res) => {
    const { id } = req.params;
    const sqlStr = `SELECT * FROM MEDICINES WHERE MEDICINEID = ${id};`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getMedicineByName = (req, res) => {
    const { name } = req.params;
    const sqlStr = `SELECT * FROM MEDICINES WHERE MEDNAME = '${name}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getMedicinesByPrice = (req, res) => {
    const { price } = req.params;
    const { range } = req.query;
    const sqlStr = `SELECT * FROM MEDICINES WHERE PRICE = ${price};`;
    if(range == 'gt'){
        sqlStr = `SELECT * FROM MEDICINES WHERE PRICE > ${price};`;
    }else if(range == 'lt'){
        sqlStr = `SELECT * FROM MEDICINES WHERE PRICE < ${price};`;
    }

    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getMedicinesOfPharmacy = (req, res) => {
    const { pharmacyId } = req.params;
    const sqlStr = `SELECT * FROM MEDICINES NATURAL JOIN Medcine_Pharmacy PHARMACYID = ${pharmacyId};`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getMedicineQuantity = (req, res) => {
    const { pharmacyId, medicineId } = req.params;
    const sqlStr = `SELECT QUANTITY FROM MEDICINES NATURAL JOIN Medcine_Pharmacy PHARMACYID = ${pharmacyId} AND MEDICINEID = ${medicineId};`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createMedicine = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentUserEmail, medicineId, medicineName, description, price } = req.body;
    
    const sqlStrCheckingPharmacist = `SELECT * FROM PHARMACIST WHERE EMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStrCheckingPharmacist, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(400).json({ message: "Unauthorized User" });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    const sqlStr = `INSERT INTO MEDICINES VALUES(${medicineId}, '${medicineName}', '${description}', ${price});`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const addMedicine = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentUserEmail, medicineId, pharmacyId, quantity } = req.body;

    const sqlStrCheckingPharmacist = `SELECT * FROM PHARMACIST, PHARMACY WHERE ID = PHARMACY_ID AND EMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStrCheckingPharmacist, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(400).json({ message: "Unauthorized User" });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    const sqlStr = `INSERT INTO Medcine_Pharmacy VALUES(${pharmacyId}, ${medicineId}, ${quantity});`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateMedicine = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentUserEmail, medicineId, pharmacyId, quantity } = req.body;

    const sqlStrCheckingPharmacist = `SELECT * FROM PHARMACIST, PHARMACY WHERE ID = PHARMACY_ID AND EMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStrCheckingPharmacist, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(400).json({ message: "Unauthorized User" });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    const sqlStr = `UPDATE Medcine_Pharmacy SET QUANTITY = ${quantity} WHERE PHARMACYID = ${pharmacyId} AND MEDICINEID = ${medicineId};`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteMedicine = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentUserEmail, medicineId, pharmacyId, quantity } = req.body;

    const sqlStrCheckingPharmacist = `SELECT * FROM PHARMACIST, PHARMACY WHERE ID = PHARMACY_ID AND EMAIL = '${currentUserEmail}';`;
    try {
        connection.query(sqlStrCheckingPharmacist, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            if(results.length == 0) return res.status(400).json({ message: "Unauthorized User" });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    const sqlStr = `DELETE FROM Medcine_Pharmacy WHERE PHARMACYID = ${pharmacyId} AND MEDICINEID = ${medicineId};`;
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
}