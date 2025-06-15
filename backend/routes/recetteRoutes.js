// routes/recetteRoutes.js
import express from 'express';
import Recette from '../models/recetteModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const recettes = await Recette.find();
  res.json(recettes);
});

router.post('/', async (req, res) => {
  const { nom, description, categorie, sousCategorie } = req.body;
  const nouvelleRecette = new Recette({ nom, description, categorie, sousCategorie });
  await nouvelleRecette.save();
  res.status(201).json(nouvelleRecette);
});

router.put('/:id', async (req, res) => {
  const recette = await Recette.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(recette);
});

router.delete('/:id', async (req, res) => {
  await Recette.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;