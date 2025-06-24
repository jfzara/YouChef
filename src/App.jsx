// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar/Navbar';

import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Recettes from './pages/Recettes/Recettes';
import DetailRecette from './pages/DetailRecette';
import Dashboard from './pages/Dashboard/Dashboard';

import { useAuth } from './contexts/AuthContext';
import { HoverProvider } from './contexts/HoverContext';

const App = () => {
  const { token } = useAuth(); // Destructure token from useAuth()

  return (
    <Router>
      <GlobalStyles />
      <HoverProvider> {/* Wrap your application with HoverProvider */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/recettes" element={<Recettes />} />
          <Route path="/recettes/:id" element={<DetailRecette />} />
          <Route
            path="/dashboard"
            // Protect the dashboard route based on the presence of a token
            element={token ? <Dashboard /> : <Navigate to="/connexion" />}
          />
        </Routes>
      </HoverProvider>
      {/* ToastContainer should be rendered at a high level in your component tree
          to ensure toasts appear above other content. */}
      <ToastContainer
        position="top-right" // You can change the position (e.g., 'bottom-left', 'top-center')
        autoClose={5000}     // Toasts will auto-close after 5000ms (5 seconds)
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"      // Choose a theme: 'light', 'dark', or 'colored'
      />
    </Router>
  );
};

export default App;