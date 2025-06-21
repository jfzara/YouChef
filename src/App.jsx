// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar/Navbar'; // <== Assurez-vous que ce chemin est correct

import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Recettes from './pages/Recettes/Recettes';
import DetailRecette from './pages/DetailRecette';
import Dashboard from './pages/Dashboard';


import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { token } = useAuth();

  return (
    <Router>
      <GlobalStyles />
      {/* Intégrez la Navbar ici, en dehors des Routes, pour qu'elle soit toujours visible */}
      <Navbar />
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