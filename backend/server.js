import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import recetteRoutes from './routes/recetteRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://recettesreact.vercel.app',
    'https://recettesreact-git-main-jfzaras-projects.vercel.app',
    'https://recettesreact-jfzaras-projects.vercel.app',
    'https://youchefjfzara.vercel.app' // <--- AJOUTEZ CETTE LIGNE ICI
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend Recettes API est running!' });
});

// Routes API
app.use('/api/users', userRoutes);
app.use('/api/recettes', recetteRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Connexion à MongoDB...
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur lancé sur port ${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
});