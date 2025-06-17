import axios from 'axios';

// Configuration de l'instance axios avec gestion d'erreurs améliorée
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ URL de votre backend
  timeout: 10000, // 10 secondes de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token aux requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestion spécifique des erreurs réseau
    if (error.code === 'ERR_NETWORK') {
      console.error('❌ Erreur réseau: Vérifiez que le serveur backend est démarré sur http://localhost:5000');
      error.message = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.';
    }
    
    // Déconnexion automatique si token expiré
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/connexion';
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;