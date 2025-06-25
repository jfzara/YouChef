import React, { useState, useEffect, useCallback } from 'react';
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
  const [userRecipes, setUserRecipes] = useState([]); // État pour stocker les recettes de l'utilisateur
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
      // ✅ Correction de l'URL pour correspondre à votre backend : /api/recettes/
      const response = await api.get('/recettes/'); 
      setUserRecipes(response.data);
      console.log("Recettes utilisateur chargées :", response.data.length); // Log pour vérification
    } catch (err) {
      console.error('Erreur lors de la récupération des recettes de l\'utilisateur:', err);
      // Afficher un message d'erreur plus convivial à l'utilisateur
      setErrorUserRecipes('Impossible de charger vos recettes. Veuillez réessayer.');
      toast.error('Erreur de chargement de vos recettes.');
    } finally {
      setLoadingUserRecipes(false);
    }
  }, []); // `fetchUserRecipes` ne dépend d'aucune variable de l'extérieur pour ne pas recréer la fonction à chaque rendu.

  // Charger les recettes de l'utilisateur au montage du composant
  useEffect(() => {
    fetchUserRecipes();
  }, [fetchUserRecipes]); // Le tableau de dépendances inclut `fetchUserRecipes` pour éviter les avertissements ESLint

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
          {loadingUserRecipes ? (
            <p style={{ textAlign: 'center', color: 'var(--color-neutral-600)', padding: '2rem' }}>
              Chargement de vos recettes...
            </p>
          ) : errorUserRecipes ? (
            <p style={{ textAlign: 'center', color: 'var(--color-error-dark)', padding: '2rem' }}>
              {errorUserRecipes}
            </p>
          ) : (
            // Passage des recettes au composant RecipeCarousel
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
        onRecipeAdded={handleRecipeFormSuccess} // Appel de fetchUserRecipes après ajout
        onRecipeUpdated={handleRecipeFormSuccess} // Appel de fetchUserRecipes après modification
        recipeToEdit={null}
      />
    </DashboardContainer>
  );
};

export default Dashboard;