const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/', (req, res) => {
    res.send('Welcome to Alpha-Pet App');
});

//  Configuration 'Connection' Object
const config = {
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_SERVER_PASSWORD,           //  My mysql server password
    database: 'alphapet'
}

//  Create Connection
const db = mysql.createConnection(config);

const PORT = process.env.PORT || 5000;

//  Connect to MySql server
db.connect((err) => {
    if(err){
        throw err;
    }else{
        console.log('MySql Connected...');
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    }
});

