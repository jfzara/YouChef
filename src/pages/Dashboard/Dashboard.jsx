// C:\Users\Jeff\Desktop\PROJETS VS CODE\JAVASCRIPT\REACT\recettesreact\src\pages\Dashboard\Dashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify'; // Assurez-vous que ToastContainer est dans App.js

// Importe les composants du dashboard
import RecipeFormModal from './RecipeFormModal';
import UserRecipeList from './UserRecipeList';
import RecentRecipes from './RecentRecipes';
import StatsBubble from './StatsBubble';

// Importe TOUS les styled-components depuis Dashboard.styles.js
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

  // Callback pour rafraîchir les listes après ajout/modification
  const handleRecipeFormSuccess = () => {
    setIsRecipeFormModalOpen(false);
    // Ici, vous devrez probablement déclencher un rafraîchissement dans UserRecipeList
    // Vous pouvez le faire en passant une fonction à UserRecipeList ou en utilisant un état global/contexte si plus complexe.
    // Pour l'instant, UserRecipeList a son propre useEffect qui devrait se déclencher
    // si son prop `user` change, ou si vous lui passez une prop `refreshTrigger`.
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
        onRecipeAdded={handleRecipeFormSuccess} // Passez le callback pour rafraîchir
        onRecipeUpdated={handleRecipeFormSuccess} // Passez le callback pour rafraîchir
        recipeToEdit={null} // Initialement pour l'ajout, pas d'édition
      />
    </DashboardContainer>
  );
};

export default Dashboard;