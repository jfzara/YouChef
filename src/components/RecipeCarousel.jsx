import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components'; // Importez keyframes de styled-components !

import RecipeCard from '../pages/Dashboard/RecipeCard'; // Assurez-vous que RecipeCard est bien ce que vous voulez afficher

// --- Keyframes pour les animations des boutons ---
// AUCUN MATH.RANDOM() DANS LES DÉFINITIONS KEYFRAMES pour éviter le TypeError !
const bounceAndWiggle = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-3px) rotate(1deg); }
  50% { transform: translateY(0) rotate(-1deg); }
  75% { transform: translateY(-1px) rotate(0.5deg); }
`;

// Valeurs fixes pour le glitch, pas de Math.random() ici.
const glitchEffect = keyframes`
  0% { transform: scale(1.2) translateY(-10px) rotate(0deg) translateX(0px); filter: hue-rotate(0deg); }
  20% { transform: scale(1.2) translateY(-10px) rotate(3deg) translateX(3px) skewX(3deg); filter: hue-rotate(8deg); }
  40% { transform: scale(1.2) translateY(-10px) rotate(-2deg) translateX(-4px) skewX(-2deg); filter: hue-rotate(0deg); }
  60% { transform: scale(1.2) translateY(-10px) rotate(1deg) translateX(2px) skewX(2deg); filter: hue-rotate(4deg); }
  80% { transform: scale(1.2) translateY(-10px) rotate(-3deg) translateX(-3px) skewX(-3deg); filter: hue-rotate(0deg); }
  100% { transform: scale(1.2) translateY(-10px) rotate(0deg) translateX(0px); filter: hue-rotate(0deg); }
`;

const pulseBorder = keyframes`
  0% { border-color: var(--color-bright-pink-crayola); }
  50% { border-color: var(--color-dark-purple); }
  100% { border-color: var(--color-bright-pink-crayola); }
`;

const hoverWiggle = keyframes`
  0%, 100% { transform: translateY(0) scale(1.1) rotate(0deg); }
  25% { transform: translateY(-5px) scale(1.2) rotate(3deg); }
  50% { transform: translateY(0) scale(1.1) rotate(-3deg); }
  75% { transform: translateY(-2px) scale(1.15) rotate(1deg); }
`;

// --- Styles pour le Carrousel ---

const CarouselContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto;
  overflow: hidden; 
  padding: var(--space-3) 0; 
  
  border-radius: var(--radius-xl);
  background: rgba(255, 255, 255, 0.2); 
  border: 1px solid rgba(255, 255, 255, 0.3); 
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
  box-shadow: var(--shadow-xl); 

  display: grid;
  grid-template-columns: var(--button-column-width) 1fr var(--button-column-width); 
  gap: 0; 
  align-items: stretch; 
  justify-content: center; 

  @media (max-width: 1024px) {
    max-width: 800px;
    padding: var(--space-2) 0;
  }

  @media (max-width: 880px) {
    width: 95%; 
    max-width: unset; 
    padding: var(--space-2) 0;
    grid-template-columns: 1fr; 
  }
`;

// --- Definition du NavButton directement dans ce fichier ---
const NavButton = styled(motion.button)`
  background: var(--color-bright-pink-crayola);
  color: var(--color-neutral-0);
  border: 3px solid var(--color-bright-pink-crayola);
  border-radius: var(--radius-full);
  width: 60px; 
  height: 60px; 
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--font-bold);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  /* Rotation aléatoire initiale du bouton (ok ici car évalué une fois) */
  transform: rotate(${(Math.random() - 0.5) * 8}deg); 
  text-shadow: var(--shadow-text-sm);
  outline: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
  font-family: 'Comic Sans MS', cursive;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--text-3xl); 
    line-height: 1;
    position: relative;
    top: -3px;
    z-index: 2;
    transform: translateY(-2px);
    transition: transform 0.2s ease-out;
  }

  /* La classe occasional-wiggle est commentée/retirée des spans dans le JSX */
  /* span.occasional-wiggle {
    animation: ${bounceAndWiggle} 2s infinite ease-in-out;
  } */

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0%;
    height: 0%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.4s ease-out, opacity 0.4s ease-out;
    opacity: 0;
    z-index: -1;
  }

  &:hover {
    background: var(--color-salmon);
    border-color: var(--color-bright-pink-crayola);
    /* Rotation aléatoire au survol (ok ici car évalué à chaque hover) */
   
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
    animation:  ${pulseBorder} 1s 1 alternate;
    
    span {
      animation: ${hoverWiggle} 0.8s 1 ease-in-out;
      transform: translateY(-2px) scale(1.1);
    }

    &::before {
      transform: translate(-50%, -50%) scale(2);
      opacity: 1;
    }
  }

  &:active {
    background: var(--color-bright-pink-crayola);
    /* Rotation aléatoire au clic (ok ici car évalué à chaque active) */
    transform: scale(0.85) translateY(2px) rotate(${(Math.random() - 0.5) * 5}deg);
    box-shadow: var(--shadow-sm);
    animation: none;
  }

  &:disabled {
    background: var(--color-neutral-300);
    color: var(--color-neutral-500);
    border-color: var(--color-neutral-400);
    cursor: not-allowed;
    box-shadow: var(--shadow-sm);
    transform: none;
    animation: none;
    pointer-events: none;
    opacity: 0.7;
    
    span {
      animation: none;
      transform: translateY(-2px);
    }
  }
`;

const NavButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 100%; 

  background: rgba(255, 255, 255, 0.2); 
  border: 1px solid rgba(255, 255, 255, 0.3); 
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
  box-shadow: var(--shadow-xl); 

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
  position: relative; /* Important pour positionner les cartes absolument */
  width: 100%; 
  min-height: 47vh; 
  display: flex; /* Utilisez flexbox pour le centrage si nécessaire, mais absolute prend le dessus */
  justify-content: center;
  align-items: center;
  padding: 1rem; 
  overflow: hidden; 

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
  position: absolute; /* Permet aux cartes de se superposer pour l'animation */
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
  // [wiggleClass, setWiggleClass] est maintenu pour le cas où vous le réactiveriez plus tard
  // mais il n'est plus utilisé dans le JSX des NavButton.
  const [wiggleClass, setWiggleClass] = useState(''); 

  // Effet pour déclencher le "wiggle" occasionnel sur les boutons (logique maintenue au cas où)
  useEffect(() => {
    // Cette fonction ne sera plus appelée si occasional-wiggle n'est pas utilisé dans le JSX
    const startWiggleInterval = () => {
      setWiggleClass('occasional-wiggle');
      const wiggleTimeout = setTimeout(() => {
        setWiggleClass('');
      }, 2000); 

      const nextWiggleTime = 10000 + Math.random() * 5000; 
      return setTimeout(startWiggleInterval, nextWiggleTime);
    };

    let intervalId = startWiggleInterval();

    return () => {
      clearTimeout(intervalId);
    };
  }, []); 

  // --- Variants pour l'animation d'entrée/sortie des cartes (du Rolodex) ---
  const cardVariants = {
    enter: (direction) => ({
      opacity: 0,
      rotateY: direction > 0 ? 90 : -90, 
      scale: 0.8,
      x: direction > 0 ? 200 : -200, 
    }),
    center: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      x: 0,
      transition: {
        type: "spring", 
        stiffness: 200,
        damping: 15
      }
    },
    exit: (direction) => ({
      opacity: 0,
      rotateY: direction > 0 ? -90 : 90, 
      scale: 0.8,
      x: direction > 0 ? -200 : 200, 
      transition: {
        type: "spring", 
        stiffness: 200,
        damping: 15
      }
    })
  };

  const calculateLayout = useCallback(() => {
    if (!containerRef.current) return;

    let targetCardWidthVW; 
    let buttonColumnWidth;

    if (window.innerWidth <= 880) { 
      targetCardWidthVW = 75; 
      buttonColumnWidth = 0; 
    } else if (window.innerWidth <= 1024) { 
      targetCardWidthVW = 35; 
      buttonColumnWidth = 100; 
    } else { 
      targetCardWidthVW = 25; 
      buttonColumnWidth = 120; 
    }

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

    if (totalItems === 0) return; 

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
        <NavButton onClick={() => scroll(-1)} whileTap={{ scale: 0.85 }}>
          {/* Supprimé : className={wiggleClass} */}
          <span>&larr;</span>
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
              drag="x" 
              onDragEnd={handleDragEnd} 
              dragConstraints={{ left: 0, right: 0 }} 
            >
              <RecipeCard recipe={recipes[currentIndex]} />
            </CarouselItemWrapper>
          )}
        </AnimatePresence>
      </CarouselInner>

      <NavButtonWrapper className="right">
        <NavButton onClick={() => scroll(1)} whileTap={{ scale: 0.85 }}>
          {/* Supprimé : className={wiggleClass} */}
          <span>&rarr;</span>
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