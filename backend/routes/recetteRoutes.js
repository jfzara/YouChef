// backend/routes/recetteRoutes.js
import express from 'express';
import Recette from '../models/recetteModel.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import cloudinary from '../config/cloudinaryConfig.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// --- LIRE TOUTES LES RECETTES (avec débogage) ---
router.get('/all', async (req, res) => {
    console.log("DEBUG BACKEND: Route /api/recettes/all appelée."); // Debug 1

    try {
        // MODIFICATION APPLIQUÉE : Peupler avec 'identifiant'
        const recettes = await Recette.find().sort({ createdAt: -1 }).populate('owner', 'identifiant');

        // Ajustez aussi le console.log pour refléter le champ 'identifiant'
        console.log("DEBUG BACKEND: Recettes récupérées du DB (après populate):", JSON.stringify(recettes.map(r => ({
            id: r._id,
            nom: r.nom, // Le nom de la recette
            owner: r.owner ? { id: r.owner._id, identifiant: r.owner.identifiant } : 'No Owner Data', // Debug 2
            // Ajoutez d'autres champs si vous voulez les voir
        })), null, 2));

        res.json(recettes);
    } catch (error) {
        console.error('DEBUG ERROR: Erreur lors de la récupération de toutes les recettes publiques:', error); // Debug 3
        res.status(500).json({ message: error.message });
    }
});

// --- LIRE LES RECETTES DE L'UTILISATEUR CONNECTÉ (avec débogage) ---
router.get('/', authMiddleware, async (req, res) => {
    console.log("DEBUG BACKEND: Route /api/recettes/ (recettes utilisateur) appelée."); // Debug 4
    try {
        const recettes = await Recette.find({ owner: req.user.id })
                                     .sort({ createdAt: -1 })
                                     .populate('owner', 'identifiant'); // MODIFICATION ICI

        console.log(`DEBUG BACKEND: ${recettes.length} recettes trouvées pour l'utilisateur ${req.user.id}:`, JSON.stringify(recettes.map(r => ({
            id: r._id,
            nom: r.nom,
            owner: r.owner ? { id: r.owner._id, identifiant: r.owner.identifiant } : 'No Owner Data', // Debug 5
        })), null, 2));

        res.json(recettes);
    } catch (error) {
        console.error('DEBUG ERROR: Erreur lors de la récupération des recettes de l\'utilisateur:', error); // Debug 6
        res.status(500).json({ message: error.message });
    }
});

// Le reste de votre code (POST, PUT, DELETE) reste inchangé
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    const { nom, description, categorie, sousCategorie } = req.body;
    const owner = req.user.id;

    let imageUrl = '';
    let cloudinaryPublicId = '';

    if (req.file) {
        try {
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
        } catch (cloudinaryError) {
            console.error("Erreur lors de l'upload de l'image sur Cloudinary :", cloudinaryError);
            return res.status(500).json({ message: "Échec de l'upload de l'image sur Cloudinary." });
        }
    }

    try {
        const nouvelleRecette = new Recette({
            nom, description, categorie, sousCategorie, imageUrl, cloudinaryPublicId, owner
        });
        await nouvelleRecette.save();
        res.status(201).json(nouvelleRecette);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la recette:', error);
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { nom, description, categorie, sousCategorie } = req.body;
        const recetteId = req.params.id;
        let recette;

        if (req.user.role === 'admin') {
            recette = await Recette.findById(recetteId);
        } else {
            recette = await Recette.findOne({ _id: recetteId, owner: req.user.id });
        }

        if (!recette) {
            return res.status(404).json({ message: "Recette non trouvée ou vous n'êtes pas autorisé à la modifier" });
        }

        recette.nom = nom !== undefined ? nom : recette.nom;
        recette.description = description !== undefined ? description : recette.description;
        recette.categorie = categorie !== undefined ? categorie : recette.categorie;
        recette.sousCategorie = sousCategorie !== undefined ? sousCategorie : recette.sousCategorie;

        if (req.file) {
            try {
                if (recette.cloudinaryPublicId) {
                    await cloudinary.uploader.destroy(recette.cloudinaryPublicId);
                }
                const result = await cloudinary.uploader.upload(
                    `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
                    { folder: 'recettes_app', width: 600, height: 600, crop: "limit", quality: "auto:eco", fetch_format: "auto" }
                );
                recette.imageUrl = result.secure_url;
                recette.cloudinaryPublicId = result.public_id;
            } catch (cloudinaryError) {
                console.error("Erreur lors de la gestion de l'image sur Cloudinary lors de la modification :", cloudinaryError);
                return res.status(500).json({ message: "Échec de la mise à jour de l'image." });
            }
        } else if (req.body.imageUrl === '') {
            if (recette.cloudinaryPublicId) {
                try { await cloudinary.uploader.destroy(recette.cloudinaryPublicId); } catch (cloudinaryError) { console.warn("Avertissement: Impossible de supprimer l'ancienne image de Cloudinary lors de la suppression manuelle :", cloudinaryError); }
            }
            recette.imageUrl = '';
            recette.cloudinaryPublicId = '';
        }

        const recetteMiseAJour = await recette.save();
        res.json(recetteMiseAJour);

    } catch (error) {
        console.error('Erreur lors de la modification de la recette:', error);
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const recetteId = req.params.id;
        let recette;

        if (req.user.role === 'admin') {
            recette = await Recette.findById(recetteId);
        } else {
            recette = await Recette.findOne({ _id: recetteId, owner: req.user.id });
        }

        if (!recette) {
            return res.status(404).json({ message: "Recette non trouvée ou vous n'êtes pas autorisé à la supprimer" });
        }

        if (recette.cloudinaryPublicId) {
            try {
                await cloudinary.uploader.destroy(recette.cloudinaryPublicId);
            } catch (cloudinaryError) {
                console.warn("Avertissement: Impossible de supprimer l'image de Cloudinary:", cloudinaryError);
            }
        }

        await recette.deleteOne();
        res.status(204).send();
    } catch (error) {
        console.error('Erreur lors de la suppression de la recette:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;