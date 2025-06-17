import dotenv from 'dotenv';
dotenv.config(); // 👈 charger .env en premier

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import recetteRoutes from './routes/recetteRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Configuration CORS pour production
const corsOptions = {
  origin: [
    'http://localhost:5173', // Développement local
    'https://recettesreact.vercel.app', // Ton URL Vercel (à ajuster si différente)
    'https://recettesreact-git-main-jfzaras-projects.vercel.app', // URL Vercel alternative
    'https://recettesreact-jfzaras-projects.vercel.app' // URL Vercel alternative
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Route de test pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.json({ message: 'Backend Recettes API is running!' });
});

// Routes API
app.use('/api/recettes', recetteRoutes);
app.use('/api/users', userRoutes);

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connecté avec succès');
  return mongoose.connection.db.listCollections().toArray();
})
.then(collections => {
  console.log('Collections dans la base :', collections.map(c => c.name));
})
.catch(err => {
  console.error('❌ Erreur de connexion MongoDB :', err);
});

// Configuration du port pour Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur lancé sur port ${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
});