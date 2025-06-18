// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importez votre composant GlobalStyles
import GlobalStyles from './styles/GlobalStyles'; // Ajustez le chemin si nécessaire

import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Recettes from './pages/Recettes';
import DetailRecette from './pages/DetailRecette';
import Dashboard from './pages/Dashboard';


import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { token } = useAuth();

  return (
    <Router>
      {/* Appliquez les styles globaux ici, ils affecteront toute l'application */}
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/recettes" element={<Recettes />} />
        <Route path="/recettes/:id" element={<DetailRecette />} />
     
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/connexion" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
