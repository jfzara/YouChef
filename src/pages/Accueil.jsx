

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Importez Link

// Importez la nouvelle image de fond
import WhiteBackground from '../assets/images/WhiteBackground.jpg'; // <-- Nouvelle image importée

// --- Styled Components pour la Page d'Accueil ---

const AccueilContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--space-8) var(--space-4);
  position: relative;
  overflow: hidden;

  background-image: url(${WhiteBackground});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
  color: var(--neutral-800);
  text-align: center;

  @media (max-width: 768px) {
    padding-bottom: calc(var(--space-8) + 70px);
    background-size: contain;
    background-position: bottom center;
  }
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

// Réutilisation du styled component pour le bouton de lien
const CallToActionButton = styled(Link)`
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
  text-decoration: none; /* Important pour les liens */
  display: inline-flex; /* Pour un bon centrage du texte et alignement */
  align-items: center;
  justify-content: center;

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
    <AccueilContainer
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
          to="/recettes" // Redirige vers la page /recettes
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Découvrir les Recettes
        </CallToActionButton>
      </motion.div>
    </AccueilContainer>
  );
};

export default Accueil;