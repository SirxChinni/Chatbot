const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'chinni',
    database: 'chatbot_db'
  });

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// API endpoint to get messages
app.get('/api/messages', (req, res) => {
    const query = 'SELECT * FROM messages ORDER BY timestamp ASC';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json(results);
      }
    });
  });

    app.post('/api/query', (req, res) => {
        const { query } = req.body;
        const searchQuery = `%${query}%`;
        const sql = 'SELECT answer FROM qa_pairs WHERE question LIKE ?';
        db.query(sql, [searchQuery], (err, results) => {
            if (err) {
            res.status(500).json({ error: 'Database error' });
            } else {
            res.json(results);
            }
        });
    });

// API endpoint to send a message
app.post('/api/messages', (req, res) => {
    const { sender, message } = req.body;
    const query = 'INSERT INTO messages (sender, message) VALUES (?, ?)';
    db.query(query, [sender, message], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Message sent' });
      }
    });
  });

// API to clear all messages
app.delete('/api/messages', (req, res) => {
    const query = 'DELETE FROM messages'; // Delete all messages from the database
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json({ message: 'Chat cleared successfully' });
    });
  });


// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});