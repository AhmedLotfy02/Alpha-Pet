const { validationResult } = require('express-validator');
const connection = require('../connection.js');

const getCommentsOfOwner = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email } = req.params;
    const { postType } = req.query;
    // let sqlStr;
    // if(postType == 'owner') sqlStr = `SELECT * FROM OwnerPost_OwnerComment, Owner_Comment WHERE OwnerComment_ID = C_Id AND OwnerEmail = '${email}';`;
    // else if(postType == 'vet') sqlStr = `SELECT * FROM VetPost_OwnerComment, Owner_Comment WHERE OwnerComment_ID = C_Id AND OwnerEmail = '${email}';`;
    // else if(postType == 'pharmacist') sqlStr = `SELECT * FROM PharmacistPost_OwnerComment, Owner_Comment WHERE OwnerComment_ID = C_Id AND OwnerEmail = '${email}';`;
    // else sqlStr = `SELECT * FROM Owner_Comment WHERE OwnerEmail = '${email}'`;
	let sqlStr = `CALL getCommentsOfOwner('${email}', '${postType}')`;
    
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
    // const sqlStr = `SELECT * FROM Owner_Comment WHERE C_Id = ${id};`;
	let sqlStr = `CALL getOwnerCommentByID(${id})`;
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
    // const sqlStr = `INSERT INTO OWNER_COMMENT(COMMENT_CONTENT, OWNEREMAIL) VALUES ('${content}', '${currentUserEmail}');`;
	let sqlStr = `CALL createOwnerComment('${content}', '${currentUserEmail}')`;
    try {
        connection.query(sqlStr, (error, results, fields) => {
			if (error) return res.status(400).json({ message: error.message });
			
			commentId = results[0][0]['_orderId '];
			sqlStr = `CALL createOwnerCommentOnPost(${postId}, ${commentId}, '${postType}')`;
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

    // const sqlStr = `UPDATE OWNER_COMMENT SET CONTENT = '${content}' WHERE C_ID = ${commentId} AND OWNEREMAIL = '${currentUserEmail}';`;
    let sqlStr = `CALL updateOwnerComment(${commentId}, '${content}', '${currentUserEmail}')`;
	try {
        connection.query(sqlStr, (error, results, fields) => {
            if(error) return res.status(400).json({ message: error.message });

            res.status(200).json({ data: results, fields });            
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteComment = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { commentId, currentUserEmail } = req.body;

    // const sqlStr = `DELETE FROM OWNER_COMMENT WHERE C_ID = ${commentId} AND OWNEREMAIL = '${currentUserEmail}';`;
    let sqlStr = `CALL deleteOwnerComment(${commentId}, '${currentUserEmail}')`;
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
    getCommentsOfOwner,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}
