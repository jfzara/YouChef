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
  const [recipeToEdit, setRecipeToEdit] = useState(null); // NOUVEAU : État pour la recette à éditer

  const handleOpenRecipeFormModal = () => setIsRecipeFormModalOpen(true);
  const handleCloseRecipeFormModal = () => {
    setIsRecipeFormModalOpen(false);
    setRecipeToEdit(null); // IMPORTANT : Réinitialiser la recette à éditer à la fermeture
  };

  // Fonction pour recharger les recettes après ajout/modification
  const handleRecipeFormSuccess = () => {
    setIsRecipeFormModalOpen(false);
    setRecipeToEdit(null); // IMPORTANT : Réinitialiser après succès
    fetchUserRecipes(); // Recharger les recettes après une action réussie
  };

  // Fonction pour récupérer les recettes de l'utilisateur
  const fetchUserRecipes = useCallback(async () => {
    setLoadingUserRecipes(true);
    setErrorUserRecipes(null);
    try {
      const response = await api.get('/recettes/');
      setUserRecipes(response.data);
      console.log("Recettes utilisateur chargées :", response.data.length);
    } catch (err) {
      console.error('Erreur lors de la récupération des recettes de l\'utilisateur:', err);
      setErrorUserRecipes('Impossible de charger vos recettes. Veuillez réessayer.');
      toast.error('Erreur de chargement de vos recettes.');
    } finally {
      setLoadingUserRecipes(false);
    }
  }, []);

  // NOUVELLES FONCTIONS : Pour la modification et la suppression
  const handleEditRecipe = useCallback((recipe) => {
    setRecipeToEdit(recipe); // Définit la recette à pré-remplir dans la modale
    setIsRecipeFormModalOpen(true); // Ouvre la modale en mode édition
  }, []);

  const handleDeleteRecipe = useCallback(async (recipeId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
      try {
        await api.delete(`/recettes/${recipeId}`); // Appel API pour supprimer
        toast.success('Recette supprimée avec succès !');
        fetchUserRecipes(); // Recharger la liste des recettes
      } catch (err) {
        console.error('Erreur lors de la suppression de la recette:', err);
        toast.error('Erreur lors de la suppression de la recette.');
      }
    }
  }, [fetchUserRecipes]); // Dépend de fetchUserRecipes pour le rechargement

  // Charger les recettes de l'utilisateur au montage du composant
  useEffect(() => {
    fetchUserRecipes();
  }, [fetchUserRecipes]);

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
            // MODIFICATION CRUCIALE : Passage des fonctions d'édition et suppression
            <RecipeCarousel
              recipes={userRecipes}
              onEditRecipe={handleEditRecipe} // La prop s'appelle onEditRecipe dans RecipeCarousel
              onDeleteRecipe={handleDeleteRecipe} // La prop s'appelle onDeleteRecipe dans RecipeCarousel
            />
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
        onRecipeAdded={handleRecipeFormSuccess}
        onRecipeUpdated={handleRecipeFormSuccess}
        recipeToEdit={recipeToEdit} // NOUVEAU : Passez la recette à éditer à la modale
      />
    </DashboardContainer>
  );
};

export default Dashboard;