
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Tu devras importer ces icônes
import EditIcon from '../../assets/icons/edit.svg'; // Exemple d'icône d'édition (crayon)
import DeleteIcon from '../../assets/icons/delete.svg'; // Exemple d'icône de suppression (poubelle)

// Importe ton image de remplacement locale
import DefaultRecipeImage from '../../assets/images/default_recipe_image.jpg'; // <--- ASSURE-TOI QUE CE CHEMIN EST CORRECT ET QUE L'IMAGE EXISTE !

const RecipeCardStyled = styled(motion.div)`
  background: var(--color-neutral-0); /* Blanc pur */
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-xl); /* Ombre par défaut */
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  position: relative;
  overflow: hidden;
  min-width: 300px; /* Largeur minimale pour les cartes dans le carrousel */
  max-width: 350px; /* Largeur maximale pour éviter qu'elles ne soient trop grandes */
  flex-shrink: 0; /* Ne pas rétrécir les cartes dans le flexbox */
  cursor: pointer;
  border: 4px solid var(--color-primary-500); /* Bordure épaisse et "criarde" */

  &:hover {
    transform: scale(1.05) rotate(0deg); /* Se redresse et grossit au survol */
    box-shadow: var(--shadow-2xl); /* Ombre intense au survol */
    border-color: var(--color-secondary-600); /* Changement de couleur de bordure au survol */
    z-index: 10; /* S'assure que la carte survolée est au-dessus */
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 180px; /* Hauteur fixe pour les images */
  object-fit: cover;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-3);
  box-shadow: var(--shadow-sm); /* Petite ombre pour l'image */
  /* Ajoute un fond uni pour le cas où l'image par défaut serait un SVG transparent */
  background-color: var(--color-neutral-100); /* Une couleur de fond discrète */
`;

const RecipeTitle = styled.h3`
  font-family: var(--font-family-heading);
  font-size: var(--text-2xl);
  color: var(--color-primary-700);
  margin: 0;
  text-align: center;
  text-shadow: var(--shadow-text-sm);
  line-height: 1.2;
`;

const RecipeMeta = styled.p`
  font-size: var(--text-sm);
  color: var(--color-neutral-600);
  margin: 0;
  text-align: center;
`;

const RecipeDescription = styled.p`
  font-size: var(--text-base);
  color: var(--color-neutral-800);
  margin: var(--space-2) 0;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limite à 3 lignes */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  margin-top: auto; /* Pousse les boutons vers le bas de la carte */
  width: 100%;
`;

const ActionButton = styled(motion.button)`
  background: var(--color-primary-500);
  color: var(--color-neutral-0);
  border: 3px solid var(--color-primary-700); /* Bordure épaisse */
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-weight: var(--font-semibold);
  font-family: var(--font-family-sans);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    filter: brightness(1.1); /* Légèrement plus lumineux */
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  &.edit {
    background: var(--color-info-500);
    border-color: var(--color-info-700);
    &:hover { background: var(--color-info-600); }
  }

  &.delete {
    background: var(--color-error-500);
    border-color: var(--color-error-700);
    &:hover { background: var(--color-error-600); }
  }

  img {
    width: 20px;
    height: 20px;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%); /* Pour rendre l'icône blanche */
  }
`;

const RecipeCard = React.forwardRef(({ recipe, onEdit, onDelete, ...props }, ref) => {
  return (
    <RecipeCardStyled
      ref={ref}
      {...props} // Permet de passer les props d'animation (initial, animate, exit, transition, layout)
      whileHover="hover" // Active l'état hover
      variants={{
        hover: {
          scale: 1.05,
          rotate: 0, // Se redresse
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)", // Ombre plus forte
          borderColor: "var(--color-secondary-600)", // Bordure change de couleur
          zIndex: 10,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }
      }}
    >
      {/* Utilise l'URL de la recette, ou l'image par défaut locale */}
      <RecipeImage src={recipe.imageUrl || DefaultRecipeImage} alt={recipe.nom} />
      <RecipeTitle>{recipe.nom}</RecipeTitle>
      <RecipeMeta>
        {recipe.categorie && <span>Catégorie: {recipe.categorie}</span>}
        {recipe.sousCategories && recipe.sousCategories.length > 0 && (
          <span> | Sous-catégorie: {recipe.sousCategories.join(', ')}</span>
        )}
      </RecipeMeta>
      <RecipeDescription>{recipe.description}</RecipeDescription>
      <ActionButtons>
        <ActionButton
          className="edit"
          onClick={() => onEdit(recipe)}
          whileTap={{ scale: 0.9 }}
        >
          <img src={EditIcon} alt="Modifier" />
          Modifier
        </ActionButton>
        <ActionButton
          className="delete"
          onClick={() => onDelete(recipe._id)}
          whileTap={{ scale: 0.9 }}
        >
          <img src={DeleteIcon} alt="Supprimer" />
          Supprimer
        </ActionButton>
      </ActionButtons>
    </RecipeCardStyled>
  );
});

export default RecipeCard;