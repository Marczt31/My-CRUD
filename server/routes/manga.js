import express from 'express';
const router = express.Router();
import db from '../db.js';

// Obtener todos los mangas
router.get('/', (req, res) => {
  db.all('SELECT * FROM manga', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ manga: rows });
  });
});

// Crear un nuevo manga
router.post('/', (req, res) => {
  const { nombre, capitulo, web } = req.body;
  db.run('INSERT INTO manga (nombre, capitulo, web) VALUES (?, ?, ?)', [nombre, capitulo, web], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, nombre, capitulo, web });
  });
});

// Actualizar un manga
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, capitulo, web } = req.body;
  db.run('UPDATE manga SET nombre = ?, capitulo = ?, web = ? WHERE id = ?', [nombre, capitulo, web, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id, nombre, capitulo, web });
  });
});

// Eliminar un manga
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM manga WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Manga eliminado' });
  });
});

export default router;