// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
// import { motion } from 'framer-motion'; // <-- Supprimez cette ligne
import { DashboardContainer, SectionTitle, DashboardGrid } from './Dashboard.styles';
import DashboardStats from './DashboardStats';
import AddRecipeForm from './AddRecipeForm';
import UserRecipeList from './UserRecipeList';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    toast.error("Vous devez être connecté pour accéder au tableau de bord.");
    navigate('/connexion');
    return null;
  }

  return (
    <DashboardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 // Utilise un h1 standard, les animations sont gérées par le parent
        // initial={{ opacity: 0, x: -50 }} // Déplacé vers DashboardContainer ou stylé via Dashboard.styles.js
        // animate={{ opacity: 1, x: 0 }}
        // transition={{ delay: 0.2, duration: 0.5 }}
      >
        Votre Tableau de Bord
      </h1>

      <DashboardGrid>
        <DashboardStats />
        <AddRecipeForm />
      </DashboardGrid>

      <SectionTitle // SectionTitle est déjà un styled-component basé sur motion
        // initial={{ opacity: 0, x: -50 }} // Déplacé vers la définition de SectionTitle ou géré par un parent
        // animate={{ opacity: 1, x: 0 }}
        // transition={{ delay: 0.4, duration: 0.5 }}
      >
        Vos Recettes
      </SectionTitle>
      <UserRecipeList />
    </DashboardContainer>
  );
};

export default Dashboard;