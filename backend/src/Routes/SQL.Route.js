const express = require('express');
const DBSQL = require('../DB/mysqlDB.js'); // Import MySQL connection
const router = express.Router();

router.use(express.json());

// Fetch all users
router.get('/users', (req, res) => {
    DBSQL.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Fetch entities created by a specific user
router.get('/entities/:userId', (req, res) => {
    const { userId } = req.params;
    DBSQL.query('SELECT * FROM entities WHERE created_by = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new user
router.post('/users', (req, res) => {
    const { name, age, email } = req.body;
    if (!name || !age || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.query('INSERT INTO users (name, age, email) VALUES (?, ?, ?)', [name, age, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User added', userId: result.insertId });
    });
});

// Create a new entity
router.post('/entities', (req, res) => {
    const { name, description, created_by } = req.body;
    if (!name || !description || !created_by) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.query('INSERT INTO entities (name, description, created_by) VALUES (?, ?, ?)',
        [name, description, created_by], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Entity added', entityId: result.insertId });
        });
});

module.exports = router;
