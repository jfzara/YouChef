
import dotenv from 'dotenv';
dotenv.config(); // 👈 à appeler avant d'utiliser process.env


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import recetteRoutes from './routes/recetteRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/recettes', recetteRoutes);
app.use('/api/users', userRoutes);


mongoose.connect('mongodb://localhost:27017/recettesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connecté'))
.catch(console.error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur port ${PORT}`));