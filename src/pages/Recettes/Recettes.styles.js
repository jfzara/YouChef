
// src/pages/Recettes/Recettes.styles.js

import styled from 'styled-components';
import { motion } from 'framer-motion';

export const RecettesContainer = styled(motion.div)`
  min-height: 100vh;
  padding: var(--space-8) 0;
  background: var(--gradient-mesh);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* --- MODIFICATION ICI : Suppression des styles de filtre et de pointer-events --- */
  /* filter: ${props => props.$isModalOpen ? 'blur(5px) brightness(0.7)' : 'none'}; */
  /* transition: filter 0.5s ease-in-out; */
  /* pointer-events: ${props => props.$isModalOpen ? 'none' : 'auto'}; */
  /* --------------------------------------------------------------------------------- */
`;

export const PageTitle = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--font-extrabold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-4);
  line-height: 1.1;
  text-align: center;
  position: relative;
  z-index: 1;

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

export const CategoryFilterContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin: var(--space-8) auto;
  padding: 0 var(--space-4);
  max-width: 1200px;
  width: 100%;
  z-index: 1;

  @media (max-width: 768px) {
    margin: var(--space-6) auto;
    gap: var(--space-2);
    padding: 0 var(--space-2);
  }
`;

export const CategoryButton = styled(motion.button)`
  background-color: ${props => props.$isActive ? 'var(--color-primary-500)' : 'rgba(255, 255, 255, 0.7)'};
  color: ${props => props.$isActive ? 'white' : 'var(--color-neutral-700)'};
  border: 1px solid ${props => props.$isActive ? 'var(--color-primary-500)' : 'rgba(255, 255, 255, 0.3)'};
  backdrop-filter: ${props => props.$isActive ? 'none' : 'blur(15px)'};
  -webkit-backdrop-filter: ${props => props.$isActive ? 'none' : 'blur(15px)'};
  border-radius: var(--radius-full);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)'};

  &:hover {
    background-color: ${props => props.$isActive ? 'var(--color-primary-600)' : 'rgba(255, 255, 255, 0.9)'};
    color: ${props => props.$isActive ? 'white' : 'var(--color-neutral-800)'};
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  @media (max-width: 768px) {
    font-size: var(--text-sm);
    padding: var(--space-2) var(--space-4);
  }
`;

export const RecipeGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-6);
  width: 100%;
  max-width: 1200px;
  padding: 0 var(--space-4);
  margin: var(--space-8) auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--space-5);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: var(--space-4);
    padding: 0 var(--space-3);
  }
`;

export const RecipeMiniCard = styled(motion.div)`
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  z-index: 1;
  text-align: center;
    
  .image-container {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
    overflow: hidden;
    background-color: var(--color-neutral-200);
  }

  .image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }

  .recipe-info {
    padding: var(--space-3) var(--space-2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    border-radius: var(--radius-lg);
    .image-container {
      border-radius: var(--radius-lg);
    }
  }
`;

export const RecipeMiniName = styled.h4`
  font-family: var(--font-family-heading);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-neutral-800);
  margin-bottom: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: var(--text-sm);
  }
`;

export const RecipeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-xl);
  
  @media (max-width: 768px) {
    border-radius: var(--radius-lg);
  }
`;

export const RecipeNameDetail = styled.h2`
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: var(--font-extrabold);
  color: var(--color-neutral-800);
  margin-bottom: var(--space-4);
  text-align: center;
  @media (max-width: 768px) {
    font-size: var(--text-3xl);
  }
`;

export const RecipeDescriptionDetail = styled.p`
  font-size: var(--text-lg);
  color: var(--color-neutral-700);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
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
  white-space: nowrap;
`;

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* L'assombrissement doit venir de l'overlay lui-même */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal); /* Assurez-vous que c'est une valeur élevée */
  /* backdrop-filter: blur(5px); // On ne le met pas ici, car il est sur le body maintenant */
`;

export const ModalContent = styled(motion.div)`
  background: white;
  border-radius: var(--radius-3xl);
  padding: var(--space-8);
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  position: relative;
  /* On ne met pas de filter ou transform ici, l'overlay gère le centrage */

  @media (max-width: 768px) {
    padding: var(--space-6);
    width: 95%;
  }
`;

export const CloseButton = styled(motion.button)`
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: 600;
  color: black;
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  display: flex;
  justify-content: center;
  align-items: center;
  width:2.5rem;
  height:2.5rem;
  margin: 1rem;
  text-align: center;

  &:hover {
    background: var(--color-error-light);
    transform: rotate(90deg);
  }

  img {
    width: 28px;
    height: 28px;
    filter: brightness(0) invert(1);
  }
`;

export const ModalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-6);

  @media (max-width: 768px) {
    height: 200px;
    margin-bottom: var(--space-4);
  }
`;

export const RecipeDetailsSection = styled.div`
  margin-top: var(--space-6);
  h3 {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--color-neutral-800);
    margin-bottom: var(--space-3);
  }
  ul, ol {
    list-style-position: inside;
    margin-bottom: var(--space-4);
    padding-left: var(--space-2);
  }
  li {
    font-size: var(--text-base);
    color: var(--color-neutral-700);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-2);
  }
`;