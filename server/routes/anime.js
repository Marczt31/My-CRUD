import express from 'express';
const router = express.Router();
import db from '../db.js';

// Obtener todos los animes
router.get('/', (req, res) => {
  db.all('SELECT * FROM anime', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ animes: rows });
  });
});

// Crear un nuevo anime
router.post('/', (req, res) => {
  const { nombre, temporada, episodio } = req.body;
  db.run('INSERT INTO anime (nombre, temporada, episodio) VALUES (?, ?, ?)', [nombre, temporada, episodio], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, nombre, temporada, episodio });
  });
});

// Actualizar un anime
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, temporada, episodio } = req.body;
  db.run('UPDATE anime SET nombre = ?, temporada = ?, episodio = ? WHERE id = ?', [nombre, temporada, episodio, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id, nombre, temporada, episodio });
  });
});

// Eliminar un anime
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM anime WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Anime eliminado' });
  });
});

export default router;
