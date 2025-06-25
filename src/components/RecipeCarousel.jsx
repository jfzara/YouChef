

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
  overflow: hidden; /* Cache les cartes en dehors de la vue */
  padding: var(--space-4) 0; /* Padding vertical pour le contenu */
  border-radius: var(--radius-xl);

  /* Glassmorphisme */
  background: rgba(255, 255, 255, 0.2); /* Fond blanc translucide */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Bordure légère */
  backdrop-filter: blur(10px); /* Effet de flou */
  -webkit-backdrop-filter: blur(10px); /* Pour Safari */
  box-shadow: var(--shadow-xl); /* Ombre plus prononcée pour l'effet de profondeur */

  /* Tablette */
  @media (max-width: 1024px) {
    max-width: 800px;
    padding: var(--space-3) 0;
  }

  /* Mobile */
  @media (max-width: 768px) {
    width: 95%; /* Prend plus de place sur mobile */
    max-width: unset; /* Supprime la limite max-width pour laisser le 95% s'appliquer */
    padding: var(--space-2) 0;
  }
`;

const CarouselInner = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--space-4); /* Espace entre les cartes */
  padding-left: var(--space-6); 
  padding-right: var(--space-6); 
  
  /* Tablette */
  @media (max-width: 1024px) {
    gap: var(--space-3);
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  }

  /* Mobile */
  @media (max-width: 768px) {
    gap: var(--space-2);
    padding-left: var(--space-3); 
    padding-right: var(--space-3); 
    flex-shrink: 0;
  }
`;

const CarouselItemWrapper = styled(motion.div)`
  flex: 0 0 auto; /* Empêche la flexbox de redimensionner les éléments */
  /* Ajustement de la largeur pour que les cartes soient entières et que les gaps soient inclus dans le calcul */
  width: calc((100% / var(--items-per-page)) - (var(--gap) * (var(--items-per-page) - 1) / var(--items-per-page)));

  /* Ces variables seront définies dynamiquement via CSS custom properties */
  --items-per-page: 3; /* Valeur par défaut */
  --gap: var(--space-4); /* Valeur par défaut */

  /* Tablette */
  @media (max-width: 1024px) {
    --items-per-page: 2;
    --gap: var(--space-3);
  }

  /* Mobile */
  @media (max-width: 768px) {
    --items-per-page: 1;
    --gap: var(--space-2);
    width: calc(100% - (var(--space-3) * 2)); /* Ajustement pour mobile pour occuper toute la largeur visible moins les paddings du CarouselInner */
  }
`;

const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* ✅ Couleur rose vif corrigée et appliquée */
  background: var(--color-bright-pink-crayola); 
  color: var(--color-neutral-0);
  border: none;
  border-radius: var(--radius-full);
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-2xl);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  z-index: 10;
  opacity: 0.9;
  transition: opacity 0.2s ease, background 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 1;
    /* J'ai utilisé une nuance légèrement plus foncée pour le hover. */
    /* Si vous préférez une couleur exacte de votre palette, ajoutez-la à GlobalStyles.js */
    background: #e04566; /* Un rose légèrement plus foncé pour le hover */
    transform: translateY(-50%) scale(1.05);
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    background: var(--color-neutral-400);
    transform: translateY(-50%) scale(1);
  }

  &.prev {
    left: var(--space-2);
  }
  &.next {
    right: var(--space-2);
  }

  /* Mobile: Plus petits boutons, positionnement ajusté */
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: var(--text-xl);
    &.prev {
      left: var(--space-1);
    }
    &.next {
      right: var(--space-1);
    }
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-4);

  /* Pas de points sur desktop si 3+ cartes sont toujours visibles */
  @media (min-width: 1025px) {
    display: none;
  }
`;

const Dot = styled(motion.div)`
  width: 10px;
  height: 10px;
  background: ${({ active }) => (active ? 'var(--color-bright-pink-crayola)' : 'var(--color-neutral-400)')};
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #e04566; /* Match le hover du bouton */
  }
`;

const NoRecipesMessage = styled(motion.div)`
  padding: var(--space-8);
  background: rgba(255, 255, 255, 0.4); /* Glassmorphisme aussi pour le message */
  border-radius: var(--radius-xl);
  text-align: center;
  color: var(--color-neutral-700);
  font-style: italic;
  font-size: var(--text-lg);
  box-shadow: var(--shadow-md);
  border: 1px dashed rgba(255, 255, 255, 0.5);
  margin: var(--space-8) auto;
  width: 80%;
  max-width: 600px; /* Limite la largeur du message */
  backdrop-filter: blur(5px);

  p {
    margin: 0;
  }

  /* Ajustements pour mobile */
  @media (max-width: 768px) {
    padding: var(--space-6);
    font-size: var(--text-base);
    width: 90%;
  }
`;

// --- Composant RecipeCarousel ---

const RecipeCarousel = ({ recipes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null); // Ref pour le CarouselInner
  const containerRef = useRef(null); // Ref pour le CarouselContainer pour les contraintes de drag

  // Détermine le nombre de cartes visibles en fonction de la largeur de l'écran
  const getItemsPerPage = useCallback(() => {
    if (window.innerWidth <= 768) return 1; // Mobile
    if (window.innerWidth <= 1024) return 2; // Tablette
    return 3; // Desktop
  }, []);

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  // Ref pour le contrôle du drag de Framer Motion
  // J'ai laissé cette ligne commentée dans le code précédent, elle doit être décommentée.
  const x = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      // Réinitialiser l'index à 0 lors du redimensionnement pour éviter les cartes partielles
      setCurrentIndex(0); 
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getItemsPerPage]);

  // Logique pour le défilement par "page" de cartes entières
  const scroll = (direction) => {
    const totalPages = Math.ceil(recipes.length / itemsPerPage);
    let currentPage = Math.floor(currentIndex / itemsPerPage);
    
    let newPageIndex = currentPage + direction;

    newPageIndex = Math.max(0, Math.min(newPageIndex, totalPages - 1));
    
    const newIndex = newPageIndex * itemsPerPage;
    
    setCurrentIndex(newIndex);
  };

  // Calcul de la translation X pour l'animation du carrousel
  const calculateXOffset = useCallback(() => {
    if (!carouselRef.current || recipes.length === 0) return 0;

    const firstItem = carouselRef.current.querySelector('.carousel-item');
    if (!firstItem) return 0;
    
    const cardWidth = firstItem.offsetWidth;
    const gap = parseFloat(getComputedStyle(carouselRef.current).gap);

    const offset = currentIndex * (cardWidth + gap);

    const totalContentWidth = recipes.length * (cardWidth + gap) - gap; 
    const visibleWidth = carouselRef.current.offsetWidth - parseFloat(getComputedStyle(carouselRef.current).paddingLeft) - parseFloat(getComputedStyle(carouselRef.current).paddingRight);
    
    if (totalContentWidth <= visibleWidth) {
        return 0;
    }

    const maxOffset = totalContentWidth - visibleWidth;
    return -Math.min(offset, maxOffset);

  }, [currentIndex, recipes.length]);

  // Logic for swipe (drag)
  const handleDragEnd = useCallback((event, info) => {
    if (!carouselRef.current || recipes.length === 0) return;

    const firstItem = carouselRef.current.querySelector('.carousel-item');
    if (!firstItem) return;

    const cardWidth = firstItem.offsetWidth;
    const gap = parseFloat(getComputedStyle(carouselRef.current).gap);
    const itemFullWidth = cardWidth + gap;

    const dragDistance = -info.offset.x; 

    const currentAbsoluteOffset = currentIndex * itemFullWidth;
    const newAbsoluteOffset = currentAbsoluteOffset + dragDistance;
    
    let newIndex = Math.round(newAbsoluteOffset / itemFullWidth);

    newIndex = Math.max(0, Math.min(newIndex, recipes.length - itemsPerPage));
    
    setCurrentIndex(newIndex);
  }, [currentIndex, recipes.length, itemsPerPage]);

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

  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  // Logique pour la visibilité des boutons
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < recipes.length - itemsPerPage;


  return (
    <CarouselContainer
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <CarouselInner
        ref={carouselRef}
        drag="x"
        dragConstraints={containerRef}
        onDragEnd={handleDragEnd}
        animate={{ x: calculateXOffset() }} 
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ x: x }} 
      >
        <AnimatePresence>
          {recipes.map((recipe) => (
            <CarouselItemWrapper 
              key={recipe._id}
              className="carousel-item"
            >
              <RecipeCard recipe={recipe} />
            </CarouselItemWrapper>
          ))}
        </AnimatePresence>
      </CarouselInner>

      {/* Boutons de navigation - Visibilité conditionnelle */}
      {totalPages > 1 && canScrollLeft && (
        <NavButton 
          className="prev" 
          onClick={() => scroll(-1)} 
          whileTap={{ scale: 0.9 }}
        >
          &larr;
        </NavButton>
      )}
      {totalPages > 1 && canScrollRight && (
        <NavButton 
          className="next" 
          onClick={() => scroll(1)} 
          whileTap={{ scale: 0.9 }}
        >
          &rarr;
        </NavButton>
      )}

      {/* Points indicateurs (pour mobile/tablette si plus d'une "page" de cartes) */}
      {totalPages > 1 && (
        <DotsContainer>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Dot
              key={index}
              active={index === Math.floor(currentIndex / itemsPerPage)}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </DotsContainer>
      )}
    </CarouselContainer>
  );
};

export default RecipeCarousel;