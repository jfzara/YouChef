// src/pages/Accueil.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Styled Components pour la Page d'Accueil ---

const AccueilContainer = styled(motion.div)`
  min-height: 100vh; /* S'assure que le conteneur prend au moins toute la hauteur du viewport */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centre le contenu verticalement */
  align-items: center; /* Centre le contenu horizontalement */
  padding: var(--space-8) var(--space-4); /* Padding global */
  background: linear-gradient(135deg, var(--soft-green-50), var(--soft-blue-50)); /* Un fond dégradé très doux */
  color: var(--neutral-800); /* Couleur de texte par défaut */
  text-align: center; /* Centre le texte */

  /* Ajustement pour les écrans plus petits pour tenir compte de la navbar en bas */
  @media (max-width: 768px) {
    padding-bottom: calc(var(--space-8) + 70px); /* Ajoute de l'espace pour la navbar fixe du bas (70px de hauteur) */
  }
`;

const MainTitle = styled(motion.h1)`
  font-family: var(--font-display); /* Notre police fantaisiste */
  font-size: var(--text-5xl); /* Très grande taille pour le titre */
  color: var(--soft-green-800); /* Couleur d'accent pour le titre */
  margin-bottom: var(--space-4);
  line-height: 1.1; /* Réduit l'espace entre les lignes */

  @media (max-width: 768px) {
    font-size: var(--text-4xl); /* Plus petit sur mobile */
  }
`;

const Subtitle = styled(motion.p)`
  font-family: var(--font-body); /* Police de corps pour la lisibilité */
  font-size: var(--text-xl);
  color: var(--neutral-700);
  margin-bottom: var(--space-6);
  max-width: 800px; /* Limite la largeur du texte pour une meilleure lecture */

  @media (max-width: 768px) {
    font-size: var(--text-lg);
  }
`;

const CallToActionButton = styled(motion.button)`
  background-color: var(--soft-blue-500); /* Couleur vive pour le CTA */
  color: var(--neutral-0); /* Texte blanc */
  font-family: var(--font-body);
  font-size: var(--text-xl);
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-full); /* Bouton en forme de pilule */
  cursor: pointer;
  box-shadow: var(--shadow-md); /* Ombre douce */
  transition: background-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);

  &:hover {
    background-color: var(--soft-blue-600); /* Couleur plus foncée au survol */
    transform: translateY(-3px); /* Effet de léger soulèvement */
    box-shadow: var(--shadow-lg); /* Ombre plus prononcée */
  }

  &:active {
    transform: translateY(0); /* Retourne à la position initiale au clic */
    box-shadow: var(--shadow-sm); /* Ombre plus légère au clic */
  }
`;

// --- Composant Page d'Accueil ---

const Accueil = () => {
  // Variantes d'animation pour l'apparition des éléments
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Les enfants apparaissent un par un
        delayChildren: 0.5    // Délai avant que les enfants commencent à apparaître
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
          onClick={() => { /* Logique pour naviguer vers les recettes ou une autre section */ }}
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