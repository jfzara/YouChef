import axios from 'axios';

// Configuration de l'instance axios avec gestion d'erreurs améliorée
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