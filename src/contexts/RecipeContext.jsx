// src/contexts/RecipeContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

// Créez le Contexte
const RecipeContext = createContext(null);

// Créez un hook personnalisé pour faciliter l'utilisation du Contexte
export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes doit être utilisé à l\'intérieur d\'un RecipeProvider');
  }
  return context;
};

// Créez le Fournisseur de Contexte
export const RecipeProvider = ({ children }) => {
  const [recipesUpdated, setRecipesUpdated] = useState(false);

  // Fonction pour notifier un changement (inverse la valeur pour forcer le re-rendu/re-fetch)
  const notifyRecipesChange = useCallback(() => {
    setRecipesUpdated(prev => !prev);
    console.log("DEBUG CONTEXT: recipesUpdated basculé vers:", !recipesUpdated); // Ajoutez ce log
  }, [recipesUpdated]); // Assurez-vous que recipesUpdated est dans les dépendances de useCallback

  const value = {
    recipesUpdated,
    notifyRecipesChange,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};