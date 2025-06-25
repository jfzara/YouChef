// src/pages/Accueil.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useHover } from '../contexts/HoverContext';

// --- Styled Components pour la Page d'Accueil ---

const AccueilContainer = styled(motion.div)`
  min-height: calc(100vh - var(--navbar-height, 80px));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Supprimez le padding horizontal direct ici pour éviter le débordement sur la page entière */
  padding: var(--space-8) 0; /* Garde le padding vertical, supprime l'horizontal ici */
  position: relative;
  overflow: hidden; /* Important pour masquer les débordements des éléments décoratifs */

  color: var(--color-neutral-800);
  text-align: center;
  background-color: var(--color-cream);

  @media (max-width: 880px) {
    padding-bottom: calc(var(--space-8) + 70px);
  }
`;

const BackgroundImageLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
`;

const ContentWrapper = styled.div`
  width: 100%; /* Utiliser 100% au lieu de min-width: 100vw */
  max-width: 1200px; /* Définissez une largeur maximale pour le contenu sur grand écran */
  padding: 0 var(--space-4); /* Appliquez le padding horizontal ici, à l'intérieur du wrapper */
  box-sizing: border-box; /* Assurez-vous que le padding est inclus dans la largeur */
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);

  @media (max-width: 480px) {
    padding: 0 var(--space-3); /* Ajustez le padding pour les écrans très petits si nécessaire */
  }
`;

const MainTitle = styled(motion.h1)`
  font-family: var(--font-family-heading);
  font-size: var(--text-6xl);
  color: var(--color-bright-pink-crayola);
  margin-bottom: var(--space-4);
  line-height: 1.1;
  text-shadow: 4px 4px 0px var(--color-salmon);

  @media (max-width: 1024px) {
    font-size: var(--text-5xl);
  }

  @media (max-width: 880px) {
    font-size: var(--text-4xl);
  }

  @media (max-width: 480px) {
    font-size: var(--text-3xl);
  }
`;

const Subtitle = styled(motion.p)`
  font-family: var(--font-family-sans);
  font-size: var(--text-2xl);
  color: var(--color-neutral-800);
  margin-bottom: var(--space-8);
  max-width: 700px;
  line-height: 1.6;

  @media (max-width: 880px) {
    font-size: var(--text-xl);
  }
`;

const CallToActionButton = styled(motion(Link))`
  background-color: var(--color-jasmine);
  color: var(--color-neutral-900);
  font-family: var(--font-family-sans);
  font-size: var(--text-xl);
  padding: var(--space-4) var(--space-8);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: background-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &:hover {
    background-color: var(--color-salmon);
    color: var(--color-neutral-0);
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  @media (max-width: 480px) {
    font-size: var(--text-lg);
    padding: var(--space-3) var(--space-6);
  }
`;

// --- Composant Page d'Accueil ---

const Accueil = () => {
  const { isNavbarHovered } = useHover();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
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
      <BackgroundImageLayer
        initial={{ opacity: 0 }}
        animate={{ opacity: isNavbarHovered ? 0.15 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <ContentWrapper>
        <MainTitle variants={itemVariants}>
          Votre Aventure Culinaire Commence Maintenant !
        </MainTitle>
        <Subtitle variants={itemVariants}>
          Oubliez la routine et laissez votre imagination gustative s'envoler. Des plats qui font pétiller les papilles, des idées folles pour la cuisine de tous les jours. Préparez-vous à croquer la vie !
        </Subtitle>
        <CallToActionButton
          to="/recettes"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -4, boxShadow: "var(--shadow-lg)" }}
          whileTap={{ scale: 0.95, y: 0, boxShadow: "var(--shadow-sm)" }}
        >
          Découvrir les Recettes
        </CallToActionButton>
      </ContentWrapper>
    </AccueilContainer>
  );
};

export default Accueil;