const pool = require('../db');

// CREATE USER
exports.createUser = async (req, res) => {
    try {
        const { f_name, l_name, phone_no, address } = req.body;

        const result = await pool.query(
            'INSERT INTO userInfo (f_name, l_name, phone_no, address) VALUES ($1,$2,$3,$4) RETURNING *',
            [f_name, l_name, phone_no, address]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM userInfo');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// GET BY ID
exports.getUserById = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM userInfo WHERE user_id=$1',
            [req.params.id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {
        const { f_name, l_name, phone_no, address } = req.body;

        await pool.query(
            'UPDATE userInfo SET f_name=$1, l_name=$2, phone_no=$3, address=$4 WHERE user_id=$5',
            [f_name, l_name, phone_no, address, req.params.id]
        );

        res.json("Updated");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        await pool.query(
            'DELETE FROM userInfo WHERE user_id=$1',
            [req.params.id]
        );

        res.json("Deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
};