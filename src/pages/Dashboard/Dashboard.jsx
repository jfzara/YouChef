import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

import RecipeFormModal from './RecipeFormModal';
import UserRecipeList from './UserRecipeList';
import RecentRecipes from './RecentRecipes';
import StatsBubble from './StatsBubble';

import {
  DashboardContainer,
  WelcomeSection,
  ContentGrid,
  MainContent,
  SidebarContent,
  DashboardTitle,
  AddRecipeToggleCard,
} from './Dashboard.styles';

const Dashboard = () => {
  const { user } = useAuth();
  const [isRecipeFormModalOpen, setIsRecipeFormModalOpen] = useState(false);

  const handleOpenRecipeFormModal = () => setIsRecipeFormModalOpen(true);
  const handleCloseRecipeFormModal = () => setIsRecipeFormModalOpen(false);

  const handleRecipeFormSuccess = () => {
    setIsRecipeFormModalOpen(false);
  };

  return (
    <DashboardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WelcomeSection
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1>Bienvenue, Chef {user ? user.identifiant : 'Gourmet'} ! 🧑‍🍳✨</h1>
        <p>Préparez vos papilles, c'est l'heure de créer de nouvelles saveurs !</p>
      </WelcomeSection>

      <ContentGrid
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <MainContent>
          <DashboardTitle>Mes Recettes</DashboardTitle>
          <UserRecipeList />
        </MainContent>

        <SidebarContent>
          <DashboardTitle>Boîte à Outils Culinaires</DashboardTitle>

          <AddRecipeToggleCard
            onClick={handleOpenRecipeFormModal}
            whileTap={{ scale: 0.98, rotate: -1 }}
          >
            <h3>Ajouter une Nouvelle Recette</h3>
            <span className="add-icon">+</span>
          </AddRecipeToggleCard>

          <DashboardTitle as="h3">Dernières Créations Mondiales</DashboardTitle>
          <RecentRecipes />

        </SidebarContent>
      </ContentGrid>

      <StatsBubble />

      <RecipeFormModal
        isOpen={isRecipeFormModalOpen}
        onClose={handleCloseRecipeFormModal}
        onRecipeAdded={handleRecipeFormSuccess}
        onRecipeUpdated={handleRecipeFormSuccess}
        recipeToEdit={null}
      />
    </DashboardContainer>
  );
};

export default Dashboard;