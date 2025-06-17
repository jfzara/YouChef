import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import des pages
import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Recettes from './pages/Recettes';
import DetailRecette from './pages/DetailRecette';
import Dashboard from './pages/Dashboard';

// Auth context
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { token } = useAuth(); // On récupère le token pour protéger les routes

  return (
    <Router>
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

