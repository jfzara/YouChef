import dotenv from 'dotenv';
dotenv.config(); // 👈 charger .env en premier

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

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connecté avec succès à :', mongoUri);

  // Si tu veux, tu peux faire un test ici (ex: lister les collections)
  return mongoose.connection.db.listCollections().toArray();
})
.then(collections => {
  console.log('Collections dans la base :', collections.map(c => c.name));
})
.catch(err => {
  console.error('Erreur de connexion MongoDB :', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur port ${PORT}`));