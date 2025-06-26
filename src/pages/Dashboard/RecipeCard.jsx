import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import DefaultRecipeImage from '../../assets/images/default_recipe_image.jpg';

const RecipeCardStyled = styled(motion.div)`
  background: var(--color-neutral-0);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  position: relative;
  overflow: hidden;
  cursor: pointer; /* Indique que la carte est cliquable */
  border: 4px dashed var(--color-primary-500);
  transform: rotate(calc((Math.random() - 0.5) * 3deg));

  width: 20vw;
  /* Hauteur ajustée pour être moins "vide" */
  height: auto; 
  min-height: 300px; /* Nouvelle hauteur minimale */
  max-height: 400px; /* Nouvelle hauteur maximale */
  min-width: 280px;
  max-width: 350px;

  /* Centrage du contenu restant si besoin, mais le titre est centré individuellement */
  justify-content: flex-start;
  align-items: center; /* Centre les éléments horizontalement */

  &:hover {
    transform: scale(1.05) rotate(0deg);
    box-shadow: var(--shadow-2xl);
    border-color: #2C5282; /* REMPLACER par la vraie valeur hexadécimale de --color-secondary-600 */
    z-index: 10;
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-3);
  box-shadow: var(--shadow-sm);
  background-color: var(--color-neutral-100);
  border: 2px solid var(--color-info-300);
`;

const RecipeTitle = styled.h3`
  font-family: var(--font-family-heading);
  font-size: var(--text-2xl);
  color: var(--color-primary-700);
  margin: 0;
  /* Centrage du texte du titre */
  text-align: center;
  text-shadow: var(--shadow-text-sm);
  line-height: 1.2;
  /* Padding de 3rem à gauche et à droite */
  padding: 0 3rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* Utilise l'ellipsis pour une coupure nette et esthétique */
  width: 100%; /* S'assure que le titre prend toute la largeur pour le padding */
  box-sizing: border-box; /* Inclut le padding dans la largeur totale */
`;

// Ajout de la prop 'onCardClick'
const RecipeCard = React.forwardRef(({ recipe, onEdit, onDelete, onCardClick, ...props }, ref) => {
  return (
    <RecipeCardStyled
      ref={ref}
      {...props}
      onClick={() => onCardClick(recipe)} // Appel de onCardClick avec la recette
      whileHover="hover"
      variants={{
        hover: {
          scale: 1.05,
          rotate: 0,
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
          borderColor: "#2C5282", /* REMPLACER par la vraie valeur hexadécimale de --color-secondary-600 */
          zIndex: 10,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }
      }}
    >
      <RecipeImage src={recipe.imageUrl || DefaultRecipeImage} alt={recipe.nom} />
      <RecipeTitle title={recipe.nom}>{recipe.nom}</RecipeTitle>
      {/* Vous pouvez ajouter ici les boutons d'édition/suppression si vous voulez qu'ils soient sur la carte elle-même,
          mais pour l'instant, ils sont gérés par le parent via les props onEdit/onDelete */}
    </RecipeCardStyled>
  );
});

export default RecipeCard;
