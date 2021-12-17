const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAllClinics = (req, res) => {
    const sqlStr = `SELECT * FROM CLINIC`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) res.status(500).json({ message: "Server Error" });
            
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
            if(error) res.status(500).json({ message: "Server Error" });
            
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
            if(error) res.status(500).json({ message: "Server Error" });
            
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
            if(error) res.status(500).json({ message: "Server Error" });
            
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
            if(error) res.status(500).json({ message: "Server Error" });
            
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
            if(error) res.status(500).json({ message: "Server Error" });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createClinic = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //  Request body is invalid
      return res.status(400).json({ errors: errors.array() });
    }

    const { vetEmail, address, phone, startDay, endDay, startHour, endHour, currentUserEmail } = req.body;

    if(!vetEmail || !address || !phone){
        return res.status(400).json({ message: "Invalid Data" });
    }

    if(vetEmail != currentUserEmail){
        return res.status(400).json({ message: "Unauthorized User" });
    }

    const sqlStr2 = `SELECT VETEMAIL FROM CLINIC WHERE VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) res.status(500).json({ message: "Server Error" });
            
            if(results.length > 0) return res.status(400).json({ message: "This Vet Already Has A Clinic" });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    const sqlStr3 = `SELECT EMAIL FROM VET WHERE EMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr3, (error, results, fields) => {
            if(error) res.status(500).json({ message: "Server Error" });
            
            if(results.length = 0) return res.status(400).json({ message: "This Vet Doesn't Exist" });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
    const sqlStr = `INSERT INTO CLINIC VALUES (${vetEmail}, ${address}, ${phone}, ${startDay}, ${endDay}, ${startHour}, ${endHour})`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) res.status(500).json({ message: "Server Error" });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateClinic = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { vetEmail, address, phone, startDay, endDay, startHour, endHour, currentUserEmail } = req.body;
    
    if(!vetEmail || !address || !phone){
        return res.status(400).json({ message: "Invalid Data" });
    }
    
    if(vetEmail != currentUserEmail){
        return res.status(400).json({ message: "Unauthorized User" });
    }

    const sqlStr2 = `SELECT VETEMAIL FROM CLINIC WHERE VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) res.status(500).json({ message: "Server Error" });
            
            if(results.length == 0) return res.status(400).json({ message: "This Vet Doesn't Have A Clinic" });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
    const sqlStr = `UPDATE CLINIC SET VETEMAIL = ${vetEmail}, ADDRESS = ${address}, PHONE = ${phone}, STARTDAY = ${startDay}, ENDDAY = ${endDay}, STARTHOUR = ${startHour}, ENDHOUR = ${endHour} WHERE VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) res.status(500).json({ message: "Server Error" });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteClinic = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { vetEmail, currentUserEmail } = req.body;

    if(!vetEmail){
        return res.status(400).json({ message: "Invalid Data" });
    }
    
    if(vetEmail != currentUserEmail){
        return res.status(400).json({ message: "Unauthorized User" });
    }
    
    const sqlStr2 = `SELECT VETEMAIL FROM CLINIC WHERE VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr2, (error, results, fields) => {
            if(error) res.status(500).json({ message: "Server Error" });
            
            if(results.length == 0) return res.status(400).json({ message: "This Vet Doesn't Have A Clinic" });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
    const sqlStr = `DELETE FROM CLINIC WHERE VETEMAIL = ${vetEmail}`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }

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