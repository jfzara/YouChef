// C:\Users\Jeff\Desktop\PROJETS VS CODE\JAVASCRIPT\REACT\recettesreact\src\pages\Dashboard\Dashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

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
  // Retire Card d'ici si tu ne l'utilises nulle part ailleurs
  // Si tu l'utilises ailleurs, garde l'importation mais ne l'utilise plus autour de RecentRecipes
  DashboardTitle,
  AddRecipeToggleCard,
} from './Dashboard.styles';

const Dashboard = () => {
  const { user } = useAuth();
  const [isRecipeFormModalOpen, setIsRecipeFormModalOpen] = useState(false);

  const handleOpenRecipeFormModal = () => setIsRecipeFormModalOpen(true);
  const handleCloseRecipeFormModal = () => setIsRecipeFormModalOpen(false);

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

          {/* Section Recettes Récentes - MODIFIÉE ICI */}
          {/* Retire la Card englobante et laisse le titre et RecentRecipes directement */}
          <DashboardTitle as="h3">Dernières Créations Mondiales</DashboardTitle> {/* Le titre est conservé */}
          <RecentRecipes /> {/* RecentRecipes gère maintenant son propre conteneur (RolodexContainer) */}

          {/* Si tu as des StatsGrid et StatCard, ils doivent être définis dans Dashboard.styles.js
              et importés. Pour le moment, ta StatsBubble gère ça différemment. */}
        </SidebarContent>
      </ContentGrid>

      <StatsBubble />

      <RecipeFormModal
        isOpen={isRecipeFormModalOpen}
        onClose={handleCloseRecipeFormModal}
      />
    </DashboardContainer>
  );
};

export default Dashboard;