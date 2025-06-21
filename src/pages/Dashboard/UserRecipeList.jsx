// src/pages/Dashboard/UserRecipeList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card } from './Dashboard.styles';
import RecipeCard from './RecipeCard'; // Sera créé à l'étape suivante
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import styled from 'styled-components';

// Styles spécifiques à la liste de recettes
const RecipeListGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  padding: var(--space-4) 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NoRecipesMessage = styled(motion.div)`
  padding: var(--space-6);
  background: var(--color-neutral-100);
  border-radius: var(--radius-xl);
  text-align: center;
  color: var(--color-neutral-600);
  font-style: italic;
  box-shadow: var(--shadow-sm);
  margin-top: var(--space-6);
`;

const UserRecipeList = () => {
  const { token } = useAuth();
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/recettes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRecettes(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des recettes de l\'utilisateur:', err);
      setError('Impossible de charger vos recettes. Veuillez réessayer plus tard.');
      toast.error('Erreur de chargement des recettes.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserRecipes();
    }
  }, [token, fetchUserRecipes]);

  const handleRecipeDeleted = (deletedRecipeId) => {
    setRecettes(prevRecettes => prevRecettes.filter(recette => recette._id !== deletedRecipeId));
    toast.success("Recette supprimée avec succès !");
  };

  const handleRecipeUpdated = (updatedRecipe) => {
    setRecettes(prevRecettes =>
      prevRecettes.map(recette =>
        recette._id === updatedRecipe._id ? updatedRecipe : recette
      )
    );
    toast.success("Recette mise à jour avec succès !");
  };

  if (loading) {
    return <NoRecipesMessage>Chargement de vos recettes...</NoRecipesMessage>;
  }

  if (error) {
    return <NoRecipesMessage style={{ color: 'var(--color-error-dark)', background: 'var(--color-error-soft)' }}>{error}</NoRecipesMessage>;
  }

  return (
    <RecipeListGrid
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {recettes.length > 0 ? (
        recettes.map((recette) => (
          <RecipeCard
            key={recette._id}
            recette={recette}
            onDelete={handleRecipeDeleted}
            onUpdate={handleRecipeUpdated}
          />
        ))
      ) : (
        <NoRecipesMessage
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ gridColumn: '1 / -1' }} // S'étend sur toutes les colonnes
        >
          Vous n'avez pas encore ajouté de recettes. Commencez par en créer une !
        </NoRecipesMessage>
      )}
    </RecipeListGrid>
  );
};

export default UserRecipeList;