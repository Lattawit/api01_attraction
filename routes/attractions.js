const express = require('express');
const router = express.Router();
const db = require('../db');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM attractions');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET BY ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM attractions WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Attraction not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post('/', async (req, res) => {
  try {
    const { name, detail, image, location, rating } = req.body;

    const [result] = await db.query(
      'INSERT INTO attractions (name, detail, image, location, rating) VALUES (?, ?, ?, ?, ?)',
      [name, detail, image, location, rating]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      detail,
      image,
      location,
      rating
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  try {
    const { name, detail, image, location, rating } = req.body;

    const [result] = await db.query(
      `UPDATE attractions 
       SET name=?, detail=?, image=?, location=?, rating=? 
       WHERE id=?`,
      [name, detail, image, location, rating, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Attraction not found' });
    }

    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM attractions WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Attraction not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;