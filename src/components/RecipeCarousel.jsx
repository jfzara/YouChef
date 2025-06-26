import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

import RecipeCard from '../pages/Dashboard/RecipeCard';

// --- Styles pour le Carrousel ---

const CarouselContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 1200px; /* Largeur maximale pour le desktop */
  margin: 0 auto;
  overflow: hidden; /* Important pour cacher les cartes en dehors de la vue */

  
  border-radius: var(--radius-xl);

  /* Glassmorphisme général pour le conteneur principal */
  background: rgba(255, 255, 255, 0.2); 
  border: 1px solid rgba(255, 255, 255, 0.3); 
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
  box-shadow: var(--shadow-xl); 

  /* Nouvelle structure en grille à 3 colonnes */
  display: grid;
  grid-template-columns: var(--button-column-width) 1fr var(--button-column-width); 
  gap: 0; 
  align-items: stretch; 
  justify-content: center; 

  /* Tablette */
  @media (max-width: 1024px) {
    max-width: 800px;
    padding: var(--space-2) 0; /* Réduit le padding vertical pour tablette */
  }

  /* Mobile: une seule colonne, les boutons sont cachés */
  @media (max-width: 880px) {
    width: 95%; 
    max-width: unset; 
    padding: var(--space-2) 0;
    grid-template-columns: 1fr; 
  }
`;

const NavButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem; /* Réduit le padding interne des wrappers de boutons */
  height: 100%; 

  background: rgba(255, 255, 255, 0.2); 
  border: 1px solid rgba(255, 255, 255, 0.3); 
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
  box-shadow: var(--shadow-xl); 

  /* Styles de bordure pour les coins du conteneur principal */
  &.left {
    border-right: none; 
    border-top-left-radius: var(--radius-xl);
    border-bottom-left-radius: var(--radius-xl);
  }

  &.right {
    border-left: none; 
    border-top-right-radius: var(--radius-xl);
    border-bottom-right-radius: var(--radius-xl);
  }

  @media (max-width: 880px) {
    display: none; 
  }
`;

const CarouselInner = styled.div`
  display: flex; 
  justify-content: center; 
  align-items: center;
  padding: 1rem; /* Réduit le padding interne de la zone de la carte */
  overflow: hidden; 
  width: 100%; 
  min-height: 47vh; 

@media (max-width: 880px){
   min-height: 31vh; 
}


`;

const CarouselItemWrapper = styled(motion.div)`
  flex: 0 0 auto; 
  width: 100%; 
  max-width: var(--card-actual-width); 
  filter: none; 
  display: flex;
  justify-content: center;
  align-items: center;
  /* Assure que la carte ne se décale pas si son opacité est 0 */
  position: absolute; 
`;

const NavButton = styled(motion.button)`
  margin: 5px; 
  background: var(--color-bright-pink-crayola); 
  color: var(--color-neutral-0);
  border: none;
  border-radius: var(--radius-full); 
  width: 50px;
  height: 50px; 
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px; 

  font-size: var(--text-2xl);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  z-index: 10;
  opacity: 1; 
  transition: opacity 0.2s ease, background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #e04566; 
    transform: scale(1.05); 
  }
`;

const DotsContainer = styled.div`
  grid-column: 1 / -1; 
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
`;

const Dot = styled(motion.div)`
  width: 10px;
  height: 10px;
  background: ${({ active }) => (active ? 'var(--color-bright-pink-crayola)' : 'var(--color-neutral-400)')};
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #e04566; 
  }
`;

const NoRecipesMessage = styled(motion.div)`
  grid-column: 1 / -1; 
  padding: var(--space-8);
  background: rgba(255, 255, 255, 0.4); 
  border-radius: var(--radius-xl);
  text-align: center;
  color: var(--color-neutral-700);
  font-style: italic;
  font-size: var(--text-lg);
  box-shadow: var(--shadow-md);
  border: 1px dashed rgba(255, 255, 255, 0.5);
  margin: var(--space-8) auto;
  width: 80%;
  max-width: 600px; 
  backdrop-filter: blur(5px);

  p {
    margin: 0;
  }

  @media (max-width: 880px) {
    padding: var(--space-6);
    font-size: var(--text-base);
    width: 90%;
  }
`;

// --- Composant RecipeCarousel ---

const RecipeCarousel = ({ recipes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null); 
  const [direction, setDirection] = useState(0); 

  // Variants pour l'animation d'entrée/sortie des cartes - SEULEMENT OPACITÉ (Fondu)
  const cardVariants = {
    // La carte "entre" en fondu
    enter: {
      opacity: 0,
    },
    // La carte est au centre de l'écran
    center: {
      opacity: 1,
      transition: {
        type: "tween", 
        duration: 0.3, 
        ease: "easeOut", 
      }
    },
    // La carte "sort" en fondu
    exit: {
      opacity: 0,
      transition: {
        type: "tween", 
        duration: 0.3, 
        ease: "easeIn", 
      }
    }
  };

  const calculateLayout = useCallback(() => {
    if (!containerRef.current) return;

    // Utilisation de vw pour la largeur de la carte
    let targetCardWidthVW; 
    let buttonColumnWidth;

    if (window.innerWidth <= 880) { // Mobile
      targetCardWidthVW = 75; // 75% de la largeur du viewport pour mobile
      buttonColumnWidth = 0; 
    } else if (window.innerWidth <= 1024) { // Tablette
      targetCardWidthVW = 35; // 35% de la largeur du viewport pour tablette
      buttonColumnWidth = 100; 
    } else { // Desktop
      targetCardWidthVW = 25; // 25% de la largeur du viewport pour desktop
      buttonColumnWidth = 120; 
    }

    // Convertir vw en une chaîne CSS valide
    containerRef.current.style.setProperty('--card-actual-width', `${targetCardWidthVW}vw`);
    containerRef.current.style.setProperty('--button-column-width', `${buttonColumnWidth}px`);

  }, []);

  useEffect(() => {
    const handleResize = () => {
      calculateLayout();
    };

    window.addEventListener('resize', handleResize);
    calculateLayout(); 

    return () => window.removeEventListener('resize', handleResize);
  }, [calculateLayout]);

  const scroll = (newDirection) => {
    const totalItems = recipes.length;
    let newIndex = currentIndex + newDirection;

    if (newIndex < 0) {
      newIndex = totalItems - 1; 
    } else if (newIndex >= totalItems) {
      newIndex = 0; 
    }
    
    setDirection(newDirection); 
    setCurrentIndex(newIndex);
  };

  const handleDragEnd = useCallback((event, info) => {
    if (recipes.length === 0) return;

    const dragThreshold = 70; 

    if (info.offset.x > dragThreshold) {
      scroll(-1); 
    } else if (info.offset.x < -dragThreshold) {
      scroll(1); 
    }
  }, [recipes.length, scroll]);


  if (recipes.length === 0) {
    return (
      <NoRecipesMessage
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p>Vous n'avez pas encore de recettes ? <br/> C'est le moment de laisser parler le chef qui sommeille en vous ! 🍳</p>
      </NoRecipesMessage>
    );
  }

  const totalItems = recipes.length; 

  return (
    <CarouselContainer
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <NavButtonWrapper className="left">
        <NavButton 
          onClick={() => scroll(-1)} 
          whileTap={{ scale: 0.9 }}
        >
          &larr;
        </NavButton>
      </NavButtonWrapper>

      <CarouselInner>
        <AnimatePresence initial={false} custom={direction}> 
          {recipes[currentIndex] && ( 
            <CarouselItemWrapper 
              key={recipes[currentIndex]._id} 
              custom={direction} 
              variants={cardVariants} 
              initial="enter" 
              animate="center" 
              exit="exit" 
              // drag="x"  
              // dragConstraints={{ left: 0, right: 0 }} 
              // onDragEnd={handleDragEnd} 
              dragElastic={0.5} 
            >
              <RecipeCard recipe={recipes[currentIndex]} />
            </CarouselItemWrapper>
          )}
        </AnimatePresence>
      </CarouselInner>

      <NavButtonWrapper className="right">
        <NavButton 
          onClick={() => scroll(1)} 
          whileTap={{ scale: 0.9 }}
        >
          &rarr;
        </NavButton>
      </NavButtonWrapper>

      {totalItems > 1 && (
        <DotsContainer>
          {Array.from({ length: totalItems }).map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex} 
              onClick={() => {
                const newDirection = index > currentIndex ? 1 : -1;
                setDirection(newDirection);
                setCurrentIndex(index);
              }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </DotsContainer>
      )}
    </CarouselContainer>
  );
};

export default RecipeCarousel;