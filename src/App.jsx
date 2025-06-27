// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styles globaux
import GlobalStyles from './styles/GlobalStyles';

// Composants communs
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute'; // Importez PrivateRoute
import AdminRoute from './components/AdminRoute';     // Importez AdminRoute

// Pages de l'application
import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Recettes from './pages/Recettes/Recettes';
import DetailRecette from './pages/DetailRecette';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminDashboard from './pages/AdminDashboard.jsx'; // Importez la page AdminDashboard

// Contextes
import { AuthProvider } from './contexts/AuthContext'; // Assurez-vous que AuthProvider est bien importé
import { HoverProvider } from './contexts/HoverContext';

const App = () => {
  // Remarque : useAuth() doit être appelé DANS un composant enveloppé par AuthProvider.
  // Ici, nous n'avons pas besoin de destructuring 'token' directement dans App.jsx
  // car PrivateRoute et AdminRoute gèrent l'accès via useAuth() à l'intérieur d'eux-mêmes.
  // const { token } = useAuth(); // Supprimez cette ligne si App n'est pas enveloppé par AuthProvider (ce qui est le cas ici)

  return (
    <Router>
      {/* AuthProvider doit envelopper toutes les routes qui nécessitent l'authentification */}
      <AuthProvider>
        <GlobalStyles />
        <HoverProvider> {/* Wrap your application with HoverProvider */}
          <Navbar /> {/* La barre de navigation accède au contexte d'authentification */}
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Accueil />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/recettes" element={<Recettes />} />
            <Route path="/recettes/:id" element={<DetailRecette />} />

            {/* Route protégée pour les utilisateurs connectés */}
            {/* Utilise PrivateRoute pour s'assurer que seul un utilisateur authentifié peut y accéder */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Route protégée spécifiquement pour les administrateurs */}
            {/* Utilise AdminRoute pour s'assurer que seul un admin peut y accéder */}
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
        </HoverProvider>
        {/* ToastContainer doit être rendu à un niveau élevé pour apparaître par-dessus tout */}
        <ToastContainer
          position="top-right"
          autoClose={3000} // Ajusté à 3 secondes
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Slide} // Ajout de l'animation de transition
        />
      </AuthProvider>
    </Router>
  );
};

export default App;