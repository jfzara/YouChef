// models/recetteModel.js
import mongoose from 'mongoose';

const recetteSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: String,
  categorie: String,
  sousCategorie: String,
});

const Recette = mongoose.model('Recette', recetteSchema);

export default Recette;