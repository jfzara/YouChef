

// src/pages/Accueil.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Importez la nouvelle image de fond
import WhiteBackground from '../assets/images/WhiteBackground.jpg'; // <-- Nouvelle image importée

// --- Styled Components pour la Page d'Accueil ---

const AccueilContainer = styled(motion.div)`
  min-height: 100vh; /* S'assure que le conteneur prend au moins toute la hauteur du viewport */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centre le contenu verticalement */
  align-items: center; /* Centre le contenu horizontalement */
  padding: var(--space-8) var(--space-4); /* Padding global */
  position: relative; /* Maintenu pour la flexibilité future, mais pas strict pour cette version */
  overflow: hidden; /* Au cas où l'image dépasse légèrement */

  /* Styles de la nouvelle image de fond */
  background-image: url(${WhiteBackground}); /* Utilise la nouvelle image importée */
  background-size: cover; /* L'image couvre toute la zone, quitte à être coupée */
  background-position: center center; /* Centre l'image de fond */
  background-repeat: no-repeat; /* Empêche l'image de se répéter */
  background-attachment: fixed; /* L'image reste fixe lors du défilement */
  
  /* Retrait de la superposition de couleur et du blend-mode */
  /* background-color: rgba(var(--soft-green-50-rgb), 0.7); */ 
  /* background-blend-mode: overlay; */

  /* Retrait du masque translucide (pseudo-élément ::before) et de ses z-index */
  /* &::before { ... } */
  /* & > * { ... } */

  color: var(--neutral-800); /* Couleur de texte par défaut. Peut-être ajustée si l'image est très claire. */
  text-align: center;

  /* Ajustement pour les écrans plus petits pour tenir compte de la navbar en bas */
  @media (max-width: 768px) {
    padding-bottom: calc(var(--space-8) + 70px); /* Ajoute de l'espace pour la navbar fixe du bas (70px de hauteur) */
    background-size: contain; /* Sur mobile, s'assurer que l'image est entièrement visible */
    background-position: bottom center; /* Positionner en bas pour ne pas cacher le contenu */
    /* background-color: rgba(var(--soft-green-50-rgb), 0.9); */ /* Retrait du fond sur mobile aussi */
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
  color: var(--neutral-700); /* Couleur par défaut, à vérifier avec la nouvelle image */
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