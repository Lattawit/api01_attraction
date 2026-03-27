const express = require('express');
const router = express.Router();
const db = require('../db');

//
// GET ALL
//
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM attractions');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// GET BY ID
//
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM attractions WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// POST
//
router.post('/', async (req, res) => {
  try {
    const { name, detail, coverimage, latitude, longitude, likes } = req.body;

    const [result] = await db.query(
      `INSERT INTO attractions 
      (name, detail, coverimage, latitude, longitude, likes) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, detail, coverimage, latitude, longitude, likes || 0]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Created successfully',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// PUT
//
router.put('/:id', async (req, res) => {
  try {
    const { name, detail, coverimage, latitude, longitude, likes } = req.body;

    const [result] = await db.query(
      `UPDATE attractions 
       SET name=?, detail=?, coverimage=?, latitude=?, longitude=?, likes=? 
       WHERE id=?`,
      [name, detail, coverimage, latitude, longitude, likes, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// DELETE
//
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM attractions WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;