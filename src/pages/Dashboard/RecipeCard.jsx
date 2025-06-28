import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import DefaultRecipeImage from '../../assets/images/default_recipe_image.jpg';

// Importez les icônes nécessaires
import { FaEdit, FaTrash } from 'react-icons/fa';

// Définition des styles directement ici

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
    height: auto;
    min-height: 300px;
    max-height: 400px;
    min-width: 280px;
    max-width: 350px;

    justify-content: flex-start;
    align-items: center;

    &:hover {
        transform: scale(1.05) rotate(0deg);
        box-shadow: var(--shadow-2xl);
        border-color: var(--color-secondary-600);
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
    border: 1px solid var(--color-info-300);
`;

const RecipeTitle = styled.h3`
    font-family: var(--font-family-heading);
    font-size: var(--text-2xl);
    color: var(--color-primary-700);
    margin: 0;
    text-align: center;
    text-shadow: var(--shadow-text-sm);
    line-height: 1.2;
    padding: 0 3rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    box-sizing: border-box;
`;

// Conteneur pour les boutons d'action
const ActionButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: var(--space-3);
    margin-top: auto; /* Pousse les boutons vers le bas de la carte */
    padding-top: var(--space-4);
    width: 100%;
`;

// Style pour les boutons d'action individuels
const ActionButton = styled(motion.button)`
    background: ${props => props.$isEdit ? 'var(--color-info-500)' : 'var(--color-error-500)'};
    color: var(--color-neutral-0);
    border: none;
    border-radius: var(--radius-full); /* Boutons ronds */
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-lg);
    cursor: pointer;
    transition: background-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
    box-shadow: var(--shadow-md);

    &:hover {
        background: ${props => props.$isEdit ? 'var(--color-info-600)' : 'var(--color-error-600)'};
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }

    &:active {
        transform: translateY(0);
        box-shadow: var(--shadow-sm);
    }
`;


const RecipeCard = React.forwardRef(({ recipe, onEdit, onDelete, onCardClick, ...props }, ref) => {
    return (
        <RecipeCardStyled
            ref={ref}
            {...props}
            onClick={() => onCardClick(recipe)}
            whileHover="hover"
            variants={{
                hover: {
                    scale: 1.05,
                    rotate: 0,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
                    borderColor: "var(--color-secondary-600)",
                    zIndex: 10,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                }
            }}
        >
            <RecipeImage src={recipe.imageUrl || DefaultRecipeImage} alt={recipe.nom} />
            <RecipeTitle title={recipe.nom}>{recipe.nom}</RecipeTitle>

            {/* Conteneur pour les boutons d'action */}
            <ActionButtonsContainer>
                <ActionButton
                    $isEdit
                    onClick={(e) => {
                        e.stopPropagation(); // Empêche l'ouverture de la modale de détails
                        onEdit(recipe);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaEdit />
                </ActionButton>
                <ActionButton
                    $isDelete
                    onClick={(e) => {
                        e.stopPropagation(); // Empêche l'ouverture de la modale de détails
                        onDelete(recipe._id);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaTrash />
                </ActionButton>
            </ActionButtonsContainer>
        </RecipeCardStyled>
    );
});

export default RecipeCard;