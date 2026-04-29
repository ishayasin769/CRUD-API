const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
require('events').EventEmitter.defaultMaxListeners = 20;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('CRUD API is running successfully');
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});