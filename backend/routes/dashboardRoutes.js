// backend/routes/dashboardRoutes.js

import express from 'express';
import Recette from '../models/recetteModel.js'; // Importez votre modèle de recette

const router = express.Router();

// Route pour obtenir les statistiques du tableau de bord
router.get('/stats', async (req, res) => {
    try {
        const totalRecipes = await Recette.countDocuments(); // Compte toutes les recettes
        const totalCategories = (await Recette.distinct('categorie')).length; // Compte les catégories uniques
        const totalSousCategories = (await Recette.distinct('sousCategorie')).length; // Compte les sous-catégories uniques

        res.json({
            totalRecipes,
            totalCategories,
            totalSousCategories
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des statistiques du tableau de bord:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des statistiques du tableau de bord", error: error.message });
    }
});

// Route pour obtenir les recettes récentes
router.get('/recent-recipes', async (req, res) => {
    try {
        // Récupère les 5 dernières recettes ajoutées, triées par date de création (createdAt)
        const recentRecipes = await Recette.find({})
                                        .sort({ createdAt: -1 }) // Tri décroissant par date de création
                                        .limit(5); // Limite les résultats à 5

        res.json(recentRecipes);
    } catch (error) {
        console.error("Erreur lors de la récupération des recettes récentes:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des recettes récentes", error: error.message });
    }
});

export default router;