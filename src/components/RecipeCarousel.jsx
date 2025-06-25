import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Supposons que RecipeCard.jsx est votre composant de carte de recette existant
// Assurez-vous que le chemin d'importation est correct selon l'emplacement réel de votre RecipeCard
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
  background: var(--color-neutral-100);
  box-shadow: var(--shadow-lg);

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
  /* Pas de justify-content ici, c'est géré par les paddings des éléments */
  align-items: center;
  gap: var(--space-4); /* Espace entre les cartes */
  padding: 0 var(--space-6); /* Padding horizontal pour voir partiellement la carte suivante/précédente */

  /* Tablette */
  @media (max-width: 1024px) {
    gap: var(--space-3);
    padding: 0 var(--space-4);
  }

  /* Mobile */
  @media (max-width: 768px) {
    gap: var(--space-2);
    padding: 0 var(--space-3); /* Un padding plus serré sur mobile */
    /* Empêche les éléments de rétrécir */
    flex-shrink: 0;
  }
`;

const CarouselItemWrapper = styled(motion.div)`
  flex: 0 0 auto; /* Empêche la flexbox de redimensionner les éléments */
  /* Les dimensions de la carte sont gérées par RecipeCard.styles.js */
  /* Mais on peut contrôler la largeur de l'élément ici si besoin */
  width: calc((100% / 3) - (var(--space-4) * 2 / 3)); /* 3 cartes visibles sur desktop */

  /* Tablette */
  @media (max-width: 1024px) {
    width: calc((100% / 2) - (var(--space-3) / 2)); /* 2 cartes visibles sur tablette */
  }

  /* Mobile */
  @media (max-width: 768px) {
    width: 90%; /* 1 carte visible, occupe 90% de la largeur du CarouselInner */
    /* Gardez à l'esprit que la RecipeCard elle-même a ses min/max-width */
    /* Cette largeur s'applique au wrapper, la carte s'adaptera dedans */
  }
`;

const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--color-primary-500);
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
  opacity: 0.8;
  transition: opacity 0.2s ease, background 0.2s ease;

  &:hover {
    opacity: 1;
    background: var(--color-primary-600);
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: var(--color-neutral-400);
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
  background: ${({ active }) => (active ? 'var(--color-primary-500)' : 'var(--color-neutral-400)')};
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: var(--color-primary-600);
  }
`;

const NoRecipesMessage = styled(motion.div)`
  padding: var(--space-8);
  background: var(--color-neutral-0);
  border-radius: var(--radius-xl);
  text-align: center;
  color: var(--color-neutral-600);
  font-style: italic;
  font-size: var(--text-lg);
  box-shadow: var(--shadow-md);
  border: 2px dashed var(--color-neutral-300);
  margin: var(--space-8) auto;
  width: 80%;
  max-width: 600px; /* Limite la largeur du message */

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
  const carouselRef = useRef(null);

  // Détermine le nombre de cartes visibles en fonction de la largeur de l'écran
  const getItemsPerPage = () => {
    if (window.innerWidth <= 768) return 1; // Mobile
    if (window.innerWidth <= 1024) return 2; // Tablette
    return 3; // Desktop
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fonction de défilement pour les boutons
  const scroll = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex <= recipes.length - itemsPerPage) {
      setCurrentIndex(newIndex);
    } else if (newIndex < 0) { // Retour au début si on dépasse avant
        setCurrentIndex(0);
    } else if (newIndex > recipes.length - itemsPerPage) { // Aller à la fin si on dépasse après
        setCurrentIndex(recipes.length - itemsPerPage);
    }
  };

  // Logique pour le glissement (swipe) sur le carrousel
  const x = useRef(0);
  const constraintsRef = useRef(null); // Référence pour les contraintes de défilement

  // Calcul des contraintes de défilement
  useEffect(() => {
    if (carouselRef.current && carouselRef.current.children.length > 0) {
      const carouselWidth = carouselRef.current.offsetWidth;
      const totalContentWidth = carouselRef.current.scrollWidth;
      // La contrainte est la différence entre la largeur totale du contenu et la largeur visible
      // Multiplié par -1 car on défile de droite à gauche
      x.current = 0; // Réinitialiser x à chaque changement d'itemsPerPage ou de recettes
      setCurrentIndex(0); // Réinitialiser l'index
    }
  }, [itemsPerPage, recipes]);

  // Fonction pour gérer la fin du drag et snaper à la carte la plus proche
  const handleDragEnd = (event, info) => {
    const itemWidth = carouselRef.current.scrollWidth / recipes.length; // Largeur moyenne d'un élément
    const offset = Math.round(info.point.x / itemWidth); // Décalage basé sur la position du doigt
    
    // Calcul de l'index basé sur le glissement
    let newIndex = Math.round(-info.offset.x / itemWidth) + currentIndex;
    
    // S'assurer que le nouvel index reste dans les limites
    newIndex = Math.max(0, Math.min(newIndex, recipes.length - itemsPerPage));
    setCurrentIndex(newIndex);
  };
  
  // Variante pour l'animation des cartes (simple translation horizontale)
  const carouselVariants = {
    visible: (i) => ({
      x: - (currentIndex * (carouselRef.current ? carouselRef.current.offsetWidth / itemsPerPage : 0)), // Défilement basé sur l'index
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }),
  };

  // Adapter la translation x pour le carrouselInner
  const calculateXOffset = () => {
    if (!carouselRef.current || recipes.length === 0) return 0;
    // La largeur d'une carte + son gap
    const cardAndGapWidth = carouselRef.current.querySelector('.carousel-item').offsetWidth + parseFloat(getComputedStyle(carouselRef.current).gap);
    return -(currentIndex * cardAndGapWidth);
  };

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

  return (
    <CarouselContainer
      ref={constraintsRef} // Le conteneur pour les contraintes de glissement
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <CarouselInner
        ref={carouselRef}
        drag="x"
        dragConstraints={constraintsRef} // Limiter le drag au conteneur parent
        onDragEnd={handleDragEnd}
        animate={{ x: calculateXOffset() }} // Contrôler la position x
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ x: x }} // Lier la position de framer-motion à la ref x
      >
        {recipes.map((recipe) => (
          <CarouselItemWrapper 
            key={recipe._id}
            className="carousel-item" // Pour le ciblage dans calculateXOffset
            // Vous pouvez ajouter des animations ici si vous voulez un effet par carte
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <RecipeCard recipe={recipe} />
          </CarouselItemWrapper>
        ))}
      </CarouselInner>

      {/* Boutons de navigation */}
      {recipes.length > itemsPerPage && ( // Afficher les boutons seulement s'il y a plus de recettes que d'éléments affichés
        <>
          <NavButton 
            className="prev" 
            onClick={() => scroll(-1)} 
            disabled={currentIndex === 0}
            whileTap={{ scale: 0.9 }}
          >
            &larr;
          </NavButton>
          <NavButton 
            className="next" 
            onClick={() => scroll(1)} 
            disabled={currentIndex >= recipes.length - itemsPerPage}
            whileTap={{ scale: 0.9 }}
          >
            &rarr;
          </NavButton>
        </>
      )}

      {/* Points indicateurs (pour mobile/tablette si plus d'une "page" de cartes) */}
      {recipes.length > itemsPerPage && (
        <DotsContainer>
          {Array.from({ length: Math.ceil(recipes.length / itemsPerPage) }).map((_, index) => (
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