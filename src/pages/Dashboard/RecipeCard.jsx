import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import EditIcon from '../../assets/icons/edit.svg'; 
import DeleteIcon from '../../assets/icons/delete.svg'; 
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
  cursor: pointer;
  border: 4px dashed var(--color-primary-500); 
  transform: rotate(calc((Math.random() - 0.5) * 3deg));

  width: 20vw;   
  height: 28vw;  
  min-width: 280px; 
  max-width: 350px; 
  min-height: 400px; 
  max-height: 550px; 
  
  justify-content: space-between; 

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
  text-align: left; 
  text-shadow: var(--shadow-text-sm);
  line-height: 1.2;
  padding-left: 3rem; 
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; 
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
  flex-grow: 1; 
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 4; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-4);
  width: 100%;
`;

const ActionButton = styled(motion.button)`
  background: var(--color-primary-500);
  color: var(--color-neutral-0); 
  border: 3px solid var(--color-primary-700);
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

  &.edit {
    background: var(--color-info-500);
    border-color: var(--color-info-700);
    
    &:hover {
        background: #38A169; /* REMPLACER par la vraie valeur de --color-info-600 */
        border-color: #2F855A; /* REMPLACER par la vraie valeur de --color-info-800 */
        color: #FFFFFF;       /* REMPLACER par la vraie valeur de --color-neutral-0 */
    }
  }

  &.delete {
    background: var(--color-error-500);
    border-color: var(--color-error-700);

    &:hover {
        background: #E53E3E; /* REMPLACER par la vraie valeur de --color-error-600 */
        border-color: #C53030; /* REMPLACER par la vraie valeur de --color-error-800 */
        color: #FFFFFF;       /* REMPLACER par la vraie valeur de --color-neutral-0 */
    }
  }

  &:not(.edit):not(.delete):hover {
    background: #3182CE; /* REMPLACER par la vraie valeur de --color-primary-600 */
    border-color: #2B6CB0; /* REMPLACER par la vraie valeur de --color-primary-800 */
    color: #FFFFFF;       /* REMPLACER par la vraie valeur de --color-neutral-0 */
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  img {
    width: 20px;
    height: 20px;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
    
    &:hover {
      filter: invert(20%) sepia(80%) saturate(2000%) hue-rotate(180deg) brightness(50%) contrast(120%); 
    }
  }
`;

const RecipeCard = React.forwardRef(({ recipe, onEdit, onDelete, ...props }, ref) => {
  return (
    <RecipeCardStyled
      ref={ref}
      {...props}
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
          whileTap={{ scale: 0.9, transition: { duration: 0.1 } }} 
        >
          <img src={EditIcon} alt="Modifier" />
          Modifier
        </ActionButton>
        <ActionButton
          className="delete"
          onClick={() => onDelete(recipe._id)}
          whileTap={{ scale: 0.9, transition: { duration: 0.1 } }} 
        >
          <img src={DeleteIcon} alt="Supprimer" />
          Supprimer
        </ActionButton>
      </ActionButtons>
    </RecipeCardStyled>
  );
});

export default RecipeCard;