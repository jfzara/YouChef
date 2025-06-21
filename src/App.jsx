// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar/Navbar';

import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Recettes from './pages/Recettes/Recettes';
import DetailRecette from './pages/DetailRecette';
import Dashboard from './pages/Dashboard';

import { useAuth } from './contexts/AuthContext';
import { HoverProvider } from './contexts/HoverContext'; // <== NOUVEL IMPORTATION

const App = () => {
  const { token } = useAuth();

  return (
    <Router>
      <GlobalStyles />
      <HoverProvider> {/* <== ENVELOPPEZ VOTRE APPLICATION AVEC LE HOVERPROVIDER */}
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
      </HoverProvider> {/* <== FERMETURE DU HOVERPROVIDER */}
    </Router>
  );
};

export default App;