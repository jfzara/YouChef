// src/pages/Recettes/Recettes.styles.js

import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Styled Components pour la Page de Recettes ---

export const RecettesContainer = styled(motion.div)`
  min-height: 100vh;
  padding: var(--space-8) 0;
  background: var(--gradient-mesh); /* Votre fond mesh existant */
  position: relative;
  overflow: hidden; /* Important pour que le blob ne déborde pas visiblement */
  display: flex; /* Ajouté pour centrer le contenu comme avant */
  flex-direction: column;
  align-items: center; /* Centrer horizontalement */
`;

export const BlobBackground = styled(motion.img)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centrage initial */
  width: 500px; /* Taille de base pour qu'il puisse grandir */
  height: 500px;
  object-fit: contain;
  pointer-events: none; /* Ne doit pas interférer avec les interactions de la souris */
  z-index: 0; /* Assurez-vous qu'it is in the background */
  filter: blur(50px); /* Flou par défaut pour un effet doux */
  opacity: 0; /* Commence invisible ou très peu visible */
`;

export const PageTitle = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--font-extrabold);
  background: var(--gradient-primary); /* Exemple de gradient si vous l'utilisez */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-4);
  line-height: 1.1;
  text-align: center;
  position: relative; /* Pour le pseudo-élément */
  z-index: 1; /* Assurez-vous que le titre est au-dessus du blob */

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--gradient-primary);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    font-size: var(--text-4xl);
  }
`;

export const CategorySection = styled(motion.section)`
  width: 100%;
  max-width: 1280px; /* Adaptez à votre wrapper */
  margin: var(--space-12) auto;
  padding: 0 var(--space-6);
  z-index: 1; /* Assurez-vous que le contenu est au-dessus du blob */

  @media (max-width: 768px) {
    padding: 0 var(--space-4);
  }
`;

export const CategoryTitle = styled(motion.h2)`
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: var(--font-extrabold);
  color: ${props => props.$color || 'var(--color-neutral-800)'};
  margin-bottom: var(--space-8);
  position: relative;
  text-align: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${props => props.$color || 'var(--color-primary-500)'};
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-sm);
  }

  @media (max-width: 768px) {
    font-size: var(--text-3xl);
  }
`;

export const SubCategoryArticle = styled(motion.article)`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-3xl);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--shadow-glass);
  padding: var(--space-8);
  margin-bottom: var(--space-10);
  position: relative;
  z-index: 1; /* Assurez-vous que le contenu est au-dessus du blob */

  @media (max-width: 768px) {
    padding: var(--space-6);
    margin-bottom: var(--space-8);
  }
`;

export const SubCategoryTitle = styled(motion.h3)`
  font-family: var(--font-body);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: ${props => props.$color || 'var(--color-neutral-700)'};
  margin-bottom: var(--space-6);
  text-align: center;

  @media (max-width: 768px) {
    font-size: var(--text-xl);
    margin-bottom: var(--space-4);
  }
`;

export const RecipeGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-8);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--space-6);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
`;

export const RecipeCard = styled(motion.div)`
  background: white; /* Fond blanc par défaut */
  border-radius: var(--radius-3xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  /* Retiré la transition 'all' ici car Framer Motion gérera les animations des props */
  z-index: 1;

  /* Pseudo-élément pour l'image de fond décorative qui apparaît */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 180px; /* Hauteur de la zone d'image de fond */
    background-image: url(${props => props.$backgroundImage}); /* Utilise la prop passée depuis JSX */
    background-size: cover;
    background-position: center;
    opacity: 0; /* Commence invisible */
    transition: opacity 0.5s ease-in-out; /* Fade-in/out doux sur 0.5s */
    pointer-events: none; /* Ne doit pas bloquer les clics sur la carte */
    z-index: 0; /* Placez-le en dessous du contenu du texte */
    border-top-left-radius: inherit; /* Hérite du border-radius du parent */
    border-top-right-radius: inherit; /* Hérite du border-radius du parent */
  }

  /* Au survol, l'image apparaît */
  &:hover::before {
    opacity: 1;
  }

  /* Styles pour s'assurer que le contenu textuel est toujours visible et lisible */
  ${/* Important: This targets elements that are not directly styled by a specific RecipeCard sub-component, */ ''}
  ${/* ensuring they're above the pseudo-element. You might not need this if all content is explicitly styled. */ ''}
  & > *:not(.recipe-card-content) { 
    position: relative;
    z-index: 2; /* Assurez-vous que tous les enfants directs sont au-dessus de ::before */
  }

  /* Style pour le conteneur du contenu textuel, si vous décidez d'en utiliser un */
  .recipe-card-content {
    position: relative;
    z-index: 2;
    background: linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 50%, transparent 100%); /* Dégradé pour lisibilité */
    padding-top: var(--space-4); /* Maintenez le padding top pour le contenu */
    /* Autres paddings et styles du contenu ici */
  }


  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: var(--shadow-glass-hover);
    border-color: rgba(34, 197, 94, 0.3);
  }
`;

// RecipeCardBackground est supprimé comme discuté.

export const RecipeName = styled.h4`
  font-family: var(--font-family-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-neutral-800);
  padding: 0 var(--space-6) 0; /* Le padding-top peut être géré par .recipe-card-content si utilisé */
  margin-bottom: var(--space-2);
  position: relative;
  z-index: 2;
`;

export const RecipeDescription = styled.p`
  font-size: var(--text-sm);
  color: var(--color-neutral-600);
  padding: 0 var(--space-6) var(--space-4);
  line-height: var(--leading-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
  z-index: 2;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  margin: 0 var(--space-1) var(--space-1) 0;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: capitalize;
  background-color: ${props => props.$isCategory ? 'var(--soft-green-100)' : 'var(--soft-blue-100)'};
  color: ${props => props.$isCategory ? 'var(--soft-green-700)' : 'var(--soft-blue-700)'};
  position: relative;
  z-index: 2;
`;