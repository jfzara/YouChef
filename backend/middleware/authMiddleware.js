import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Le token est attendu dans le header Authorization : "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou mal formaté' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Remplace 'TA_CLE_SECRETE' par ta vraie clé secrète (doit être en .env)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'TA_CLE_SECRETE');
    
    // Tu peux attacher les infos du token à la requête
    req.user = decoded; // généralement { userId, email, ... }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

export default authMiddleware;