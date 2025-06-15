import express from 'express';
import Recette from '../models/recetteModel.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Import du middleware

const router = express.Router();

// Route publique : lire toutes les recettes
router.get('/', async (req, res) => {
  try {
    const recettes = await Recette.find();
    res.json(recettes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route protégée : ajouter une recette (seulement si utilisateur authentifié)
router.post('/', authMiddleware, async (req, res) => {
  const { nom, description, categorie, sousCategorie } = req.body;
  try {
    const nouvelleRecette = new Recette({ nom, description, categorie, sousCategorie });
    await nouvelleRecette.save();
    res.status(201).json(nouvelleRecette);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route protégée : modifier une recette (authentification requise)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const recette = await Recette.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recette) return res.status(404).json({ message: "Recette non trouvée" });
    res.json(recette);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route protégée : supprimer une recette (authentification requise)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const recette = await Recette.findByIdAndDelete(req.params.id);
    if (!recette) return res.status(404).json({ message: "Recette non trouvée" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;