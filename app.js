const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('CRUD API is running successfully');
});

app.use('/users', userRoutes);

module.exports = app;