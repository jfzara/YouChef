

import axios from 'axios';

// Configuration de l'instance axios avec gestion d'erreurs améliorée.
const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD
        ? 'https://youchef-pefh.onrender.com/api'
        : 'http://localhost:5000/api',
    timeout: 30000, // 30 secondes
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
        // Débogage pour voir l'erreur avant toute action
        console.error('DEBUG axiosInstance: Erreur interceptée:', error.response || error);

        // Gestion spécifique des erreurs réseau
        if (error.code === 'ERR_NETWORK') {
            console.error('❌ Erreur réseau: Vérifiez que le serveur backend est accessible');
            // Message convivial pour le démarrage à froid
            error.message = 'On dirait que le serveur se réveille tranquillement. Veuillez patienter un petit instant, ça arrive !';
        }

        // Gestion du timeout (Render peut être plus lent)
        if (error.code === 'ECONNABORTED') {
            console.error('⏱️ Timeout: Le serveur met du temps à répondre');
            // Message convivial pour le timeout
            error.message = 'Le serveur est un peu timide ou très occupé. On réessaye dans un instant !';
        }

        // --- DÉBUT DE LA MODIFICATION IMPORTANTE POUR LE 401 ---
        const isLoginAttempt = error.config.url.includes('/users/login'); // Vérifie si l'URL de la requête était '/users/login'

        // Si l'erreur est 401 (Unauthorized) ET que ce n'est PAS une tentative de connexion échouée
        // OU si un token était déjà présent dans le localStorage (indiquant une déconnexion d'une session active)
        if (error.response?.status === 401 && (!isLoginAttempt || localStorage.getItem('token'))) {
            console.log('DEBUG axiosInstance: Déconnexion automatique déclenchée suite à un 401 sur une route protégée.');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Redirige uniquement si l'utilisateur n'est pas déjà sur la page de connexion
            // pour éviter les rechargements inutiles ou les boucles
            if (window.location.pathname !== '/connexion') {
                window.location.href = '/connexion';
            }
        }
        // --- FIN DE LA MODIFICATION IMPORTANTE POUR LE 401 ---

        return Promise.reject(error);
    }
);

export default axiosInstance;