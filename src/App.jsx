import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Recettes from './pages/Recettes';
import DetailRecette from './pages/DetailRecette';
import Dashboard from './pages/Dashboard';
import TestMotion from './pages/TestMotion'; // ✅ Ajout ici

import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/recettes" element={<Recettes />} />
        <Route path="/recettes/:id" element={<DetailRecette />} />
        <Route path="/test-motion" element={<TestMotion />} /> {/* ✅ Ajout ici */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/connexion" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

