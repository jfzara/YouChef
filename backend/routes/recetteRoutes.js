// backend/routes/recetteRoutes.js
import express from 'express';
import Recette from '../models/recetteModel.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js'; // Importez le middleware admin

const router = express.Router();

// --- LIRE TOUTES LES RECETTES (sans protection, pour la page "Recettes" publique) ---
router.get('/all', async (req, res) => {
  try {
    const recettes = await Recette.find().sort({ createdAt: -1 });
    res.json(recettes);
  } catch (error) {
    console.error('Erreur lors de la récupération de toutes les recettes publiques:', error);
    res.status(500).json({ message: error.message });
  }
});

// --- LIRE LES RECETTES DE L'UTILISATEUR CONNECTÉ (pour le Dashboard personnel) ---
router.get('/', authMiddleware, async (req, res) => {
  try {
    const recettes = await Recette.find({ owner: req.user.id }).sort({ createdAt: -1 });
    console.log(`Backend: ${recettes.length} recettes trouvées pour l'utilisateur ${req.user.id}`);
    res.json(recettes);
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes de l\'utilisateur:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route pour AJOUTER une recette (protégée)
router.post('/', authMiddleware, async (req, res) => {
  const { nom, description, categorie, sousCategorie, imageUrl } = req.body;
  const owner = req.user.id; // L'ID de l'utilisateur authentifié

  try {
    const nouvelleRecette = new Recette({
      nom,
      description,
      categorie,
      sousCategorie,
      imageUrl,
      owner
    });
    await nouvelleRecette.save();
    res.status(201).json(nouvelleRecette);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la recette:', error);
    res.status(400).json({ message: error.message });
  }
});

// Route pour MODIFIER une recette (protégée)
// Un admin peut modifier N'IMPORTE QUELLE recette, un utilisateur ne peut modifier que LES SIENNES.
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    let recette;
    // Si l'utilisateur est un admin, il peut modifier n'importe quelle recette par son ID
    if (req.user.role === 'admin') {
      recette = await Recette.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } else {
      // Sinon, un utilisateur normal ne peut modifier que ses propres recettes
      recette = await Recette.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.id },
        req.body,
        { new: true }
      );
    }

    if (!recette) {
      return res.status(404).json({ message: "Recette non trouvée ou vous n'êtes pas autorisé à la modifier" });
    }
    res.json(recette);
  } catch (error) {
    console.error('Erreur lors de la modification de la recette:', error);
    res.status(400).json({ message: error.message });
  }
});

// Route pour SUPPRIMER une recette (protégée)
// Un admin peut supprimer N'IMPORTE QUELLE recette, un utilisateur ne peut supprimer que LES SIENNES.
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let recette;
    // Si l'utilisateur est un admin, il peut supprimer n'importe quelle recette par son ID
    if (req.user.role === 'admin') {
      recette = await Recette.findByIdAndDelete(req.params.id);
    } else {
      // Sinon, un utilisateur normal ne peut supprimer que ses propres recettes
      recette = await Recette.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    }

    if (!recette) {
      return res.status(404).json({ message: "Recette non trouvée ou vous n'êtes pas autorisé à la supprimer" });
    }
    res.status(204).send(); // 204 No Content pour une suppression réussie sans corps de réponse
  } catch (error) {
    console.error('Erreur lors de la suppression de la recette:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;