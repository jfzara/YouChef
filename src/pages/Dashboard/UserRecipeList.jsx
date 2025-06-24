// src/pages/Dashboard/UserRecipeList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { toast } from "react-toastify";
import RecipeFormModal from "./RecipeFormModal";
import RecipeCard from "./RecipeCard"; // Garde ce chemin si tu veux que RecipeCard reste dans /Dashboard
// IMPORTS MANQUANTS AJOUTÉS ICI
import api from '../../api/axiosInstance'; // Importe ton instance Axios configurée
import { useAuth } from '../../contexts/AuthContext'; // Importe le hook useAuth

// Styles internes à UserRecipeList.jsx (ou déplacés si nécessaire)
const RecipeListContainer = styled(motion.div)`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 300px min pour les cartes */
  gap: var(--space-8); /* Espacement plus grand entre les cartes */
  padding: var(--space-4);
  justify-items: center; /* Centre les éléments dans la grille */

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Une seule colonne sur mobile */
  }
`;

const NoRecipesMessage = styled(motion.div)`
  padding: var(--space-4); /* Moins de padding pour réduire la hauteur */
  background: var(--color-neutral-0); /* Fond blanc uni */
  border-radius: var(--radius-lg); /* Moins arrondi que les cartes principales */
  text-align: center;
  font-size: var(--text-base); /* Taille de texte réduite */
  box-shadow: var(--shadow-md); /* Ombre plus discrète */
  width: 70%; /* Moins large */
  max-width: 500px; /* Limite la largeur */
  margin: var(--space-6) auto; /* Moins de marge verticale */
  position: relative;
  overflow: hidden;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-2); /* Espace entre icône et texte */
  
  transform: rotate(${(Math.random() - 0.5) * 2}deg); /* Légère inclinaison aléatoire */
  transition: all var(--transition-base); /* Pour un hover subtil */

  &:hover {
    transform: rotate(0deg) scale(1.01); /* Se redresse et grossit très légèrement */
    box-shadow: var(--shadow-lg);
  }

  p {
    margin: 0;
    font-weight: var(--font-medium); /* Moins gras */
    color: var(--color-primary-600); /* Couleur primaire légèrement plus douce */
    line-height: 1.4;
  }

  .message-icon { /* Style pour l'icône dans le message */
    font-size: var(--text-3xl); /* Taille moyenne pour l'icône */
    color: var(--color-primary-500);
    margin-bottom: var(--space-1);
  }

  /* Styles pour l'état d'erreur - DÉCOMMENTÉS ET CORRECTS */
  &.error-message {
   
   
    p {
      color: var(--color-error-800); /* Texte rouge foncé pour l'erreur */
    }
    .message-icon {
        color: var(--color-error-500); /* Icône rouge pour l'erreur */
    }
  }
`;


const UserRecipeList = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const fetchRecipes = useCallback(async () => {
    if (!user) {
      setError("Veuillez vous connecter pour voir vos recettes.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/recipes/user/${user._id}`);
      setRecipes(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des recettes :", err);
      setError("Impossible de charger vos recettes. Veuillez réessayer plus tard.");
      toast.error("Échec du chargement des recettes.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleEdit = (recipe) => {
    setCurrentRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleDelete = async (recipeId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
      try {
        await api.delete(`/api/recipes/${recipeId}`);
        toast.success("Recette supprimée avec succès !");
        fetchRecipes(); // Rafraîchit la liste après suppression
      } catch (err) {
        console.error("Erreur lors de la suppression de la recette :", err);
        toast.error("Échec de la suppression de la recette.");
      }
    }
  };

  const handleRecipeFormSuccess = () => {
    setIsModalOpen(false);
    setCurrentRecipe(null);
    fetchRecipes(); // Rafraîchit la liste après ajout/modification
  };

  if (loading) {
    return (
      <NoRecipesMessage
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <span className="message-icon">⏳</span>
        <p>Chargement de vos recettes...</p>
      </NoRecipesMessage>
    );
  }

  // Si on a une erreur, on affiche le message d'erreur stylisé
  if (error) {
    return (
      <NoRecipesMessage
        className="error-message" // Applique la classe pour les styles d'erreur
        initial={{ opacity: 0, scale: 0.8, rotate: (Math.random() - 0.5) * 5 }} // Rotation aléatoire initiale
        animate={{ opacity: 1, scale: 1, rotate: 0 }} // Redressement
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
      >
        <span className="message-icon">⚠️</span> {/* Icône d'avertissement */}
        <p>{error}</p>
      </NoRecipesMessage>
    );
  }

  // Si pas de recettes et pas d'erreur
  if (recipes.length === 0) {
    return (
      <NoRecipesMessage
        initial={{ opacity: 0, scale: 0.8, rotate: (Math.random() - 0.5) * 5 }} // Rotation aléatoire initiale
        animate={{ opacity: 1, scale: 1, rotate: 0 }} // Redressement
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
      >
        <span className="message-icon">🥄</span> {/* Icône de cuillère pour un message vide */}
        <p>Vous n'avez pas encore de recettes. Créez-en une nouvelle pour commencer !</p>
      </NoRecipesMessage>
    );
  }

  return (
    <RecipeListContainer layout>
      <AnimatePresence>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onEdit={handleEdit}
            onDelete={handleDelete}
            initial={{ opacity: 0, y: 20, rotate: `${(Math.random() - 0.5) * 10}deg` }} // Rotation aléatoire initiale
            animate={{ opacity: 1, y: 0, rotate: `${(Math.random() - 0.5) * 2}deg` }} // Rotation aléatoire finale
            exit={{ opacity: 0, y: -20, rotate: `${(Math.random() - 0.5) * -10}deg` }}
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: index * 0.05 }} // Délai décalé
            layout // Permet les animations de layout sur ajout/suppression
          />
        ))}
      </AnimatePresence>

      <RecipeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipeToEdit={currentRecipe}
        onSuccess={handleRecipeFormSuccess}
      />
    </RecipeListContainer>
  );
};

export default UserRecipeList;