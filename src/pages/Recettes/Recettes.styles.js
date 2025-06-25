// src/pages/Recettes/Recettes.styles.js

import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Styled Components pour la Page de Recettes ---

export const RecettesContainer = styled(motion.div)`
  min-height: 100vh;
  padding: var(--space-8) 0;
  background: var(--gradient-mesh); /* Votre fond mesh existant */
  position: relative;
  overflow: hidden; /* Important pour que le contenu ne déborde pas visiblement */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrer horizontalement */
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
  z-index: 1; /* Assurez-vous que le titre est au-dessus du contenu */

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
  z-index: 1; /* Assurez-vous que le contenu est au-dessus */

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
  z-index: 1; /* Assurez-vous que le contenu est au-dessus */

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
  padding: 2rem;
  border-radius: var(--radius-3xl);
  overflow: hidden;

  box-shadow: var(--shadow-md);
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  z-index: 1;

  .recipe-card-content {
    position: relative;
    padding-left: 2rem;
    z-index: 2;
    background: whitesmoke;
    box-shadow: var(--shadow-glass-hover);
    padding-top: var(--space-4);
  }

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: var(--shadow-glass-hover);
    border-color: rgba(34, 197, 94, 0.3);
  }
`;

export const RecipeName = styled.h4`
  font-family: var(--font-family-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var( --color-neutral-800);
  padding: 0 var(--space-6) 0;
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