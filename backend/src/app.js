import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mascotasRoutes from './routes/mascotasRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/mascotas', mascotasRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de mascotas funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});