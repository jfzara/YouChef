// backend/models/recetteModel.js (MODIFIÉ)
import mongoose from 'mongoose';

const recetteSchema = new mongoose.Schema({
    nom: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    categorie: {
        type: String,
        required: true,
        trim: true,
        enum: [
            'Plats Principaux', 'Entrées & Apéritifs', 'Desserts', 'Boissons',
            'Accompagnements', 'Petit-déjeuner & Brunch', 'Boulangerie & Pâtisserie',
            'Snacks & Encas', 'Autres'
        ],
        message: '{VALUE} n\'est pas une catégorie de recette valide.'
    },
    sousCategorie: { type: String, trim: true },
    imageUrl: { type: String, default: '' },
    // --- NOUVEAU CHAMP POUR L'ID PUBLIC DE CLOUDINARY ---
    cloudinaryPublicId: { type: String, default: '' }, // Ajoutez cette ligne
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

const Recette = mongoose.model('Recette', recetteSchema);

export default Recette;