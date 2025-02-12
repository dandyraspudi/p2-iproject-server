if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const routes = require('./routers');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

module.exports = app;