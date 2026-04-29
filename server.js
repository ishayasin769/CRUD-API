const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');


const app = express();
app.use(express.json());
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


// create user api

app.post('/users',async(req,res)=>{
    try{
        const{
            f_name,
            l_name,
            phone_no,address
        } = req.body;
        const newUser = await pool.query(
           'INSERT INTO userInfo(f_name, l_name, phone_no, address) VALUES ($1, $2, $3, $4) RETURNING * ',
           [f_name,l_name,phone_no,address]
        );
        res.json(newUser.rows[0]);
    }
    catch(err){
        console.error(err.message);
    }

});


// get all user api
app.get('/users',async(req,res)=>{
    try{
        const allUsers = await pool.query(
          `SELECT 
              user_id,
            f_name,
            l_name,
            f_name || ' ' || l_name AS full_name,
            phone_no,
            address
            FROM userInfo `
        );
        res.json(allUsers.rows);
    }
    catch(err){
        console.error(err.message)
    }
});

// get user by id

app.get('/users/:id', async (req, res) => {
    try {
        const{id} = req.params;
        const allUsers = await pool.query(
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
        res.json(allUsers.rows[0]);
    }
    catch (err) {
        console.error(err.message)
    }
});

// UPDATE USER

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { f_name, l_name, phone_no, address } = req.body;
        await pool.query(
            'UPDATE userInfo SET f_name=$1, l_name=$2, phone_no=$3, address=$4 WHERE user_id = $5',
        [f_name, l_name, phone_no, address, id]
        );
        res.json('User updated successfully');
    } catch (err) {
        console.error(err.message);
    }
});

// DELETE USER

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM userInfo WHERE user_id = $1', [id]);
        res.json('User deleted successfully');
    } catch (err) {
        console.error(err.message);
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
