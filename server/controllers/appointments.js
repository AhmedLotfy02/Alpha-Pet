const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAppointments = async (req, res) => {
    const sqlStr = `SELECT * FROM APPOINTMENT`;
    try {
        await connection.query(sqlStr, (error, results, fields) => {
            // error will be an Error if one occurred during the query
            if(error){
                console.log(error);
                return;
            }
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getAppointmentsWithStartDate = async (req, res) => {
    const { startDate } = req.params;
    const sqlStr = `SELECT * FROM APPOINTMENT WHERE STARTDATE = ${startDate}`;
    try {
        await connection.query(sqlStr, (error, results, fields) => {
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

const getAppointmentsWithEndDate = async (req, res) => {
    const { endDate } = req.params;
    const sqlStr = `SELECT * FROM APPOINTMENT WHERE ENDDATE = ${endDate}`;
    try {
        await connection.query(sqlStr, (error, results, fields) => {
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

const getAppointmentsWithOwnerEmail = (req, res) => {
    const { ownerEmail } = req.params;
    const sqlStr = `SELECT * FROM APPOINTMENT WHERE OWNEREMAIL = ${ownerEmail}`;
    try {
        await connection.query(sqlStr, (error, results, fields) => {
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

const getAppointmentsWithVetEmail = (req, res) => {
    const { vetEmail } = req.params;
    const sqlStr = `SELECT * FROM APPOINTMENT WHERE VETEMAIL = ${vetEmail}`;
    try {
        await connection.query(sqlStr, (error, results, fields) => {
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

const createAppointment = (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //  Request body is invalid
      return res.status(400).json({ errors: errors.array() });
    }

    const { vetEmail, ownerEmail, startDate, endDate } = req.body;
    const currentDate = Date.now();
    if(startDate < currentDate || endDate < currentDate || startDate > endDate){
        return res.status(400).json({ message: "Invalid Date" });
    }

    const sqlStr2 = `SELECT STARTDATE, ENDDATE FROM APPOINTMENT WHERE VETEMAIL = ${vetEmail}`;
    try {
        await connection.query(sqlStr2, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }

            results.forEach(appointment => {
                if(
                    (appointment.startDate < startDate && appointment.endDate > startDate) ||
                    (appointment.startDate > startDate && appointment.startDate < endDate) ||
                    appointment.startDate == startDate ||
                    appointment.endDate == endDate
                ){
                    return res.status(400).json({ message: "The vet is not available at this time" });
                }
            });           
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    const sqlStr3 = `SELECT STARTDATE, ENDDATE FROM APPOINTMENT WHERE OWNEREMAIL = ${ownerEmail}`;
    try {
        await connection.query(sqlStr3, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }

            results.forEach(appointment => {
                if(
                    (appointment.startDate < startDate && appointment.endDate > startDate) ||
                    (appointment.startDate > startDate && appointment.startDate < endDate) ||
                    appointment.startDate == startDate ||
                    appointment.endDate == endDate
                ){
                    return res.status(400).json({ message: "The owner is not available at this time" });
                }
            });           
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
    //  Request body is valid and the appointment will be inserted
    const sqlStr = `INSERT INTO APPOINTMENT VALUES (${startDate}, ${endDate}, ${ownerEmail}, ${vetEmail})`;
    try {
        await connection.query(sqlStr, (error, results, fields) => {
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

const updateAppointment = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //  Request body is invalid
      return res.status(400).json({ errors: errors.array() });
    }

    const { vetEmail, ownerEmail, startDate, endDate, oldStartDate } = req.body;
    const currentDate = Date.now();
    if(startDate < currentDate || endDate < currentDate || startDate > endDate){
        return res.status(400).json({ message: "Invalid Date" });
    }

    const sqlStr2 = `SELECT STARTDATE, ENDDATE FROM APPOINTMENT WHERE VETEMAIL = ${vetEmail}`;
    try {
        await connection.query(sqlStr2, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }

            results.forEach(appointment => {
                if(appointment.startDate == oldStartDate){
                    continue;
                }

                if(
                    (appointment.startDate < startDate && appointment.endDate > startDate) ||
                    (appointment.startDate > startDate && appointment.startDate < endDate) ||
                    appointment.startDate == startDate ||
                    appointment.endDate == endDate
                ){
                    return res.status(400).json({ message: "The vet is not available at this time" });
                }
            });           
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    const sqlStr3 = `SELECT STARTDATE, ENDDATE FROM APPOINTMENT WHERE OWNEREMAIL = ${ownerEmail}`;
    try {
        await connection.query(sqlStr3, (error, results, fields) => {
            if(error){
                console.log(error);
                return;
            }

            results.forEach(appointment => {
                if(appointment.startDate == oldStartDate){
                    continue;
                }

                if(
                    (appointment.startDate < startDate && appointment.endDate > startDate) ||
                    (appointment.startDate > startDate && appointment.startDate < endDate) ||
                    appointment.startDate == startDate ||
                    appointment.endDate == endDate
                ){
                    return res.status(400).json({ message: "The owner is not available at this time" });
                }
            });           
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
    //  Request body is valid and the appointment will be inserted
    const sqlStr = `UPDATE APPOINTMENT SET STARTDATE = ${startDate}, ENDDATE = ${endDate} WHERE VETEMAIL = ${vetEmail} AND STARTDATE = ${oldStartDate}`;
    try {
        await connection.query(sqlStr, (error, results, fields) => {
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

const deleteAppointment = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //  Request body is invalid
      return res.status(400).json({ errors: errors.array() });
    }

    const { vetEmail, oldStartDate } = req.body;
    
    //  Request body is valid and the appointment will be inserted
    const sqlStr = `DELETE APPOINTMENT WHERE VETEMAIL = ${vetEmail} AND STARTDATE = ${oldStartDate}`;
    try {
        await connection.query(sqlStr, (error, results, fields) => {
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
    getAppointments,
    getAppointmentsWithStartDate,
    getAppointmentsWithEndDate,
    getAppointmentsWithOwnerEmail,
    getAppointmentsWithVetEmail,
    createAppointment,
    updateAppointment,
    deleteAppointment
}
