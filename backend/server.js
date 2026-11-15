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
        'https://youchefjfzara.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
console.log(`SERVER DEBUG: CORS configuré pour les origines: ${corsOptions.origin.join(', ')}`); // Ajouté
app.use(express.json());

app.get('/', (req, res) => {
    console.log("SERVER DEBUG: Route '/' appelée."); // Ajouté
    res.json({ message: 'Backend Recettes API est running!' });
});

// Routes API
app.use('/api/users', userRoutes);
app.use('/api/recettes', recetteRoutes);
app.use('/api/dashboard', dashboardRoutes);
console.log("SERVER DEBUG: Routes /api/users, /api/recettes, /api/dashboard configurées."); // Ajouté

// Connexion à MongoDB...
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
    useNewUrlParser: true, // Note: ces options sont dépréciées en Mongoose 6+, mais pas grave pour l'instant
    useUnifiedTopology: true,
})
.then(() => {
    console.log('SERVER DEBUG: ✅ MongoDB connecté avec succès.');
    
    // ON DÉMARRE LE SERVEUR UNIQUEMENT APRÈS LE SUCCÈS DE LA CONNEXION
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`SERVER DEBUG: 🚀 Serveur lancé sur port ${PORT}. Prêt à recevoir des requêtes.`);
        console.log(`SERVER DEBUG: 🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
    });
})
.catch(err => {
    console.error('SERVER DEBUG: ❌ Erreur critique de connexion MongoDB. Le serveur ne démarrera pas.', err);
});