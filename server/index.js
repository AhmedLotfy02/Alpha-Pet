const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/', (req, res) => {
    res.send('Welcome to Alpha-Pet App');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))