// backend/routes/recetteRoutes.js
import express from 'express';
import Recette from '../models/recetteModel.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Import du middleware d'authentification

const router = express.Router();

// Route pour LIRE TOUTES LES RECETTES (protégée et filtrée par utilisateur)
// Seules les recettes de l'utilisateur connecté sont retournées
router.get('/', authMiddleware, async (req, res) => {
  try {
    // req.user.id est ajouté par authMiddleware après la vérification du token
    const recettes = await Recette.find({ owner: req.user.id });
    res.json(recettes);
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route pour AJOUTER une recette (protégée)
router.post('/', authMiddleware, async (req, res) => {
  const { nom, description, categorie, sousCategorie, imageUrl } = req.body;

  // req.user.id est l'ID de l'utilisateur authentifié, défini par authMiddleware
  const owner = req.user.id;

  try {
    const nouvelleRecette = new Recette({
      nom,
      description,
      categorie,
      sousCategorie,
      imageUrl, // Inclut le champ imageUrl
      owner // Assigne le propriétaire de la recette
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
    // Trouver la recette et vérifier si l'utilisateur connecté en est le propriétaire
    const recette = await Recette.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id }, // Critères de recherche : ID et propriétaire
      req.body,
      { new: true } // Retourne le document mis à jour
    );

    if (!recette) {
      // Si la recette n'existe pas OU si l'utilisateur n'est pas le propriétaire
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
    // Trouver la recette et vérifier si l'utilisateur connecté en est le propriétaire
    const recette = await Recette.findOneAndDelete({ _id: req.params.id, owner: req.user.id });

    if (!recette) {
      // Si la recette n'existe pas OU si l'utilisateur n'est pas le propriétaire
      return res.status(404).json({ message: "Recette non trouvée ou vous n'êtes pas autorisé à la supprimer" });
    }
    res.status(204).send(); // 204 No Content pour une suppression réussie
  } catch (error) {
    console.error('Erreur lors de la suppression de la recette:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;