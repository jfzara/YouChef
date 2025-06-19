D'accord, allons-y avec l'option du flou (blur()) sur l'image existante. C'est une solution rapide pour masquer la pixellisation et obtenir un effet plus abstrait, tout en utilisant une de vos images actuelles.

Nous allons appliquer le filtre blur() directement à l'image de fond via la propriété CSS filter. Il faudra probablement un blur assez prononcé pour effacer les détails des légumes.

Application du Filtre blur() à l'Image de Fond
Voici le code mis à jour pour votre page d'accueil (src/pages/Accueil.jsx). J'ai ciblé l'image Vegetables.jpg et ajouté la propriété filter: blur(). J'ai également ajusté légèrement le background-size pour compenser le flou, mais vous pourrez le modifier si besoin.

JavaScript

// src/pages/Accueil.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Importez l'image que vous souhaitez utiliser comme fond
import VegetablesBackground from '../assets/images/Vegetables.jpg';

// --- Styled Components pour la Page d'Accueil ---

const AccueilContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--space-8) var(--space-4);

  /* Mise à jour du fond pour inclure l'image et le filtre blur */
  background-image: url(${VegetablesBackground});
  background-size: 180%; /* Légèrement moins zoomé pour voir plus de l'effet flou */
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
  /* Applique le filtre de flou à l'image de fond */
  filter: blur(10px); /* <-- Applique un flou de 10 pixels */
  transform: scale(1.02); /* Compensateur de l'effet de rétrécissement du blur */

  /* Superposition de couleur pour la lisibilité et l'harmonisation */
  background-color: rgba(var(--soft-green-50-rgb), 0.7);
  background-blend-mode: overlay;

  /* Important: Le contenu doit être au-dessus du flou */
  /* Pour que le texte et les autres éléments ne soient pas flous, */
  /* nous devons les positionner au-dessus ou utiliser un pseudo-élément pour le fond. */
  /* Pour l'instant, le flou s'applique à tout le conteneur. */
  /* Si le texte devient flou, nous devrons restructurer AccueilContainer. */

  color: var(--neutral-800);
  text-align: center;

  @media (max-width: 768px) {
    padding-bottom: calc(var(--space-8) + 70px);
    background-size: 220%; /* Plus grand sur mobile */
    background-position: center bottom;
    background-color: rgba(var(--soft-green-50-rgb), 0.9);
    filter: blur(8px); /* Ajuster le flou pour mobile si nécessaire */
  }
`;

// IMPORTANT : Pour que le contenu (titre, sous-titre, bouton) ne soit PAS flou,
// nous devons créer un conteneur interne qui sera positionné AU-DESSUS du fond flou.
// Sinon, appliquer le filtre blur à AccueilContainer rendra TOUT flou.

const ContentWrapper = styled(motion.div)`
  position: relative; /* Pour s'assurer qu'il est au-dessus de l'arrière-plan flou */
  z-index: 1; /* Le place au-dessus du fond flou */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Assurez-vous que ce wrapper n'a pas son propre fond opaque */
`;

const MainTitle = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  color: var(--soft-green-800);
  margin-bottom: var(--space-4);
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: var(--text-4xl);
  }
`;

const Subtitle = styled(motion.p)`
  font-family: var(--font-body);
  font-size: var(--text-xl);
  color: var(--neutral-700);
  margin-bottom: var(--space-6);
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: var(--text-lg);
  }
`;

const CallToActionButton = styled(motion.button)`
  background-color: var(--soft-blue-500);
  color: var(--neutral-0);
  font-family: var(--font-body);
  font-size: var(--text-xl);
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: background-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);

  &:hover {
    background-color: var(--soft-blue-600);
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }
`;

// --- Composant Page d'Accueil ---

const Accueil = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <AccueilContainer> {/* Retirons les variants ici car le flou s'applique à tout */}
      {/* Nous animerons le ContentWrapper à la place */}
      <ContentWrapper
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MainTitle variants={itemVariants}>
          Cuisinez avec Joie,<br />Partagez avec Amour.
        </MainTitle>
        <Subtitle variants={itemVariants}>
          Des recettes simples et délicieuses pour inspirer vos aventures culinaires quotidiennes.
        </Subtitle>
        <motion.div variants={itemVariants}>
          <CallToActionButton
            onClick={() => { /* Logique pour naviguer vers les recettes ou une autre section */ }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Découvrir les Recettes
          </CallToActionButton>
        </motion.div>
      </ContentWrapper>
    </AccueilContainer>
  );
};

export default Accueil;