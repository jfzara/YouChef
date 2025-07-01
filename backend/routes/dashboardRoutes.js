// backend/routes/dashboardRoutes.js

import express from 'express';
import Recette from '../models/recetteModel.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Importez le middleware d'authentification

const router = express.Router();

// Route pour obtenir les statistiques du tableau de bord de l'utilisateur connecté
// Cette route est protégée par authMiddleware.
router.get('/stats', authMiddleware, async (req, res) => {
    // DEBUG: Log pour confirmer que la route est appelée
    console.log("DEBUG Backend Dashboard: Route /api/dashboard/stats appelée.");

    try {
        // L'ID de l'utilisateur est accessible via req.user.id grâce à authMiddleware
        const userId = req.user.id;

        // DEBUG: Log pour vérifier l'ID de l'utilisateur
        console.log(`DEBUG Backend Dashboard: Tentative de récupération des stats pour l'utilisateur ID: ${userId}`);

        if (!userId) {
            // Cette condition est une sécurité, authMiddleware devrait déjà empêcher ceci.
            console.warn("DEBUG Backend Dashboard: userId non trouvé dans req.user. (Problème avec l'authentification)");
            return res.status(400).json({ message: "ID utilisateur manquant pour les statistiques. Veuillez vous reconnecter." });
        }

        // Compte les recettes APPARTENANT spécifiquement à cet utilisateur
        const totalRecipes = await Recette.countDocuments({ owner: userId });

        // Compte les catégories uniques des recettes de cet utilisateur
        const totalCategories = (await Recette.distinct('categorie', { owner: userId })).length;

        // Compte les sous-catégories uniques des recettes de cet utilisateur
        const totalSousCategories = (await Recette.distinct('sousCategorie', { owner: userId })).length;

        // DEBUG: Log les stats trouvées
        console.log(`DEBUG Backend Dashboard: Stats trouvées pour l'utilisateur ${userId} - Recettes: ${totalRecipes}, Catégories: ${totalCategories}, Sous-catégories: ${totalSousCategories}`);

        res.json({
            totalRecipes,
            totalCategories,
            totalSousCategories
        });
    } catch (error) {
        console.error("DEBUG Backend Dashboard ERROR: Erreur lors de la récupération des statistiques du tableau de bord:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des statistiques du tableau de bord", error: error.message });
    }
});

// Route pour obtenir les recettes récentes (sans filtre utilisateur ici, comme c'était le cas initialement)
router.get('/recent-recipes', async (req, res) => {
    try {
        const recentRecipes = await Recette.find({})
                                         .sort({ createdAt: -1 })
                                         .limit(5);

        res.json(recentRecipes);
    } catch (error) {
        console.error("Erreur lors de la récupération des recettes récentes:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des recettes récentes", error: error.message });
    }
});

export default router;