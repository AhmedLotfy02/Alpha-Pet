-- 		SPROC to create an Owner Comment 
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `createOwnerComment`(IN content varchar(10000), IN currentUserEmail varchar(50))
BEGIN
	INSERT INTO OWNER_COMMENT(COMMENT_CONTENT, OWNEREMAIL) VALUES (content, currentUserEmail);
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		SPROC to create an Owner Comment on determined Post 
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `createOwnerCommentOnPost`(IN postId int, IN commentId int, IN postType varchar(10))
BEGIN
	if postType = 'owner' then
		INSERT INTO OwnerPost_OwnerComment VALUES (postId, commentId);
	elseif postType = 'vet' then 
		INSERT INTO VetPost_OwnerComment VALUES (postId, commentId);
	elseif postType = 'pharmacist' then 
		INSERT INTO PharmacistPost_OwnerComment VALUES (postId, commentId);
    end if;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		SPROC to create an Pharmacist Comment
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `createPharmacistComment`(IN content varchar(10000), IN currentUserEmail varchar(50))
BEGIN
	INSERT INTO Pharmacist_COMMENT(COMMENT_CONTENT, PharmacistEMAIL) VALUES (content, currentUserEmail);
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		SPROC to create Pharmacist Comment on determined Post 
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `createPharmacistCommentOnPost`(IN postId int, IN commentId int, IN postType varchar(10))
BEGIN
	if postType = 'owner' then
		INSERT INTO OwnerPost_PharmacistComment VALUES (postId, commentId);
	elseif postType = 'vet' then 
		INSERT INTO VetPost_PharmacistComment VALUES (postId, commentId);
	elseif postType = 'pharmacist' then 
		INSERT INTO PharmacistPost_PharmacistComment VALUES (postId, commentId);
    end if;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		SPROC to create an Vet Comment
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `createVetComment`(IN content varchar(10000), IN currentUserEmail varchar(50))
BEGIN
	INSERT INTO VET_COMMENT(COMMENT_CONTENT, VETEMAIL) VALUES (content, currentUserEmail);
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		SPROC to create Vet Comment on determined Post 
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `createVetCommentOnPost`(IN postId int, IN commentId int, IN postType varchar(10))
BEGIN
	if postType = 'owner' then
		INSERT INTO OwnerPost_VetComment VALUES (postId, commentId);
	elseif postType = 'vet' then 
		INSERT INTO VetPost_VetComment VALUES (postId, commentId);
	elseif postType = 'pharmacist' then 
		INSERT INTO PharmacistPost_VetComment VALUES (postId, commentId);
    end if;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		delete owner comment
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteOwnerComment`(IN commentId int, IN currentUserEmail varchar(50))
BEGIN
	DELETE FROM OWNER_COMMENT WHERE C_ID = commentId AND OWNEREMAIL = currentUserEmail;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		delete Pharmacist comment
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePharmacistComment`(IN commentId int, IN currentUserEmail varchar(50))
BEGIN
	DELETE FROM Pharmacist_COMMENT WHERE C_ID = commentId AND PharmacistEMAIL = currentUserEmail;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		delete Vet comment
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteVetComment`(IN commentId int, IN currentUserEmail varchar(50))
BEGIN
	DELETE FROM VET_COMMENT WHERE C_ID = commentId AND VETEMAIL = currentUserEmail;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		get comments of owner on a determined post
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCommentsOfOwner`(IN email varchar(50), IN postType varchar(10))
BEGIN
	if postType = 'owner' then
		SELECT * FROM OwnerPost_OwnerComment, Owner_Comment WHERE OwnerComment_ID = C_Id AND OwnerEmail = email;
	elseif postType = 'vet' then 
		SELECT * FROM VetPost_OwnerComment, Owner_Comment WHERE OwnerComment_ID = C_Id AND OwnerEmail = email;
	elseif postType = 'pharmacist' then 
		SELECT * FROM PharmacistPost_OwnerComment, Owner_Comment WHERE OwnerComment_ID = C_Id AND OwnerEmail = email;
    else
		SELECT * FROM Owner_Comment WHERE OwnerEmail = email;
    end if;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		get comments of Pharmacist on a determined post
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCommentsOfPharmacist`(IN email varchar(50), IN postType varchar(10))
BEGIN
	if postType = 'owner' then
		SELECT * FROM OwnerPost_VetComment, Pharmacist_Comment WHERE PharmacistComment_ID = C_Id AND PharmacistEmail = email;
	elseif postType = 'vet' then 
		SELECT * FROM VetPost_VetComment, Pharmacist_Comment WHERE PharmacistComment_ID = C_Id AND PharmacistEmail = email;
	elseif postType = 'pharmacist' then 
		SELECT * FROM PharmacistPost_VetComment, Pharmacist_Comment WHERE PharmacistComment_ID = C_Id AND PharmacistEmail = email;
    else
		SELECT * FROM Pharmacist_Comment WHERE PharmacistEmail = email;
    end if;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		get comments of Vet on a determined post
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCommentsOfVet`(IN email varchar(50), IN postType varchar(10))
BEGIN
	if postType = 'owner' then
		SELECT * FROM OwnerPost_VetComment, Vet_Comment WHERE VetComment_ID = C_Id AND VetEmail = email;
	elseif postType = 'vet' then 
		SELECT * FROM VetPost_VetComment, Vet_Comment WHERE VetComment_ID = C_Id AND VetEmail = email;
	elseif postType = 'pharmacist' then 
		SELECT * FROM PharmacistPost_VetComment, Vet_Comment WHERE VetComment_ID = C_Id AND VetEmail = email;
    else
		SELECT * FROM Vet_Comment WHERE VetEmail = email;
    end if;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		get comment of Owner by ID
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getOwnerCommentByID`(IN ID int)
BEGIN
	SELECT * FROM Owner_Comment WHERE C_Id=ID; 
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		get comment of Pharmacist by ID
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPharmacistCommentByID`(IN ID int)
BEGIN
	SELECT * FROM Pharmacist_Comment WHERE C_Id=ID;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		get comment of Vet by ID
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getVetCommentByID`(IN ID int)
BEGIN
SELECT * FROM Vet_Comment WHERE C_Id = ID;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		Update Owner Comment
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateOwnerComment`(IN commentId int, IN content varchar(10000), IN currentUserEmail varchar(50))
BEGIN
	UPDATE OWNER_COMMENT SET CONTENT = content WHERE C_ID = commentId AND OWNEREMAIL = currentUserEmail;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		Update Pharmacist Comment
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePharmacistComment`(IN commentId int, IN content varchar(10000), IN currentUserEmail varchar(50))
BEGIN
	UPDATE Pharmacist_COMMENT SET CONTENT = content WHERE C_ID = commentId AND PharmacistEMAIL = currentUserEmail;
END$$
DELIMITER ;
-- ////////////////////////////////////////////////////////////////////////////////////
-- 		Update Vet Comment
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateVetComment`(IN commentId int, IN content varchar(10000), IN currentUserEmail varchar(50))
BEGIN
	UPDATE VET_COMMENT SET CONTENT = content WHERE C_ID = commentId AND VETEMAIL = currentUserEmail;
END$$
DELIMITER ;



