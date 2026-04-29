const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Railway dynamic port support
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//root route
app.get('/', (req, res) => {
    res.send('CRUD API is running successfully');
});


//create api
app.post('/users', async (req, res) => {
    try {
        const { f_name, l_name, phone_no, address } = req.body;

        const newUser = await pool.query(
            'INSERT INTO userInfo (f_name, l_name, phone_no, address) VALUES ($1, $2, $3, $4) RETURNING *',
            [f_name, l_name, phone_no, address]
        );

        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//all user api
app.get('/users', async (req, res) => {
    try {
        const allUsers = await pool.query(`
            SELECT 
                user_id,
                f_name,
                l_name,
                f_name || ' ' || l_name AS full_name,
                phone_no,
                address
            FROM userInfo
        `);

        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//get user by id API
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await pool.query(
            `SELECT 
                user_id,
                f_name,
                l_name,
                f_name || ' ' || l_name AS full_name,
                phone_no,
                address
             FROM userInfo
             WHERE user_id = $1`,
            [id]
        );

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//update api
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { f_name, l_name, phone_no, address } = req.body;

        await pool.query(
            'UPDATE userInfo SET f_name=$1, l_name=$2, phone_no=$3, address=$4 WHERE user_id=$5',
            [f_name, l_name, phone_no, address, id]
        );

        res.json('User updated successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//delete api
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            'DELETE FROM userInfo WHERE user_id = $1',
            [id]
        );

        res.json('User deleted successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// server start

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});