import express from 'express';
const router = express.Router();
import db from '../db.js';

// Obtener todos los animes
router.get('/', (req, res) => {
  db.all('SELECT * FROM esperando', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ esperando: rows });
  });
});

// Crear un nuevo anime
router.post('/', (req, res) => {
  const { nombre, temporada } = req.body;
  db.run('INSERT INTO esperando (nombre, temporada) VALUES (?, ?)', [nombre, temporada], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, nombre, temporada });
  });
});

// Actualizar un anime
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, temporada } = req.body;
  db.run('UPDATE esperando SET nombre = ?, temporada = ? WHERE id = ?', [nombre, temporada, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id, nombre, temporada });
  });
});

// Eliminar un anime
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM esperando WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Anime en Esperando eliminado' });
  });
});

export default router;