// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect, useCallback } from 'react'; // Ajout de useEffect et useCallback
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance'; // Import de l'instance Axios pour les appels API

import RecipeFormModal from './RecipeFormModal';
import RecipeCarousel from '../../components/RecipeCarousel'; // Chemin mis à jour pour le nouveau composant
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
  const [userRecipes, setUserRecipes] = useState([]); // Nouvel état pour stocker les recettes de l'utilisateur
  const [loadingUserRecipes, setLoadingUserRecipes] = useState(true); // État de chargement
  const [errorUserRecipes, setErrorUserRecipes] = useState(null); // État d'erreur

  const handleOpenRecipeFormModal = () => setIsRecipeFormModalOpen(true);
  const handleCloseRecipeFormModal = () => setIsRecipeFormModalOpen(false);

  // Fonction pour recharger les recettes après ajout/modification
  const handleRecipeFormSuccess = () => {
    setIsRecipeFormModalOpen(false);
    fetchUserRecipes(); // Recharger les recettes après une action réussie
  };

  // Fonction pour récupérer les recettes de l'utilisateur
  const fetchUserRecipes = useCallback(async () => {
    setLoadingUserRecipes(true);
    setErrorUserRecipes(null);
    try {
      const response = await api.get('/recipes/user'); // Endpoint pour les recettes de l'utilisateur
      setUserRecipes(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des recettes de l\'utilisateur:', err);
      setErrorUserRecipes('Impossible de charger vos recettes.');
      toast.error('Erreur de chargement de vos recettes.');
    } finally {
      setLoadingUserRecipes(false);
    }
  }, []); // Dépendances vides car cette fonction ne dépend de rien d'externe

  // Charger les recettes de l'utilisateur au montage du composant
  useEffect(() => {
    fetchUserRecipes();
  }, [fetchUserRecipes]); // Le tableau de dépendances inclut fetchUserRecipes pour éviter les avertissements ESLint

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
          {/* Passage des recettes au nouveau composant RecipeCarousel */}
          {loadingUserRecipes ? (
            <p style={{ textAlign: 'center', color: 'var(--color-neutral-600)' }}>Chargement de vos recettes...</p>
          ) : errorUserRecipes ? (
            <p style={{ textAlign: 'center', color: 'var(--color-error-dark)' }}>{errorUserRecipes}</p>
          ) : (
            <RecipeCarousel recipes={userRecipes} />
          )}
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
        onRecipeAdded={handleRecipeFormSuccess} // Appel de fetchUserRecipes après ajout/modification
        onRecipeUpdated={handleRecipeFormSuccess} // Appel de fetchUserRecipes après ajout/modification
        recipeToEdit={null}
      />
    </DashboardContainer>
  );
};

export default Dashboard;