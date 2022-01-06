const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();
//  Configuration 'Connection' Object
const config = {
    host: 'localhost',
    user: 'root',
   // password: process.env.MYSQL_SERVER_PASSWORD,           //  My mysql server password
   passowrd:'ahmed',
   database: 'alpha_pet'
}

//  Create Connection
const db = mysql.createConnection(config);

module.exports = db;