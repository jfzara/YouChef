// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assurez-vous que le chemin est correct

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    // Si pas connecté du tout, rediriger vers la page de login
    return <Navigate to="/connexion" replace />;
  }

  if (!isAdmin) {
    // Si connecté mais pas admin, rediriger vers une page non autorisée ou le dashboard
    // Vous pouvez créer une page 403 (Accès Interdit) si vous le souhaitez
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;