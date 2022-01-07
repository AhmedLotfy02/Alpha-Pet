const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getCommentsOfPharmacist = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email } = req.params;
    const { postType } = req.query;
	let sqlStr = `CALL getCommentsOfPharmacist('${email}', '${postType}')`;
    // let sqlStr;
    // if(postType == 'owner') sqlStr = `SELECT * FROM OwnerPost_PharmacistComment, Pharmacist_Comment WHERE PharmacistComment_ID = C_Id AND PharmacistEMAIL = '${email}';`;
    // else if(postType == 'vet') sqlStr = `SELECT * FROM VetPost_PharmacistComment, Pharmacist_Comment WHERE PharmacistComment_ID = C_Id AND PharmacistEMAIL = '${email}';`;
    // else if(postType == 'pharmacist') sqlStr = `SELECT * FROM PharmacistPost_PharmacistComment, Pharmacist_Comment WHERE PharmacistComment_ID = C_Id AND PharmacistEMAIL = '${email}';`;
    // else sqlStr = `SELECT * FROM Pharmacist_Comment WHERE PharmacistEMAIL = '${email}';`;
    
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getCommentById = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    // const sqlStr = `SELECT * FROM Pharmacist_Comment WHERE C_Id = ${id};`;
	let sqlStr = `CALL getPharmacistCommentByID(${id})`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });
            
            res.status(200).json({ data: results, fields });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createComment = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { postId, content, currentUserEmail } = req.body;
    const { postType } = req.query;
    let commentId = 0;
    let comment;
    // const sqlStr = `INSERT INTO Pharmacist_COMMENT(COMMENT_CONTENT, PharmacistEMAIL) VALUES ('${content}', '${currentUserEmail}');`;
    let sqlStr = `CALL createPharmacistComment('${content}', '${currentUserEmail}')`;
	try {
        connection.query(sqlStr, (error, results, fields) => {
			if (error) return res.status(400).json({ message: error.message });
			
			commentId = results[0][0]['_orderId '];
			sqlStr = `CALL createPharmacistCommentOnPost(${postId}, ${commentId}, '${postType}')`;
			connection.query(sqlStr, true, (error, results, fields) => {
				if (error) return res.status(400).json({ message: error.message });
				
				res.status(200).json({ data: results, fields });
			});
		});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateComment = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { commentId, content, currentUserEmail } = req.body;

    // const sqlStr = `UPDATE Pharmacist_COMMENT SET CONTENT = '${content}' WHERE C_ID = ${commentId} AND PharmacistEMAIL = '${currentUserEmail}';`;
    let sqlStr = `CALL updatePharmacistComment(${commentId}, '${content}', '${currentUserEmail}')`;
	try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: comment, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteComment = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { commentId, currentUserEmail } = req.body;

    // const sqlStr = `DELETE FROM Pharmacist_COMMENT WHERE C_ID = ${commentId} AND PharmacistEMAIL = '${currentUserEmail}';`;
    let sqlStr = `CALL deletePharmacistComment(${commentId}, '${currentUserEmail}')`;
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
    getCommentsOfPharmacist,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}
