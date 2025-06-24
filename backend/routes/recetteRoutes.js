// backend/routes/recetteRoutes.js
import express from 'express';
import Recette from '../models/recetteModel.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// --- NOUVELLE ROUTE : LIRE TOUTES LES RECETTES (sans protection, pour la page "Recettes") ---
// Cet endpoint sera utilisé par votre composant Recettes.jsx ou équivalent
router.get('/all', async (req, res) => {
  try {
    const recettes = await Recette.find().sort({ createdAt: -1 }); // Récupère toutes les recettes
    res.json(recettes);
  } catch (error) {
    console.error('Erreur lors de la récupération de toutes les recettes publiques:', error);
    res.status(500).json({ message: error.message });
  }
});

// --- ROUTE EXISTANTE : LIRE LES RECETTES DE L'UTILISATEUR CONNECTÉ (pour le Dashboard) ---
// Cette route est parfaite pour UserRecipeList.jsx. Elle utilise req.user.id du token.
router.get('/', authMiddleware, async (req, res) => {
  try {
    // req.user.id est ajouté par authMiddleware après la vérification du token JWT
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
  const owner = req.user.id; // L'ID de l'utilisateur authentifié (vient de req.user après authMiddleware)

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

// Route pour MODIFIER une recette (protégée et avec vérification de l'owner)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    // Trouve et met à jour la recette seulement si l'ID correspond ET si l'utilisateur est le propriétaire
    const recette = await Recette.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id }, // Critères de recherche
      req.body, // Données à mettre à jour
      { new: true } // Retourne la version mise à jour du document
    );
    if (!recette) {
      // Si la recette n'est pas trouvée OU que l'utilisateur n'est pas le propriétaire
      return res.status(404).json({ message: "Recette non trouvée ou vous n'êtes pas autorisé à la modifier" });
    }
    res.json(recette);
  } catch (error) {
    console.error('Erreur lors de la modification de la recette:', error);
    res.status(400).json({ message: error.message });
  }
});

// Route pour SUPPRIMER une recette (protégée et avec vérification de l'owner)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Trouve et supprime la recette seulement si l'ID correspond ET si l'utilisateur est le propriétaire
    const recette = await Recette.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!recette) {
      // Si la recette n'est pas trouvée OU que l'utilisateur n'est pas le propriétaire
      return res.status(404).json({ message: "Recette non trouvée ou vous n'êtes pas autorisé à la supprimer" });
    }
    res.status(204).send(); // 204 No Content pour une suppression réussie sans corps de réponse
  } catch (error) {
    console.error('Erreur lors de la suppression de la recette:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;