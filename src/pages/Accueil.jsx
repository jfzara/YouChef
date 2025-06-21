import React from 'react';
import styled, { css } from 'styled-components'; // Importez 'css' de styled-components
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Importez l'image de fond originale
import WhiteBackground from '../assets/images/WhiteBackground.jpg'; 

// Importez le hook de contexte de survol
import { useHover } from '../contexts/HoverContext';

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
  
  color: var(--neutral-800);
  text-align: center;

  /* Par défaut, un fond blanc pur */
  background-color: white; 
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  @media (max-width: 768px) {
    padding-bottom: calc(var(--space-8) + 70px);
  }
`;

// Ce composant affichera l'image de fond avec opacité
const BackgroundImageLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${WhiteBackground}); /* Utilisez l'image WhiteBackground.jpg ici */
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  pointer-events: none; /* Important pour que le fond ne bloque pas les interactions */
  z-index: 0; /* Assurez-vous qu'il est en arrière-plan */
`;


const MainTitle = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  color: var(--soft-green-800);
  margin-bottom: var(--space-4);
  line-height: 1.1;
  z-index: 1; /* Assurez-vous que le texte est au-dessus des fonds */

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
  z-index: 1; /* Assurez-vous que le texte est au-dessus des fonds */

  @media (max-width: 768px) {
    font-size: var(--text-lg);
  }
`;

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
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Assurez-vous que le bouton est au-dessus des fonds */

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
  const { isNavbarHovered } = useHover(); // Lisez l'état du contexte

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
      {/* L'image de fond apparaît ou disparaît par-dessus le fond blanc */}
      <BackgroundImageLayer
        initial={{ opacity: 0 }} // Commence invisible
        animate={{ opacity: isNavbarHovered ? 1 : 0 }} // Opacité 1 si survolé, 0 sinon
        transition={{ duration: 2, ease: "easeOut" }} // Durée de 1.5s pour le fade-in/out
      />

      <MainTitle variants={itemVariants}>
        Cuisinez avec Joie,<br />Partagez avec Amour.
      </MainTitle>
      <Subtitle variants={itemVariants}>
        Des recettes simples et délicieuses pour inspirer vos aventures culinaires quotidiennes.
      </Subtitle>
      <motion.div variants={itemVariants}>
        <CallToActionButton
          to="/recettes"
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