const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const db = require('./data/database');
const bodyParser = require('body-parser');
const routes = require('./routes');

const port = process.env.PORT || 4001;

app.use(bodyParser.json());

// CORS headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Routes
app.use('/', routes);

// DB init
db.initDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => console.log(err));