import express from 'express';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Route d'inscription (register)
router.post('/register', async (req, res) => {

  console.log('Requête /register reçue avec body:', req.body);
  const { identifiant, email, motDePasse } = req.body;
 

  try {
    // Vérifier si l'identifiant est déjà utilisé
    const identifiantExist = await User.findOne({ identifiant });
    if (identifiantExist) {
      return res.status(400).json({ message: 'Identifiant déjà utilisé' });
    }

    // Vérifier si l'email est déjà utilisé
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Créer un nouvel utilisateur
    // Important : on mappe motDePasse reçu en password attendu par le modèle Mongoose
    const newUser = new User({ identifiant, email, password: motDePasse });

    // Sauvegarder l'utilisateur (le middleware 'pre' va hasher le password automatiquement)
    await newUser.save();

    // Répondre succès
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    // En cas d'erreur, log et réponse 500
    console.error('Erreur lors de l\'inscription:', err);
    res.status(500).json({ message: err.message });
  }
});

// Route de connexion (login)
router.post('/login', async (req, res) => {
  const { email, motDePasse } = req.body; // Le frontend envoie motDePasse

  try {
    // Trouver l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier que le mot de passe correspond (compare avec le hash)
    const isMatch = await user.comparePassword(motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générer un token JWT avec infos utiles
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    // Répondre avec le token et infos utilisateur (incluant identifiant)
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        identifiant: user.identifiant, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;