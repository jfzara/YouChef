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
  padding-top: var(--space-4); /* Padding vertical pour le contenu */
  padding-bottom: var(--space-4);
  
  /* Les paddings latéraux seront calculés dynamiquement */
  
  border-radius: var(--radius-xl);

  /* Glassmorphisme général pour le conteneur principal */
  background: rgba(255, 255, 255, 0.2); 
  border: 1px solid rgba(255, 255, 255, 0.3); 
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
  box-shadow: var(--shadow-xl); 

  /* Tablette */
  @media (max-width: 1024px) {
    max-width: 800px;
    padding-top: var(--space-3);
    padding-bottom: var(--space-3);
  }

  /* Mobile */
  @media (max-width: 768px) {
    width: 95%; 
    max-width: unset; 
    padding-top: var(--space-2);
    padding-bottom: var(--space-2);
  }
`;

// Styles pour les wrappers de boutons glassmorphiques
const NavButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  /* ✅ Utilisation d'une variable CSS pour la largeur qui sera calculée dynamiquement */
  width: var(--side-cover-width, 25%); /* Une portion de la largeur du CarouselContainer */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15; 

  /* Réplication du glassmorphisme du CarouselContainer */
  background: rgba(255, 255, 255, 0.2); 
  border: 1px solid rgba(255, 255, 255, 0.3); 
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
  box-shadow: var(--shadow-xl); 

  /* Styles spécifiques pour le wrapper de gauche */
  &.left {
    left: 0;
    border-top-left-radius: var(--radius-xl);
    border-bottom-left-radius: var(--radius-xl);
    border-right: none; 
  }

  /* Styles spécifiques pour le wrapper de droite */
  &.right {
    right: 0;
    border-top-right-radius: var(--radius-xl);
    border-bottom-right-radius: var(--radius-xl);
    border-left: none; 
  }
`;


const CarouselInner = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--space-4); /* Espace entre les cartes */
  
  /* Tablette */
  @media (max-width: 1024px) {
    gap: var(--space-3);
  }

  /* Mobile */
  @media (max-width: 768px) {
    gap: var(--space-2);
    flex-shrink: 0;
  }
`;

const CarouselItemWrapper = styled(motion.div)`
  flex: 0 0 auto; 
  /* ✅ Toujours 1 seule carte entièrement visible, donc items-per-page est 1 */
  --items-per-page: 1; 
  --gap: var(--space-4); 

  /* La largeur de la carte est 100% de l'espace disponible entre les wrappers. */
  /* La largeur réelle sera ajustée par le JS pour s'assurer qu'elle soit parfaite. */
  width: var(--card-display-width);

  /* Tablette */
  @media (max-width: 1024px) {
    --gap: var(--space-3);
    width: var(--card-display-width-tablet);
  }

  /* Mobile */
  @media (max-width: 768px) {
    --gap: var(--space-2);
    width: var(--card-display-width-mobile);
  }
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
  padding-bottom: 2px; /* Pousse le contenu (flèche) de 2px vers le bas pour le remonter visuellement */

  font-size: var(--text-2xl);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  z-index: 10;
  /* ✅ Ne pas modifier l'opacité ni la couleur pour l'état désactivé */
  opacity: 1; /* Toujours visible */
  transition: opacity 0.2s ease, background 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 1;
    background: #e04566; 
    transform: scale(1.05); 
  }
  /* ✅ Suppression du style &:disabled pour garder la couleur rose vif */
  /* Nous pourrions ajouter un effet visuel subtil si on le souhaite, comme une ombre */
  /* ou une bordure, mais pas un changement de couleur ou d'opacité drastique. */
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-4);

  /* ✅ Toujours afficher les dots si plus d'une carte existe */
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
  const containerRef = useRef(null); 
  // Nous allons calculer dynamiquement la largeur d'une carte entièrement visible
  const [cardDisplayWidth, setCardDisplayWidth] = useState('0px'); 
  const [sideCoverWidth, setSideCoverWidth] = useState('0px');


  const getItemsPerPage = useCallback(() => {
    return 1; // Toujours une seule carte entièrement visible
  }, []);

  const [itemsPerPage] = useState(getItemsPerPage()); // itemsPerPage est toujours 1
  const x = useRef(0); 

  useEffect(() => {
    const calculateLayout = () => {
      if (!containerRef.current || !carouselRef.current) return;

      const totalContainerWidth = containerRef.current.offsetWidth;
      const gap = parseFloat(getComputedStyle(carouselRef.current).gap); // Gap entre les cartes

      // Largeur de la carte centrale visible (par exemple, 60% de la largeur du CarouselInner)
      // Ajustez cette valeur si vous voulez une carte plus ou moins grande au centre
      let centralCardPercentage = 0.6; // 60% de la largeur de la zone défilante
      if (window.innerWidth <= 1024) centralCardPercentage = 0.7; // 70% sur tablette
      if (window.innerWidth <= 768) centralCardPercentage = 0.8; // 80% sur mobile

      // La largeur de la zone défilante (CarouselInner) est la largeur du CarouselContainer moins le padding latéral
      const carouselInnerVisibleWidth = totalContainerWidth - (parseFloat(getComputedStyle(containerRef.current).paddingLeft) * 2);

      const calculatedCardDisplayWidth = carouselInnerVisibleWidth * centralCardPercentage;
      setCardDisplayWidth(`${calculatedCardDisplayWidth}px`);

      // La largeur du recouvrement latéral est le reste de l'espace divisé par 2
      const calculatedSideCoverWidth = (totalContainerWidth - calculatedCardDisplayWidth - (gap * (itemsPerPage -1))) / 2;
      setSideCoverWidth(`${calculatedSideCoverWidth}px`);

      // Ajuster le padding du CarouselContainer dynamiquement pour s'adapter à la largeur calculée
      containerRef.current.style.paddingLeft = `${calculatedSideCoverWidth}px`;
      containerRef.current.style.paddingRight = `${calculatedSideCoverWidth}px`;

      // Mettre à jour la variable CSS pour CarouselItemWrapper
      carouselRef.current.style.setProperty('--card-display-width', `${calculatedCardDisplayWidth}px`);
      // Pour les media queries
      carouselRef.current.style.setProperty('--card-display-width-tablet', `${carouselInnerVisibleWidth * 0.7}px`);
      carouselRef.current.style.setProperty('--card-display-width-mobile', `${carouselInnerVisibleWidth * 0.8}px`);


      // Assurez-vous que l'index actuel est valide après redimensionnement
      setCurrentIndex(prevIndex => Math.min(prevIndex, recipes.length - itemsPerPage));
    };

    const handleResize = () => {
      calculateLayout();
    };

    window.addEventListener('resize', handleResize);
    calculateLayout(); // Calculer au montage initial et après chaque redimensionnement

    return () => window.removeEventListener('resize', handleResize);
  }, [recipes.length, itemsPerPage]);


  const scroll = (direction) => {
    const totalPages = recipes.length; // Chaque carte est une "page" maintenant
    let newIndex = currentIndex + direction;

    newIndex = Math.max(0, Math.min(newIndex, totalPages - 1));
    
    setCurrentIndex(newIndex);
  };

  const calculateXOffset = useCallback(() => {
    if (!carouselRef.current || recipes.length === 0) return 0;

    const firstItem = carouselRef.current.querySelector('.carousel-item');
    if (!firstItem) return 0;
    
    const cardWidth = firstItem.offsetWidth;
    const gap = parseFloat(getComputedStyle(carouselRef.current).gap);
    
    // Le décalage est pour aligner la carte centrale
    // La position de départ de la carte actuelle
    const currentCardStartPosition = currentIndex * (cardWidth + gap);

    // Largeur de la zone visible du CarouselInner (entre les wrappers glassmorphiques)
    const carouselInnerWidth = carouselRef.current.offsetWidth;
    
    // Pour centrer la carte actuelle, on veut que son milieu soit au milieu de carouselInnerWidth
    // Milieu de la carte = currentCardStartPosition + cardWidth / 2
    // Milieu du CarouselInner = carouselInnerWidth / 2
    // Offset nécessaire = (carouselInnerWidth / 2) - (currentCardStartPosition + cardWidth / 2)
    const offsetToCenter = (carouselInnerWidth / 2) - (currentCardStartPosition + cardWidth / 2);

    // Calcul de la largeur totale scrollable du contenu (toutes les cartes + tous les gaps)
    const totalScrollableContentWidth = recipes.length * (cardWidth + gap) - gap; 
    
    // Limites de défilement pour éviter les zones vides
    const maxScrollLeft = 0; // On ne peut pas scroller plus à droite que 0 (position initiale)
    const maxScrollRight = -(totalScrollableContentWidth - carouselInnerWidth); // Max vers la gauche

    // Appliquer l'offset en s'assurant de ne pas dépasser les limites
    let finalOffset = offsetToCenter;

    // Si le contenu est plus petit que la zone visible, centrer tout le contenu
    if (totalScrollableContentWidth <= carouselInnerWidth) {
        return (carouselInnerWidth - totalScrollableContentWidth) / 2; // Centrer le bloc de cartes
    }

    // Limiter l'offset pour ne pas afficher de vide aux extrémités
    finalOffset = Math.min(maxScrollLeft, finalOffset); // Ne pas aller trop à droite
    finalOffset = Math.max(maxScrollRight, finalOffset); // Ne pas aller trop à gauche

    return finalOffset;

  }, [currentIndex, recipes.length]);


  const handleDragEnd = useCallback((event, info) => {
    if (!carouselRef.current || recipes.length === 0) return;

    const firstItem = carouselRef.current.querySelector('.carousel-item');
    if (!firstItem) return;

    const cardWidth = firstItem.offsetWidth;
    const gap = parseFloat(getComputedStyle(carouselRef.current).gap);
    const itemFullWidth = cardWidth + gap;

    const currentX = x.current; // Position actuelle après le drag initial

    // Calcul du nouvel index basé sur la position finale du drag
    // On prend la position actuelle du carrousel, on la "décentrifuge" en ajoutant la moitié de la largeur du CarouselInner
    // puis on la normalise par la largeur d'un item complet.
    const carouselInnerWidth = carouselRef.current.offsetWidth;
    const centerOffset = carouselInnerWidth / 2;
    
    const dragEndPosition = -currentX + centerOffset; // Position relative à partir du début (0)
    let newIndex = Math.round((dragEndPosition - (cardWidth / 2)) / itemFullWidth);

    newIndex = Math.max(0, Math.min(newIndex, recipes.length - itemsPerPage));
    
    setCurrentIndex(newIndex);
  }, [recipes.length, itemsPerPage]);

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

  // totalPages est maintenant le nombre de cartes, car on gère carte par carte
  const totalPages = recipes.length; 

  return (
    <CarouselContainer
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      // ✅ Application des variables CSS pour la largeur des wrappers de boutons
      style={{ '--side-cover-width': `${sideCoverWidth}px` }} 
    >
      {/* Boutons toujours visibles */}
      <NavButtonWrapper className="left" style={{ '--side-cover-width': `${sideCoverWidth}px` }}>
          <NavButton 
            onClick={() => scroll(-1)} 
            whileTap={{ scale: 0.9 }}
            // ✅ Désactiver le clic visuellement seulement si on est au début
            // En gardant le bouton rose vif
            style={{ opacity: currentIndex === 0 ? 0.5 : 1, cursor: currentIndex === 0 ? 'not-allowed' : 'pointer' }}
          >
            &larr;
          </NavButton>
        </NavButtonWrapper>

      <CarouselInner
        ref={carouselRef}
        drag="x"
        dragConstraints={{
          // Les contraintes de drag doivent être dynamiques et précises
          left: -((carouselRef.current?.scrollWidth || 0) - (carouselRef.current?.offsetWidth || 0)),
          right: 0
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: calculateXOffset() }} 
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        // La propriété 'x' est contrôlée par animate, on n'a plus besoin de useRef pour ça
        // style={{ x: x }} 
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

      {/* Boutons toujours visibles */}
      <NavButtonWrapper className="right" style={{ '--side-cover-width': `${sideCoverWidth}px` }}>
          <NavButton 
            onClick={() => scroll(1)} 
            whileTap={{ scale: 0.9 }}
            // ✅ Désactiver le clic visuellement seulement si on est à la fin
            style={{ opacity: currentIndex >= recipes.length - itemsPerPage ? 0.5 : 1, cursor: currentIndex >= recipes.length - itemsPerPage ? 'not-allowed' : 'pointer' }}
          >
            &rarr;
          </NavButton>
        </NavButtonWrapper>

      {/* Points indicateurs (toujours affichés si plus d'une carte) */}
      {totalPages > 1 && (
        <DotsContainer>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex} // Actif pour la carte actuellement centrée
              onClick={() => setCurrentIndex(index)}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </DotsContainer>
      )}
    </CarouselContainer>
  );
};

export default RecipeCarousel;