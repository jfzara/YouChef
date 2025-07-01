// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styles globaux
import GlobalStyles from './styles/GlobalStyles';

// Composants communs
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Pages de l'application
import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Recettes from './pages/Recettes/Recettes';
import DetailRecette from './pages/DetailRecette';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard.jsx';

// Contextes
import { AuthProvider } from './contexts/AuthContext';
import { HoverProvider } from './contexts/HoverContext';
import { RecipeProvider } from './contexts/RecipeContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <GlobalStyles />
        <HoverProvider>
          <RecipeProvider>
            <Navbar />
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Accueil />} />
              <Route path="/connexion" element={<Connexion />} />
              <Route path="/inscription" element={<Inscription />} />
              <Route path="/recettes" element={<Recettes />} />
              <Route path="/recettes/:id" element={<DetailRecette />} />

              {/* Route protégée pour les utilisateurs connectés */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              {/* Route protégée spécifiquement pour les administrateurs */}
              <Route
                path="/admin-dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              {/* Ajoutez d'autres routes si nécessaire */}
            </Routes>
          </RecipeProvider>
        </HoverProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Slide}
        />
      </AuthProvider>
    </Router>
  );
};

export default App;