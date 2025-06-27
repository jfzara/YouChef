// backend/middleware/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
  // authMiddleware doit avoir été exécuté avant ce middleware pour que req.user soit disponible.
  if (!req.user) {
    return res.status(401).json({ message: 'Accès non autorisé: Utilisateur non authentifié.' });
  }

  // Vérifie si le rôle de l'utilisateur est 'admin'
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès interdit: Nécessite un rôle administrateur.' });
  }

  next(); // L'utilisateur est un admin, passer à la fonction suivante
};

export default adminMiddleware;