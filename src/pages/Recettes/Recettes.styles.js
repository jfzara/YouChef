// src/pages/Recettes/Recettes.styles.js

import styled from 'styled-components';
import { motion } from 'framer-motion';

export const RecettesContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--neutral-50);
  color: var(--neutral-800);

  padding-top: calc(var(--space-8) + 60px);
  padding-left: calc(250px + var(--space-8)); 
  padding-right: var(--space-4);
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;

  position: relative; 
  z-index: 1; 

  @media (max-width: 768px) {
    padding-top: calc(var(--space-6) + 60px);
    padding-left: var(--space-2); 
    padding-right: var(--space-2);
    padding-bottom: calc(var(--space-8) + 70px);
    align-items: center;
    text-align: center;
  }
`;

export const PageTitle = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  color: var(--soft-green-800);
  margin-bottom: var(--space-6);
  width: 100%;
  text-align: center;
  position: relative; 
  z-index: 2;
`;

export const CategorySection = styled(motion.section)`
  width: 100%;
  max-width: 1000px;
  margin-top: var(--space-8);
  padding: 0 var(--space-4);
  box-sizing: border-box;
  text-align: left;
  margin-bottom: var(--space-8);
  position: relative; 
  z-index: 2;

  &:first-of-type {
    margin-top: var(--space-4);
  }

  @media (max-width: 768px) {
    padding: 0 var(--space-2);
    text-align: center;
  }
`;

export const CategoryTitle = styled(motion.h2)`
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  color: ${props => props.$color || 'var(--soft-green-700)'};
  border-bottom: 3px solid ${props => props.$color || 'var(--soft-green-700)'};
  padding-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--space-6);
  position: relative;
  z-index: 3; 

  @media (max-width: 768px) {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-4);
    text-align: center;
  }
`;

export const SubCategoryArticle = styled(motion.article)`
  margin-left: var(--space-4);
  margin-top: var(--space-6);
  border-left: 5px solid ${props => props.$color || 'var(--soft-blue-500)'};
  padding-left: var(--space-6);
  border-radius: var(--radius-md);
  background-color: transparent; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  padding-top: var(--space-4);
  padding-bottom: var(--space-4);
  margin-bottom: var(--space-6);
  position: relative; 
  overflow: hidden; 
  z-index: 2; 
  
  border: 1px solid var(--soft-green-100); 

  @media (max-width: 768px) {
    margin-left: var(--space-0); 
    padding-left: var(--space-4);
    margin-top: var(--space-4);
  }
`;

export const SubCategoryTitle = styled(motion.h3)`
  color: ${props => props.$color || 'var(--soft-blue-600)'};
  margin-bottom: var(--space-4);
  font-weight: 600;
  font-size: var(--text-xl);
  position: relative;
  z-index: 3; 

  @media (max-width: 768px) {
    font-size: var(--text-lg);
  }
`;

export const RecipeGrid = styled(motion.div)`
  display: block; 
  column-count: 2; 
  column-gap: var(--space-4); 
  margin-top: var(--space-4);
  position: relative;
  z-index: 2; 

  & > * { 
    break-inside: avoid-column; 
    margin-bottom: var(--space-4); 
  }

  @media (max-width: 1024px) { 
    column-count: 1;
  }
`;

export const RecipeCard = styled(motion.article)`
  background-color: white; /* Card background is white by default */
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--soft-green-300);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  position: relative;
  overflow: hidden;
  min-height: 180px; 
  z-index: 1; 

  & > *:not(${props => props.imageBackgroundClassName}) {
      position: relative;
      z-index: 2; 
  }
`;

export const RecipeCardBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* The background image is completely invisible by default */
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  opacity: 0; /* The image is invisible by default */
  
  z-index: 1; /* Image is beneath card content */
  transition: opacity 0.3s ease, transform 0.3s ease; /* Transitions for the image */
  
  /* The GREEN mask that appears on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--soft-green-500); /* The desired green color */
    opacity: 0; /* Totally transparent by default (the white comes from RecipeCard) */
    z-index: 2; /* Above the image (z-index 1) and below the content (z-index 2 on content) */
    transition: opacity 0.3s ease; /* Transition for its appearance */
  }

  /* On card hover, the image and green mask appear */
  ${RecipeCard}:hover & {
    /* Background image appears */
    opacity: 0.4; /* Adjust image opacity on hover if needed */
    transform: scale(1.05); /* Image continues to zoom slightly */

    /* Green mask appears on top of the image */
    &::before {
      opacity: 0.6; /* Adjust this opacity for the intensity of the green veil */
    }
  }
`;

export const RecipeName = styled.h4`
  color: var(--soft-green-700);
  margin: 0 0 var(--space-2) 0;
  font-size: var(--text-xl);
`;

export const RecipeDescription = styled.p`
  color: var(--neutral-700);
  margin: 0;
  font-size: var(--text-base);
  line-height: 1.5;
`;

export const Tag = styled(motion.span)`
  background-color: ${props => props.$isCategory ? 'var(--soft-green-500)' : 'var(--soft-blue-500)'};
  color: var(--neutral-50);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  white-space: nowrap;
  display: inline-block;
  margin-right: var(--space-2);
  margin-bottom: var(--space-2);
`;

export const BlobBackground = styled(motion.img)`
  position: fixed; 
  top: 50%;
  left: 50%;
  width: 1200px; 
  height: 1200px;
  object-fit: cover;
  opacity: 0.05; 
  z-index: 0; 
  pointer-events: none;
  transform: translate(-50%, -50%) rotate(0deg);
`;