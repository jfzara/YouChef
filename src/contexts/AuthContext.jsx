

// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // N'oubliez pas d'installer cette dépendance : npm install jwt-decode

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  // Initialise l'utilisateur à partir du localStorage au démarrage
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur depuis localStorage:", error);
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    // Récupérer les données utilisateur stockées
    const storedUserData = localStorage.getItem('user');

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        if (decoded.exp * 1000 < Date.now()) {
          console.log('Token expiré, déconnexion automatique.');
          logout();
        } else {
          // Si le token est valide, et si nous avons des données utilisateur complètes dans localStorage, utilisez-les.
          // Sinon, fallback sur les données du token (moins complètes si 'identifiant' n'est pas dedans).
          if (storedUserData) {
            setUser(JSON.parse(storedUserData)); // Priorise les données complètes du localStorage
          } else {
            // Fallback : Si user n'était pas dans localStorage (ancien cas), utilisez decoded.
            // Ce bloc est moins idéal si vous voulez toujours 'identifiant' et qu'il n'est pas dans le JWT.
            // Mais il sert de filet de sécurité.
            setUser({
              id: decoded.id,
              identifiant: decoded.identifiant, // Assurez-vous que votre JWT inclut ceci si vous comptez sur cette ligne
              email: decoded.email,
              role: decoded.role
            });
          }
        }
      } catch (error) {
        console.error('Erreur lors du décodage du token ou token invalide:', error);
        logout();
      }
    } else {
      // Si aucun token n'est stocké, s'assurer que l'utilisateur n'est pas défini
      setUser(null);
    }
  }, [token]); // Déclenche lorsque le 'token' change

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData)); // Stocke les données utilisateur complètes
    setToken(newToken);
    setUser(userData); // Met à jour l'état de l'utilisateur avec les données complètes
  };

  const isAdmin = user && user.role === 'admin';

  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};