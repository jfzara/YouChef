// backend/models/recetteModel.js
import mongoose from 'mongoose';

const recetteSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  categorie: { type: String, trim: true },
  sousCategorie: { type: String, trim: true },
  imageUrl: { type: String, default: '' }, // Champ pour l'URL de l'image (facultatif)
  owner: { // Lien vers l'utilisateur qui a créé la recette
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Fait référence au modèle 'User'
    required: true // Une recette doit avoir un propriétaire
  },
}, {
  timestamps: true // Ajoute automatiquement les champs 'createdAt' et 'updatedAt'
});

const Recette = mongoose.model('Recette', recetteSchema);

export default Recette;