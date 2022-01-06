const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
		const token = req.headers.authorization.split(" ")[1].slice(0, -1);	//	to remove the " in the last character in the string
        // jwt.verify(token, "this_should_be_very_long");
		const decoded = jwt.verify(token, "this_should_be_very_long");
        req.body.currentUserEmail = decoded.email;						//	used in the the functions
        next();
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};