const  jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        //  TODO: Authentication

        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth;