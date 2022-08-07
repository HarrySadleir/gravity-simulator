const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

// Import values from .env
dotenv.config();
const port = process.env.PORT;

const app = express();

app.listen(port, () => console.log("Listening at: " + port));

app.use('/', express.static(path.join(__dirname, '../client')));