// backend/routes/recetteRoutes.js
import express from 'express';
import Recette from '../models/recetteModel.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import cloudinary from '../config/cloudinaryConfig.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// --- LIRE TOUTES LES RECETTES (avec débogage amélioré) ---
router.get('/all', async (req, res) => {
    console.log("BACKEND DEBUG: Route /api/recettes/all appelée."); // Debug 1
    console.log("BACKEND DEBUG: Headers de la requête entrante:", JSON.stringify(req.headers, null, 2)); // Ajouté

    try {
        const recettes = await Recette.find().sort({ createdAt: -1 }).populate('owner', 'identifiant');

        console.log(`BACKEND DEBUG: ${recettes.length} recettes trouvées dans la BDD.`); // Ajouté
        // Laisser ce log commenté si c'est trop verbeux, il existe déjà
        // console.log("DEBUG BACKEND: Recettes récupérées du DB (après populate):", JSON.stringify(recettes.map(r => ({
        //     id: r._id,
        //     nom: r.nom,
        //     owner: r.owner ? { id: r.owner._id, identifiant: r.owner.identifiant } : 'No Owner Data',
        // })), null, 2));

        res.json(recettes);
        console.log("BACKEND DEBUG: Réponse (JSON des recettes) envoyée au frontend pour /api/recettes/all."); // Ajouté
    } catch (error) {
        console.error('BACKEND DEBUG ERROR: Erreur lors de la récupération de toutes les recettes publiques:', error.message); // Ajouté et amélioré
        console.error('BACKEND DEBUG ERROR: Stack trace:', error.stack); // Ajouté
        res.status(500).json({ message: error.message || 'Erreur interne du serveur.' });
    }
});

// --- LIRE LES RECETTES DE L'UTILISATEUR CONNECTÉ (avec débogage amélioré) ---
router.get('/', authMiddleware, async (req, res) => {
    console.log("BACKEND DEBUG: Route /api/recettes/ (recettes utilisateur) appelée. Utilisateur:", req.user?.id); // Debug 4
    console.log("BACKEND DEBUG: Headers de la requête entrante:", JSON.stringify(req.headers, null, 2)); // Ajouté
    try {
        const recettes = await Recette.find({ owner: req.user.id })
                                    .sort({ createdAt: -1 })
                                    .populate('owner', 'identifiant'); // MODIFICATION ICI

        console.log(`BACKEND DEBUG: ${recettes.length} recettes trouvées pour l'utilisateur ${req.user.id}.`); // Ajouté
        // console.log(`DEBUG BACKEND: ${recettes.length} recettes trouvées pour l'utilisateur ${req.user.id}:`, JSON.stringify(recettes.map(r => ({
        //     id: r._id,
        //     nom: r.nom,
        //     owner: r.owner ? { id: r.owner._id, identifiant: r.owner.identifiant } : 'No Owner Data', // Debug 5
        // })), null, 2));

        res.json(recettes);
        console.log("BACKEND DEBUG: Réponse (JSON des recettes utilisateur) envoyée."); // Ajouté
    } catch (error) {
        console.error('BACKEND DEBUG ERROR: Erreur lors de la récupération des recettes de l\'utilisateur:', error.message); // Debug 6
        console.error('BACKEND DEBUG ERROR: Stack trace:', error.stack); // Ajouté
        res.status(500).json({ message: error.message || 'Erreur interne du serveur.' });
    }
});

// Le reste de votre code (POST, PUT, DELETE) reste inchangé, mais ajoutons des logs pour les erreurs
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    console.log("BACKEND DEBUG: Route POST /api/recettes/ appelée. Création de recette."); // Ajouté
    const { nom, description, categorie, sousCategorie } = req.body;
    const owner = req.user.id;

    let imageUrl = '';
    let cloudinaryPublicId = '';

    if (req.file) {
        try {
            console.log("BACKEND DEBUG: Tentative d'upload d'image vers Cloudinary."); // Ajouté
            const result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
                {
                    folder: 'recettes_app',
                    width: 600, height: 600, crop: "limit",
                    quality: "auto:eco", fetch_format: "auto"
                }
            );
            imageUrl = result.secure_url;
            cloudinaryPublicId = result.public_id;
            console.log("BACKEND DEBUG: Image uploadée sur Cloudinary. URL:", imageUrl); // Ajouté
        } catch (cloudinaryError) {
            console.error("BACKEND DEBUG ERROR: Erreur lors de l'upload de l'image sur Cloudinary :", cloudinaryError.message);
            console.error("BACKEND DEBUG ERROR: Stack trace Cloudinary:", cloudinaryError.stack);
            return res.status(500).json({ message: "Échec de l'upload de l'image sur Cloudinary." });
        }
    }

    try {
        const nouvelleRecette = new Recette({
            nom, description, categorie, sousCategorie, imageUrl, cloudinaryPublicId, owner
        });
        await nouvelleRecette.save();
        console.log("BACKEND DEBUG: Nouvelle recette enregistrée en BDD:", nouvelleRecette._id); // Ajouté
        res.status(201).json(nouvelleRecette);
    } catch (error) {
        console.error('BACKEND DEBUG ERROR: Erreur lors de l\'ajout de la recette:', error.message);
        console.error('BACKEND DEBUG ERROR: Stack trace:', error.stack);
        res.status(400).json({ message: error.message || 'Erreur lors de l\'ajout de la recette.' });
    }
});

router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
    console.log(`BACKEND DEBUG: Route PUT /api/recettes/${req.params.id} appelée. Modification de recette.`); // Ajouté
    try {
        const { nom, description, categorie, sousCategorie } = req.body;
        const recetteId = req.params.id;
        let recette;

        if (req.user.role === 'admin') {
            console.log("BACKEND DEBUG: Utilisateur admin, recherche de la recette par ID."); // Ajouté
            recette = await Recette.findById(recetteId);
        } else {
            console.log("BACKEND DEBUG: Utilisateur non-admin, recherche de la recette par ID et owner."); // Ajouté
            recette = await Recette.findOne({ _id: recetteId, owner: req.user.id });
        }

        if (!recette) {
            console.warn("BACKEND DEBUG WARN: Tentative de modification d'une recette non trouvée ou non autorisée."); // Ajouté
            return res.status(404).json({ message: "Recette non trouvée ou vous n'êtes pas autorisé à la modifier" });
        }

        recette.nom = nom !== undefined ? nom : recette.nom;
        recette.description = description !== undefined ? description : recette.description;
        recette.categorie = categorie !== undefined ? categorie : recette.categorie;
        recette.sousCategorie = sousCategorie !== undefined ? sousCategorie : recette.sousCategorie;

        if (req.file) {
            try {
                console.log("BACKEND DEBUG: Nouvelle image reçue pour la modification."); // Ajouté
                if (recette.cloudinaryPublicId) {
                    console.log("BACKEND DEBUG: Suppression de l'ancienne image Cloudinary:", recette.cloudinaryPublicId); // Ajouté
                    await cloudinary.uploader.destroy(recette.cloudinaryPublicId);
                }
                const result = await cloudinary.uploader.upload(
                    `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
                    { folder: 'recettes_app', width: 600, height: 600, crop: "limit", quality: "auto:eco", fetch_format: "auto" }
                );
                recette.imageUrl = result.secure_url;
                recette.cloudinaryPublicId = result.public_id;
                console.log("BACKEND DEBUG: Nouvelle image uploadée et mise à jour."); // Ajouté
            } catch (cloudinaryError) {
                console.error("BACKEND DEBUG ERROR: Erreur lors de la gestion de l'image sur Cloudinary lors de la modification :", cloudinaryError.message);
                console.error("BACKEND DEBUG ERROR: Stack trace Cloudinary:", cloudinaryError.stack);
                return res.status(500).json({ message: "Échec de la mise à jour de l'image." });
            }
        } else if (req.body.imageUrl === '') {
            console.log("BACKEND DEBUG: Demande de suppression de l'image de la recette."); // Ajouté
            if (recette.cloudinaryPublicId) {
                try { 
                    await cloudinary.uploader.destroy(recette.cloudinaryPublicId); 
                    console.log("BACKEND DEBUG: Ancienne image Cloudinary supprimée."); // Ajouté
                } catch (cloudinaryError) { 
                    console.warn("BACKEND DEBUG WARN: Impossible de supprimer l'ancienne image de Cloudinary lors de la suppression manuelle :", cloudinaryError.message); 
                }
            }
            recette.imageUrl = '';
            recette.cloudinaryPublicId = '';
        }

        const recetteMiseAJour = await recette.save();
        console.log("BACKEND DEBUG: Recette mise à jour et enregistrée:", recetteMiseAJour._id); // Ajouté
        res.json(recetteMiseAJour);

    } catch (error) {
        console.error('BACKEND DEBUG ERROR: Erreur lors de la modification de la recette:', error.message);
        console.error('BACKEND DEBUG ERROR: Stack trace:', error.stack);
        res.status(400).json({ message: error.message || 'Erreur lors de la modification de la recette.' });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    console.log(`BACKEND DEBUG: Route DELETE /api/recettes/${req.params.id} appelée. Suppression de recette.`); // Ajouté
    try {
        const recetteId = req.params.id;
        let recette;

        if (req.user.role === 'admin') {
            console.log("BACKEND DEBUG: Utilisateur admin, recherche de la recette à supprimer par ID."); // Ajouté
            recette = await Recette.findById(recetteId);
        } else {
            console.log("BACKEND DEBUG: Utilisateur non-admin, recherche de la recette à supprimer par ID et owner."); // Ajouté
            recette = await Recette.findOne({ _id: recetteId, owner: req.user.id });
        }

        if (!recette) {
            console.warn("BACKEND DEBUG WARN: Tentative de suppression d'une recette non trouvée ou non autorisée."); // Ajouté
            return res.status(404).json({ message: "Recette non trouvée ou vous n'êtes pas autorisé à la supprimer" });
        }

        if (recette.cloudinaryPublicId) {
            try {
                console.log("BACKEND DEBUG: Suppression de l'image Cloudinary associée:", recette.cloudinaryPublicId); // Ajouté
                await cloudinary.uploader.destroy(recette.cloudinaryPublicId);
            } catch (cloudinaryError) {
                console.warn("BACKEND DEBUG WARN: Impossible de supprimer l'image de Cloudinary:", cloudinaryError.message);
            }
        }

        await recette.deleteOne();
        console.log("BACKEND DEBUG: Recette supprimée avec succès:", recetteId); // Ajouté
        res.status(204).send();
    } catch (error) {
        console.error('BACKEND DEBUG ERROR: Erreur lors de la suppression de la recette:', error.message);
        console.error('BACKEND DEBUG ERROR: Stack trace:', error.stack);
        res.status(500).json({ message: error.message || 'Erreur lors de la suppression de la recette.' });
    }
});

export default router;