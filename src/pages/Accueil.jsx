// src/pages/Accueil.jsx
import React from 'react';
import styled from 'styled-components'; // Pas besoin d'importer 'css' ici sauf si vous l'utilisez spécifiquement
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Importez l'image de fond originale - Nous allons la styliser différemment.
import HerbsGarlicBackground from '../assets/images/HerbsGarlic.jpg'; 
// Vous avez aussi importé 'WhiteBackground' dans votre exemple précédent,
// mais 'HerbsGarlic.jpg' semble être celle que vous voulez utiliser comme image décorative.
// Si vous voulez un fond blanc pur comme base, cela sera géré par background-color.

// Importez le hook de contexte de survol
import { useHover } from '../contexts/HoverContext';

// --- Styled Components pour la Page d'Accueil ---

// Utilisation de motion.div comme base pour les animations du conteneur principal
const AccueilContainer = styled(motion.div)`
  min-height: calc(100vh - var(--navbar-height, 80px)); /* Ajuste à la hauteur de l'écran moins la navbar */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--space-8) var(--space-4);
  position: relative;
  overflow: hidden; /* Important pour masquer les débordements des éléments décoratifs */
  
  color: var(--color-neutral-800); /* Couleur de texte neutre */
  text-align: center;

  background-color: var(--color-cream); /* Utilisez la couleur crème comme fond de base */
  /* L'image decorative sera gérée par BackgroundImageLayer */

  @media (max-width: 768px) {
    padding-bottom: calc(var(--space-8) + 70px); /* Garde de l'espace pour un éventuel élément fixe en bas sur mobile */
  }
`;

// Ce composant affichera l'image de fond avec opacité
const BackgroundImageLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${HerbsGarlicBackground}); /* Utilisez votre image décorative ici */
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* L'image reste fixe au scroll, mais c'est une page unique */
  pointer-events: none; /* Important pour que le fond ne bloque pas les interactions */
  z-index: 0; /* Assurez-vous qu'il est en arrière-plan */
  opacity: 0; /* Commence invisible, sera animé */
`;

const ContentWrapper = styled.div`
  max-width: 900px; /* Augmenté pour un meilleur espacement */
  z-index: 1; /* Assurez-vous que le contenu est au-dessus des fonds */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6); /* Espacement entre les éléments de contenu */
`;

const MainTitle = styled(motion.h1)`
  font-family: var(--font-family-heading); /* Utilisez votre police "heading" (Cabin Sketch) */
  font-size: var(--text-6xl); /* Taille très grande pour un impact "quirky" */
  color: var(--color-bright-pink-crayola); /* Rose vif pour le titre principal */
  margin-bottom: var(--space-4);
  line-height: 1.1;
  text-shadow: 4px 4px 0px var(--color-salmon); /* Ombre décalée pour un effet amusant */

  @media (max-width: 1024px) {
    font-size: var(--text-5xl);
  }

  @media (max-width: 768px) {
    font-size: var(--text-4xl);
  }

  @media (max-width: 480px) {
    font-size: var(--text-3xl);
  }
`;

const Subtitle = styled(motion.p)`
  font-family: var(--font-family-sans); /* Utilisez votre police "sans" (Quicksand) */
  font-size: var(--text-2xl); /* Taille plus grande pour le sous-titre */
  color: var(--color-neutral-800); /* Couleur neutre foncée pour la lisibilité */
  margin-bottom: var(--space-8);
  max-width: 700px; /* Ajustez la largeur pour une meilleure lecture */
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: var(--text-xl);
  }
`;

const CallToActionButton = styled(motion(Link))` /* Utilisez motion(Link) pour les animations Framer Motion sur un Link */
  background-color: var(--color-jasmine); /* Couleur chaude et accueillante (Jaune) */
  color: var(--color-neutral-900); /* Texte foncé pour le contraste */
  font-family: var(--font-family-sans);
  font-size: var(--text-xl);
  padding: var(--space-4) var(--space-8); /* Padding généreux pour un bouton bien visible */
  border: none;
  border-radius: var(--radius-full); /* Bords très arrondis pour un look ludique */
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: background-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
  text-decoration: none; /* Enlève le soulignement du lien */
  display: inline-flex; /* Permet d'aligner le contenu si vous ajoutez une icône par exemple */
  align-items: center;
  justify-content: center;
  z-index: 1;

  &:hover {
    background-color: var(--color-salmon); /* Devient Saumon au survol */
    color: var(--color-neutral-0); /* Texte blanc au survol */
    transform: translateY(-4px); /* Soulève un peu plus pour un effet "flottant" */
    box-shadow: var(--shadow-lg); /* Ombre plus prononcée */
  }

  &:active {
    transform: translateY(0); /* Revient à sa position initiale au clic */
    box-shadow: var(--shadow-sm); /* Ombre plus légère au clic */
  }

  @media (max-width: 480px) {
    font-size: var(--text-lg);
    padding: var(--space-3) var(--space-6);
  }
`;

// --- Composant Page d'Accueil ---

const Accueil = () => {
  const { isNavbarHovered } = useHover(); // Lisez l'état du contexte pour l'animation de fond

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Légèrement réduit le stagger pour une apparition plus rapide
        delayChildren: 0.3 // Réduit le délai initial
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 }, // Part d'un peu plus bas
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120, // Plus rigide
        damping: 15 // Moins de rebond
      }
    }
  };

  return (
    <AccueilContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* L'image de fond s'anime en fonction du survol de la navbar */}
      <BackgroundImageLayer
        initial={{ opacity: 0 }}
        animate={{ opacity: isNavbarHovered ? 0.15 : 0 }} /* Opacité subtile (15%) si nav survolée, 0 sinon */
        transition={{ duration: 1.5, ease: "easeOut" }} /* Ralenti un peu la transition */
      />

      <ContentWrapper>
        <MainTitle variants={itemVariants}>
          Votre Aventure Culinaire Commence Maintenant !
        </MainTitle>
        <Subtitle variants={itemVariants}>
          Oubliez la routine et laissez votre imagination gustative s'envoler. Des plats qui font pétiller les papilles, des idées folles pour la cuisine de tous les jours. Préparez-vous à croquer la vie !
        </Subtitle>
        {/* Le bouton utilise motion(Link) pour les animations Framer Motion */}
        <CallToActionButton
          to="/recettes"
          variants={itemVariants} /* Utilise les mêmes variants pour l'apparition */
          whileHover={{ scale: 1.05, y: -4, boxShadow: "var(--shadow-lg)" }} /* Animations de survol */
          whileTap={{ scale: 0.95, y: 0, boxShadow: "var(--shadow-sm)" }} /* Animations de clic */
        >
          Découvrir les Recettes
        </CallToActionButton>
      </ContentWrapper>
    </AccueilContainer>
  );
};

export default Accueil;