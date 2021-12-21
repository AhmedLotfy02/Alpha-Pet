const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAllClinics = (req, res) => {
    const sqlStr = `SELECT * FROM CLINIC`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getClinicOfVet = (req, res) => {
    const { vetEmail } = req.params;
    const sqlStr = `SELECT * FROM CLINIC WHERE VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getClinicsWithStartDay = (req, res) => {
    const { startDay } = req.params;
    const sqlStr = `SELECT * FROM CLINIC WHERE STARTDAY = ${startDay}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getClinicsWithEndDay = (req, res) => {
    const { endDay } = req.params;
    const sqlStr = `SELECT * FROM CLINIC WHERE ENDDAY = ${endDay}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getClinicsWithStartHour = (req, res) => {
    const { startHour } = req.params;
    const sqlStr = `SELECT * FROM CLINIC WHERE STARTHOUR = ${startHour}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getClinicsWithEndHour = (req, res) => {
    const { endHour } = req.params;
    const sqlStr = `SELECT * FROM CLINIC WHERE ENDHOUR = ${endHour}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createClinic = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { address, phone, startDay, endDay, startHour, endHour, currentUserEmail } = req.body;
    
    const sqlStr = `INSERT INTO CLINIC VALUES (${currentUserEmail}, ${address}, ${phone}, ${startDay}, ${endDay}, ${startHour}, ${endHour})`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateClinic = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { address, phone, startDay, endDay, startHour, endHour, currentUserEmail } = req.body;
    
    const sqlStr = `UPDATE CLINIC SET ADDRESS = ${address}, PHONE = ${phone}, STARTDAY = ${startDay}, ENDDAY = ${endDay}, STARTHOUR = ${startHour}, ENDHOUR = ${endHour} WHERE VETEMAIL = ${currentUserEmail}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteClinic = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentUserEmail } = req.body;
    
    const sqlStr = `DELETE FROM CLINIC WHERE VETEMAIL = ${currentUserEmail}`;
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
    getAllClinics,
    getClinicOfVet,
    getClinicsWithStartDay,
    getClinicsWithEndDay,
    getClinicsWithStartHour,
    getClinicsWithEndHour,
    createClinic,
    updateClinic,
    deleteClinic
}