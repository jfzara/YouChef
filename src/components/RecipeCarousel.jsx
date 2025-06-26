import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

import RecipeCard from '../pages/Dashboard/RecipeCard';

// Vos keyframes existants
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// --- KEYFRAMES COPIÉS DE RECENTRECIPES.JSX ---
const bounceAndWiggle = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-3px) rotate(1deg); }
  50% { transform: translateY(0) rotate(-1deg); }
  75% { transform: translateY(-1px) rotate(0.5deg); }
`;

const glitchEffect = keyframes`
  0% { transform: scale(1.2) translateY(-10px) rotate(calc((Math.random() - 0.5) * -18deg)) translateX(0px); filter: hue-rotate(0deg); }
  20% { transform: scale(1.2) translateY(-10px) rotate(calc((Math.random() - 0.5) * -18deg)) translateX(3px) skewX(3deg); filter: hue-rotate(8deg); }
  40% { transform: scale(1.2) translateY(-10px) rotate(calc((Math.random() - 0.5) * -18deg)) translateX(-4px) skewX(-2deg); filter: hue-rotate(0deg); }
  60% { transform: scale(1.2) translateY(-10px) rotate(calc((Math.random() - 0.5) * -18deg)) translateX(2px) skewX(2deg); filter: hue-rotate(4deg); }
  80% { transform: scale(1.2) translateY(-10px) rotate(calc((Math.random() - 0.5) * -18deg)) translateX(-3px) skewX(-3deg); filter: hue-rotate(0deg); }
  100% { transform: scale(1.2) translateY(-10px) rotate(calc((Math.random() - 0.5) * -18deg)) translateX(0px); filter: hue-rotate(0deg); }
`;

const pulseBorder = keyframes`
  0% { border-color: var(--color-bright-pink-crayola); }
  50% { border-color: var(--color-dark-purple); } /* Assurez-vous que --color-dark-purple est défini dans GlobalStyles ou utilisez une autre couleur si non */
  100% { border-color: var(--color-bright-pink-crayola); }
`;

const hoverWiggle = keyframes`
  0%, 100% { transform: translateY(0) scale(1.1) rotate(0deg); }
  25% { transform: translateY(-5px) scale(1.2) rotate(3deg); }
  50% { transform: translateY(0) scale(1.1) rotate(-3deg); }
  75% { transform: translateY(-2px) scale(1.15) rotate(1deg); }
`;
// --- FIN KEYFRAMES COPIÉS ---


const NavButtonWrapper = styled.div`
  position: absolute;
  top: calc(50% - 2rem); /* Déplacé de 2rem vers le haut par rapport au centre */
  transform: translateY(-50%);
  z-index: 5;
  ${(props) => (props.direction === 'left' ? 'left: var(--space-4);' : 'right: var(--space-4);')}
`;

// --- NavButton MIS À JOUR AVEC LES STYLES DU ROLODEX ---
const NavButton = styled(motion.button)`
  background: var(--color-bright-pink-crayola);
  color: var(--color-neutral-0);
  border: 3px solid var(--color-bright-pink-crayola); /* Bordure prononcée */
  border-radius: var(--radius-full);
  width: 60px; /* Taille légèrement plus grande */
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--font-bold);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* Transition plus dynamique */
  transform: rotate(calc((Math.random() - 0.5) * 8deg)); /* Rotation initiale aléatoire */
  text-shadow: var(--shadow-text-sm);
  outline: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
  font-family: 'Comic Sans MS', cursive; /* Police marrante, ajustez si vous préférez Quicksand ici */

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--text-3xl); /* Taille des flèches plus grande */
    line-height: 1;
    position: relative;
    top: -3px; /* Ajustement visuel */
    z-index: 2;
    transform: translateY(-2px);
    transition: transform 0.2s ease-out;
  }

  span.occasional-wiggle {
    animation: ${bounceAndWiggle} 2s infinite ease-in-out;
  }

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
    background: var(--color-salmon); /* Couleur au survol */
    border-color: var(--color-bright-pink-crayola); /* Garde ou change la couleur de la bordure au survol */
    transform: scale(1.2) translateY(-10px) rotate(calc((Math.random() - 0.5) * -18deg)); /* Glitch et scale */
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
    animation: ${glitchEffect} 0.4s 1 alternate, ${pulseBorder} 1s 1 alternate; /* Animations combinées */
    
    span {
      animation: ${hoverWiggle} 0.8s 1 ease-in-out; /* Animation sur le contenu */
      transform: translateY(-2px) scale(1.1);
    }

    &::before {
      transform: translate(-50%, -50%) scale(2);
      opacity: 1;
    }
  }

  &:active {
    background: var(--color-bright-pink-crayola); /* Revient à la couleur de base au clic */
    transform: scale(0.85) translateY(2px) rotate(calc((Math.random() - 0.5) * 5deg)); /* Effet de clic enfoncé */
    box-shadow: var(--shadow-sm);
    animation: none; /* Désactive les animations de hover au clic */
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
// --- FIN NavButton MIS À JOUR ---


const CarouselContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: var(--space-8) auto;
  min-height: 500px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CarouselInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 500px;
`;

const cardVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    rotate: direction > 0 ? 5 : -5,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      rotate: { duration: 0.3 },
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    rotate: direction < 0 ? 5 : -5,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      rotate: { duration: 0.3 },
    },
  }),
};

const CarouselItemWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoRecipesMessage = styled(motion.div)`
  text-align: center;
  color: var(--color-neutral-600);
  font-size: var(--text-xl);
  padding: var(--space-8);
  border: 2px dashed var(--color-neutral-300);
  border-radius: var(--radius-lg);
  animation: ${fadeIn} 0.5s ease-out;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
`;

const NoRecipesEmoji = styled.span`
  font-size: var(--text-5xl);
`;

const DotsContainer = styled.div`
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-12); /* 4rem pour laisser suffisamment d'espace */
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? 'var(--color-primary-500)' : 'var(--color-neutral-400)')};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? 'var(--color-primary-600)' : 'var(--color-neutral-500)')};
  }
`;

// Ajout de la prop 'onViewRecipeDetails'
const RecipeCarousel = ({ recipes, onEditRecipe, onDeleteRecipe, onViewRecipeDetails }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [direction, setDirection] = useState(0);
  const [wiggleClass, setWiggleClass] = useState(''); // État pour l'animation occasionnelle

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) {
        nextIndex = recipes.length - 1;
      } else if (nextIndex >= recipes.length) {
        nextIndex = 0;
      }
      return nextIndex;
    });
    setWiggleClass(''); // Réinitialiser l'animation de "wiggle" à chaque changement
  }, [recipes.length]);

  const handleDragEnd = useCallback((event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -100 || velocity < -500) {
      paginate(1);
    } else if (offset > 100 || velocity > 500) {
      paginate(-1);
    }
  }, [paginate]);

  // Logique pour l'animation occasionnelle de "wiggle"
  useEffect(() => {
    let timer;
    // Appliquer occasionnellement l'animation seulement si plus d'une recette
    // pour éviter les conflits si la carte seule a déjà son propre wiggle
    if (recipes.length > 1) { // Appliquer le wiggle des boutons si plus d'une recette
      const startWiggleInterval = () => {
        setWiggleClass('occasional-wiggle');
        const wiggleTimeout = setTimeout(() => {
          setWiggleClass('');
        }, 2000); // Durée de l'animation wiggle

        const nextWiggleTime = 15000 + Math.random() * 5000; // 15-20 secondes
        return setTimeout(startWiggleInterval, nextWiggleTime);
      };

      timer = startWiggleInterval();
    } else {
      setWiggleClass(''); // S'assurer que la classe est retirée si moins de 2 recettes
    }
    
    // Nettoyage au démontage du composant
    return () => {
      clearTimeout(timer);
    };
  }, [recipes.length]);


  // Si aucune recette, affiche un message spécifique
  if (!recipes || recipes.length === 0) {
    return (
      <CarouselContainer>
        <NoRecipesMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <NoRecipesEmoji>😔</NoRecipesEmoji>
          <p>Vous n'avez pas encore de recettes.</p>
          <p>Cliquez sur "Ajouter une Nouvelle Recette" pour commencer à cuisiner !</p>
        </NoRecipesMessage>
      </CarouselContainer>
    );
  }

  return (
    <CarouselContainer
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <NavButtonWrapper direction="left">
        <NavButton
          onClick={() => paginate(-1)}
          direction="left"
          whileTap={{ scale: 0.9 }}
          aria-label="Recette précédente"
        >
          <span className={recipes.length > 1 ? wiggleClass : ''}>&larr;</span> {/* Applique la classe si plus d'une recette */}
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
              className={recipes.length === 1 ? wiggleClass : ''}
            >
              {/* IMPORTANT : Transmet les fonctions onEdit, onDelete ET onViewRecipeDetails au RecipeCard */}
              <RecipeCard
                recipe={recipes[currentIndex]}
                onEdit={onEditRecipe}
                onDelete={onDeleteRecipe}
                onCardClick={onViewRecipeDetails} // Nouvelle prop passée à RecipeCard
              />
            </CarouselItemWrapper>
          )}
        </AnimatePresence>
      </CarouselInner>

      <NavButtonWrapper direction="right">
        <NavButton
          onClick={() => paginate(1)}
          direction="right"
          whileTap={{ scale: 0.9 }}
          aria-label="Recette suivante"
        >
          <span className={recipes.length > 1 ? wiggleClass : ''}>&rarr;</span> {/* Applique la classe si plus d'une recette */}
        </NavButton>
      </NavButtonWrapper>

      {recipes.length > 1 && (
        <DotsContainer>
          {recipes.map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex}
              onClick={() => {
                const newDirection = index > currentIndex ? 1 : -1;
                setDirection(newDirection);
                setCurrentIndex(index);
              }}
              aria-label={`Aller à la recette ${index + 1}`}
            />
          ))}
        </DotsContainer>
      )}
    </CarouselContainer>
  );
};

export default RecipeCarousel;