import express from 'express';
import cors from 'cors';
import animeRoutes from './routes/anime.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/anime', animeRoutes);

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
