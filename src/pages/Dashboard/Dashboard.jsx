// src/pages/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify'; // Garder l'importation si tu l'utilises pour toast.success/error

// Importe les composants du dashboard
import RecipeFormModal from './RecipeFormModal'; // Pour ajouter/éditer une recette
import UserRecipeList from './UserRecipeList'; // La liste des recettes de l'utilisateur
import RecentRecipes from './RecentRecipes'; // Les 5 dernières recettes ajoutées
import StatsBubble from './StatsBubble'; // Notre nouvelle bulle de stats

// Importe TOUS les styled-components depuis Dashboard.styles.js
import {
  DashboardContainer,
  WelcomeSection,
  ContentGrid,
  MainContent,
  SidebarContent,
  Card, // Importé depuis Dashboard.styles.js
  DashboardTitle,
  AddRecipeToggleCard, // Importé depuis Dashboard.styles.js
  // Si tu utilises AddRecipeModalOverlay, AddRecipeModalContent, CloseButton
  // ou d'autres éléments définis comme styled-components directement dans ce fichier,
  // il faudra les importer ici aussi ou les définir globalement.
  // Pour le moment, je les laisse comme définis dans RecipeFormModal
  // AddRecipeModalOverlay,
  // AddRecipeModalContent,
  // CloseButton,
} from './Dashboard.styles'; // Assure-toi que ce fichier existe

const Dashboard = () => {
  const { user } = useAuth();
  const [isRecipeFormModalOpen, setIsRecipeFormModalOpen] = useState(false);

  const handleOpenRecipeFormModal = () => setIsRecipeFormModalOpen(true);
  const handleCloseRecipeFormModal = () => setIsRecipeFormModalOpen(false);

  // Les fonctions handleRecipeAdded, handleRecipeUpdated, handleRecipeDeleted
  // sont gérées directement dans UserRecipeList maintenant, donc pas besoin ici.

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
        {/* TITRE DE BIENVENUE MIS À JOUR POUR ÊTRE PLUS FUN */}
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
          <UserRecipeList /> {/* Affiche la liste des recettes de l'utilisateur */}
        </MainContent>

        <SidebarContent>
          <DashboardTitle>Boîte à Outils Culinaires</DashboardTitle>
          {/* Carte "Ajouter une Recette" */}
          <AddRecipeToggleCard
            onClick={handleOpenRecipeFormModal}
            whileTap={{ scale: 0.98, rotate: -1 }} // Effet de "pression" au clic
          >
            <h3>Ajouter une Nouvelle Recette</h3>
            <span className="add-icon">+</span>
          </AddRecipeToggleCard>

          {/* Section Recettes Récentes */}
          <Card> {/* Utilise la Card importée */}
            <DashboardTitle as="h3">Dernières Créations Mondiales</DashboardTitle> {/* Titre pour la card */}
            <RecentRecipes />
          </Card>

          {/* Si tu as des StatsGrid et StatCard, ils doivent être définis dans Dashboard.styles.js
              et importés. Pour le moment, ta StatsBubble gère ça différemment. */}
        </SidebarContent>
      </ContentGrid>

      {/* Le composant de la bulle de statistiques */}
      <StatsBubble />

      {/* Le modal de formulaire de recette, reste inchangé ici */}
      <RecipeFormModal
        isOpen={isRecipeFormModalOpen}
        onClose={handleCloseRecipeFormModal}
        // onRecipeAdded={handleRecipeAdded} // Décommenter si tu as besoin de remonter l'ajout au dashboard
      />
    </DashboardContainer>
  );
};

export default Dashboard;