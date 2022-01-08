const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getAppointments = (req, res) => {
    const sqlStr = `SELECT * FROM APPOINTMENT;`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getAppointmentsWithStartDate = (req, res) => {
    const { startDate } = req.params;
    const sqlStr = `SELECT * FROM APPOINTMENT WHERE STARTDATE = '${startDate}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getAppointmentsWithEndDate = (req, res) => {
    const { endDate } = req.params;
    const sqlStr = `SELECT * FROM APPOINTMENT WHERE ENDDATE = '${endDate}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getAppointmentsWithOwnerEmail = (req, res) => {
    const { ownerEmail } = req.params;
    const sqlStr = `SELECT * FROM APPOINTMENT WHERE OWNEREMAIL = '${ownerEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getAppointmentsWithVetEmail = (req, res) => {
    const { vetEmail } = req.params;
    console.log(req.params);
    const sqlStr = `SELECT * FROM APPOINTMENT WHERE VETEMAIL = '${vetEmail}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createAppointment = (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    console.log(req.body);
    const { currentUserEmail, vetEmail, startDate, endDate ,state} = req.body;
        
    const currentDate = Date.now();
   // if(startDate < currentDate || endDate < currentDate || startDate > endDate) return res.status(400).json({ message: "Invalid Date" });
	
	//else{
		try {
			/*const sqlStrCheckingVetAppointments = `SELECT STARTDATE, ENDDATE FROM APPOINTMENT WHERE VETEMAIL = '${vetEmail}' AND STATE = 2;`;
			connection.query(sqlStrCheckingVetAppointments, (error, results, fields) => {
				if(error) return res.status(400).json({ message: error.message });

				results.forEach(appointment => {
					if(
						(appointment.STARTDATE < startDate && appointment.ENDDATE > startDate) ||
						(appointment.STARTDATE > startDate && appointment.STARTDATE < endDate) ||
						appointment.STARTDATE == startDate ||
						appointment.ENDDATE == endDate
					){
						return res.status(400).json({ message: "The vet is not available at this time" });
					}
				});
				
				const sqlStrCheckingOwnerAppointments = `SELECT STARTDATE, ENDDATE FROM APPOINTMENT WHERE OWNEREMAIL = '${currentUserEmail}' AND STATE = 2;`;
				connection.query(sqlStrCheckingOwnerAppointments, (error, results, fields) => {
					if(error) return res.status(400).json({ message: error.message });

					results.forEach(appointment => {
						if(
							(appointment.STARTDATE < startDate && appointment.ENDDATE > startDate) ||
							(appointment.STARTDATE > startDate && appointment.STARTDATE < endDate) ||
							appointment.STARTDATE == startDate ||
							appointment.ENDDATE == endDate
						){
							return res.status(400).json({ message: "The owner is not available at this time" });
						}
					});*/
					
					const sqlStr = `INSERT INTO APPOINTMENT(startDate, endDate, ownerEmail, vetEmail,State) VALUES ('${startDate}', '${endDate}', '${currentUserEmail}', '${vetEmail}', ${state});`;
					connection.query(sqlStr, (error, results, fields) => {
						if(error) return res.status(400).json({ message: error.message });

						res.status(200).json({ data: results, fields });            
					});
				// });
			// });
		}
		catch (error) {
			res.status(400).json({ message: error.message });
		}
	//}
}

const updateAppointment = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { vetEmail, ownerEmail, startDate, endDate, oldStartDate, currentUserEmail } = req.body;
    
    if(currentUserEmail != ownerEmail && currentUserEmail != vetEmail) return res.status(400).json({ message: "Unauthorized User" });
    
    const currentDate = Date.now();
    if(startDate < currentDate || endDate < currentDate || startDate > endDate) return res.status(400).json({ message: "Invalid Date" });

    const sqlStrCheckingVetAppointments = `SELECT STARTDATE, ENDDATE FROM APPOINTMENT WHERE VETEMAIL = '${vetEmail}';`;
    try {
        connection.query(sqlStrCheckingVetAppointments, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            results.forEach(appointment => {
                if(appointment.startDate != oldStartDate) {
					if(
						(appointment.STARTDATE < startDate && appointment.ENDDATE > startDate) ||
						(appointment.STARTDATE > startDate && appointment.STARTDATE < endDate) ||
						appointment.STARTDATE == startDate ||
						appointment.ENDDATE == endDate
					){
						return res.status(400).json({ message: "The vet is not available at this time" });
					}
				}
            });           
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    const sqlStrCheckingOwnerAppointments = `SELECT STARTDATE, ENDDATE FROM APPOINTMENT WHERE OWNEREMAIL = '${ownerEmail}';`;
    try {
        connection.query(sqlStrCheckingOwnerAppointments, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            results.forEach(appointment => {
                if(appointment.startDate != oldStartDate) {
					if(
						(appointment.STARTDATE < startDate && appointment.ENDDATE > startDate) ||
						(appointment.STARTDATE > startDate && appointment.STARTDATE < endDate) ||
						appointment.STARTDATE == startDate ||
						appointment.ENDDATE == endDate
					){
						return res.status(400).json({ message: "The owner is not available at this time" });
					}
				}
            });           
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
    const sqlStr = `UPDATE APPOINTMENT SET STARTDATE = '${startDate}', ENDDATE = '${endDate}' WHERE VETEMAIL = '${vetEmail}' AND STARTDATE = '${oldStartDate}';`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateStateOfAppointment = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentUserEmail, startDate, state, ownerEmail, Id } = req.body;

    
    try {
		/*const sqlStrCheckingVetAppointments = `SELECT STARTDATE, ENDDATE, ID FROM APPOINTMENT WHERE VETEMAIL = '${currentUserEmail}' AND STATE = 2;`;
        connection.query(sqlStrCheckingVetAppointments, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            results.forEach(appointment => {
                if(appointment.ID != Id) {
					if(
						(appointment.STARTDATE < startDate && appointment.ENDDATE > startDate) ||
						(appointment.STARTDATE > startDate && appointment.STARTDATE < endDate) ||
						appointment.STARTDATE == startDate ||
						appointment.ENDDATE == endDate
					){
						return res.status(400).json({ message: "The vet is not available at this time" });
					}
				}
            });

			const sqlStrCheckingOwnerAppointments = `SELECT STARTDATE, ENDDATE, ID FROM APPOINTMENT WHERE OWNEREMAIL = '${ownerEmail}' AND STATE = 2;`;
			connection.query(sqlStrCheckingOwnerAppointments, (error, results, fields) => {
				if(error) return res.status(400).json({ message: error.message });

				results.forEach(appointment => {
					if(appointment.ID != Id) {
						if(
							(appointment.startDate < startDate && appointment.endDate > startDate) ||
							(appointment.startDate > startDate && appointment.startDate < endDate) ||
							appointment.startDate == startDate ||
							appointment.endDate == endDate
						){
							return res.status(400).json({ message: "The owner is not available at this time" });
						}
					}
				});*/

				const sqlStr = `UPDATE APPOINTMENT SET STATE = ${state} WHERE VETEMAIL = $'{currentUserEmail}' AND ID = ${Id};`;
				connection.query(sqlStr, (error, results, fields) => {
					if(error) return res.status(400).json({ message: error.message });

					res.status(200).json({ data: results, fields });            
				});
			// });
        // });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteAppointment = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { ownerEmail, vetEmail, startDate, currentUserEmail } = req.body;

    if(currentUserEmail != ownerEmail && currentUserEmail != vetEmail) return res.status(400).json({ message: "Unauthorized User" });
    
    const sqlStr = `DELETE FROM APPOINTMENT WHERE VETEMAIL = '${vetEmail}' AND STARTDATE = '${startDate}';`;
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
    getAppointments,
    getAppointmentsWithStartDate,
    getAppointmentsWithEndDate,
    getAppointmentsWithOwnerEmail,
    getAppointmentsWithVetEmail,
    createAppointment,
    updateAppointment,
    deleteAppointment
}