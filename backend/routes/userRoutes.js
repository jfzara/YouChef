// backend/routes/userRoutes.js
import express from 'express';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/authMiddleware.js'; // Importez
import adminMiddleware from '../middleware/adminMiddleware.js'; // Importez

const router = express.Router();

// Route d'inscription (register) - Pas de rôle admin ici, c'est un user par défaut
router.post('/register', async (req, res) => {
 
  const { identifiant, email, motDePasse } = req.body;

  try {
    const identifiantExist = await User.findOne({ identifiant });
    if (identifiantExist) {
      return res.status(400).json({ message: 'Identifiant déjà utilisé' });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const newUser = new User({ identifiant, email, password: motDePasse });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err);
    res.status(500).json({ message: err.message });
  }
});

// Route de connexion (login) - Renvoie le rôle dans le token et l'objet user.
router.post('/login', async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await user.comparePassword(motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générer un token JWT avec infos utiles (y compris le rôle !)
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // Le rôle est inclus ici
      process.env.JWT_SECRET || 'secretkey', // Utilisez une variable d'environnement forte en production
      { expiresIn: '1h' }
    );

    // Répondre avec le token et infos utilisateur (incluant identifiant et rôle)
    res.json({
      token,
      user: {
        id: user._id,
        identifiant: user.identifiant,
        email: user.email,
        role: user.role // Le rôle est également renvoyé directement pour un accès facile
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- NOUVELLES ROUTES POUR L'ADMINISTRATION DES UTILISATEURS (PROTÉGÉES ADMIN) ---

// GET tous les utilisateurs (réservé aux administrateurs)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Ne renvoie pas les mots de passe
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs (Admin):', error);
    res.status(500).json({ message: error.message });
  }
});

// GET un utilisateur par ID (réservé aux administrateurs)
router.get('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération d\'un utilisateur par ID (Admin):', error);
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour le rôle ou d'autres infos d'un utilisateur (réservé aux administrateurs)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { identifiant, email, role } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mise à jour des champs si fournis
    user.identifiant = identifiant || user.identifiant;
    user.email = email || user.email;

    // Assurez-vous que seul 'user' ou 'admin' peut être défini
    // Un admin ne peut pas changer son propre rôle via cette route pour éviter les blocages
    if (req.user.id === req.params.id && role !== user.role) {
      return res.status(403).json({ message: 'Vous ne pouvez pas changer votre propre rôle via cette interface.' });
    }

    if (role && ['user', 'admin'].includes(role)) {
      user.role = role;
    } else if (role) { // Si un rôle est fourni mais invalide
        return res.status(400).json({ message: 'Rôle invalide fourni. Les rôles autorisés sont "user" ou "admin".' });
    }

    await user.save();
    // Ne renvoie pas le mot de passe
    res.json({ id: user._id, identifiant: user.identifiant, email: user.email, role: user.role });
  } catch (error) {
    console.error('Erreur lors de la mise à jour d\'un utilisateur (Admin):', error);
    res.status(500).json({ message: error.message });
  }
});

// Supprimer un utilisateur (réservé aux administrateurs)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // Empêcher un admin de se supprimer lui-même
    if (req.user.id === req.params.id) {
      return res.status(403).json({ message: 'Vous ne pouvez pas supprimer votre propre compte.' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Erreur lors de la suppression d\'un utilisateur (Admin):', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;