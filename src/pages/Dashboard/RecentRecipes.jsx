// src/pages/Dashboard/RecentRecipes.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';

// --- Styles pour le Rolodex ---

const RolodexContainer = styled(motion.div)`
  position: relative;
  width: 100%; /* Par défaut, pleine largeur */
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  perspective: 1000px;
  overflow: hidden;
  border: 4px solid var(--color-primary-500);
  border-radius: var(--radius-2xl);
  background: var(--color-primary-100);
  box-shadow: var(--shadow-xl);
  transform: rotate(${(Math.random() - 0.5) * 1.5}deg);
  transition: transform 0.3s ease-out;
  padding: var(--space-4);

  &:hover {
    transform: rotate(0deg) scale(1.005);
  }

  /* --- MEDIA QUERY POUR LES ÉCRANS EN DESSOUS DE 880PX --- */
  @media (max-width: 880px) {
    width: 95%; /* Réduit la largeur du conteneur pour laisser un peu de marge sur les bords du viewport */
    max-width: 400px; /* Limite la largeur sur des écrans un peu plus grands mais toujours "mobiles" */
    height: 550px; /* Augmente légèrement la hauteur pour accommoder la carte plus grande */
    margin: 0 auto; /* Centre le conteneur */
  }

  @media (max-width: 550px) {
    width: 98%; /* Presque pleine largeur sur les très petits mobiles */
    height: 500px; /* Ajustement de la hauteur pour les plus petits écrans */
    padding: var(--space-3); /* Un peu moins de padding sur les très petits écrans */
  }
`;

const RolodexCardArea = styled.div`
  position: relative;
  width: 95%; /* Laissera une petite marge par rapport aux bords du conteneur */
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;

  /* --- MEDIA QUERY POUR LES ÉCRANS EN DESSOUS DE 880PX --- */
  @media (max-width: 880px) {
    width: 100%; /* La carte prendra plus de place dans la zone */
    height: 90%; /* La carte prendra plus de hauteur dans la zone */
  }
`;

const RolodexCard = styled(motion.div)`
  position: absolute;
  transform: translate(-50%, -50%); /* Centrage parfait */

  width: 85%; /* Par défaut, 85% de RolodexCardArea */
  height: 90%; /* Par défaut, 90% de RolodexCardArea */
  background: var(--color-neutral-50);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: var(--space-4);
  box-shadow: var(--shadow-md);
  backface-visibility: hidden;
  text-align: center;
  overflow: hidden;

  /* Min/Max pour le desktop (valeurs existantes) */
  min-width: 280px;
  max-width: 350px;
  min-height: 380px;
  max-height: 450px;
  
  /* --- MEDIA QUERY POUR LES ÉCRANS EN DESSOUS DE 880PX --- */
  @media (max-width: 880px) {
    width: 95%; /* La carte prend plus de largeur dans son conteneur (RolodexCardArea) */
    height: 95%; /* La carte prend plus de hauteur dans son conteneur */
    min-width: 280px; /* Conserver une taille minimale raisonnable */
    max-width: 380px; /* Peut être un peu plus grande sur mobile si le conteneur le permet */
    min-height: 400px; /* Augmenter la hauteur min/max pour mobile */
    max-height: 500px;
    padding: var(--space-5); /* Augmenter le padding pour un meilleur espacement interne */
  }

  @media (max-width: 550px) {
    width: 98%; /* Sur les très petits écrans, la carte prend presque toute la largeur */
    height: 98%; /* Et presque toute la hauteur */
    padding: var(--space-4); /* Réduire un peu le padding sur les très petits écrans si nécessaire */
  }
`;

const CardPlaceholderImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2);
  background: var(--color-neutral-200);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-6xl);
  color: var(--color-primary-600);
  border: 2px dashed var(--color-primary-300);

  /* --- MEDIA QUERY POUR LES ÉCRANS EN DESSOUS DE 880PX --- */
  @media (max-width: 880px) {
    width: 150px; /* Plus grande sur mobile */
    height: 150px;
    font-size: var(--text-7xl); /* Emoji plus grand */
  }
`;

const CardImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2);
  transition: opacity 0.3s ease-in-out;

  /* --- MEDIA QUERY POUR LES ÉCRANS EN DESSOUS DE 880PX --- */
  @media (max-width: 880px) {
    width: 150px; /* Plus grande sur mobile */
    height: 150px;
  }
`;

const CardTitle = styled.h4`
  font-family: var(--font-family-heading);
  font-size: var(--text-2xl);
  color: var(--color-primary-700);
  margin: 0;
  line-height: 1.2;
  text-shadow: var(--shadow-text-sm);
  
  padding-left: 3rem;
  text-align: left;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  /* --- MEDIA QUERY POUR LES ÉCRANS EN DESSOUS DE 880PX --- */
  @media (max-width: 880px) {
    font-size: var(--text-3xl); /* Titre plus grand sur mobile pour la lisibilité */
    padding-left: 1.5rem; /* Réduire un peu le padding sur les écrans plus petits si 3rem est trop grand */
    /* Vous pourriez augmenter le -webkit-line-clamp si vous voulez plus de lignes sur mobile */
    -webkit-line-clamp: 3; /* Permettre 3 lignes sur mobile si le contenu est dense */
  }

  @media (max-width: 550px) {
    font-size: var(--text-2xl); /* Revenir à une taille normale sur très petit écran */
    padding-left: 1rem; /* Réduire encore le padding si l'espace est très limité */
  }
`;

const CardDescription = styled.p`
  font-size: var(--text-base);
  color: var(--color-neutral-800);
  margin: var(--space-2) 0;
  flex-grow: 1;
  line-height: 1.4;
  text-align: center;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  /* --- MEDIA QUERY POUR LES ÉCRANS EN DESSOUS DE 880PX --- */
  @media (max-width: 880px) {
    font-size: var(--text-lg); /* Description plus grande sur mobile */
    -webkit-line-clamp: 4; /* Permettre plus de lignes sur mobile si nécessaire */
  }
  @media (max-width: 550px) {
    font-size: var(--text-base); /* Revenir à la taille de base sur très petits écrans */
  }
`;


const CardAuthor = styled.p`
  font-size: var(--text-md);
  color: var(--color-neutral-600);
  margin-top: var(--space-1);
  margin-bottom: 0;

  /* --- MEDIA QUERY POUR LES ÉCRANS EN DESSOUS DE 880PX --- */
  @media (max-width: 880px) {
    font-size: var(--text-lg); /* Auteur plus grand sur mobile */
  }
`;

const RolodexNavigation = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: var(--space-6);
  z-index: 2;
  padding-bottom: var(--space-2);

  /* --- MEDIA QUERY POUR LES ÉCRANS EN DESSOUS DE 880PX --- */
  @media (max-width: 880px) {
    gap: var(--space-4); /* Réduire l'espace entre les boutons */
    padding-bottom: var(--space-4); /* Plus de padding en bas si le conteneur est plus haut */
  }
`;

// --- Keyframes et NavButton (inchangés ou ajustements mineurs si nécessaires) ---
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
  50% { border-color: var(--color-dark-purple); }
  100% { border-color: var(--color-bright-pink-crayola); }
`;

const hoverWiggle = keyframes`
  0%, 100% { transform: translateY(0) scale(1.1) rotate(0deg); }
  25% { transform: translateY(-5px) scale(1.2) rotate(3deg); }
  50% { transform: translateY(0) scale(1.1) rotate(-3deg); }
  75% { transform: translateY(-2px) scale(1.15) rotate(1deg); }
`;

export const NavButton = styled(motion.button)`
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
  transform: rotate(calc((Math.random() - 0.5) * 8deg));
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
    background: var(--color-salmon);
    border-color: var(--color-bright-pink-crayola);
    transform: scale(1.2) translateY(-10px) rotate(calc((Math.random() - 0.5) * -18deg));
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
    animation: ${glitchEffect} 0.4s 1 alternate, ${pulseBorder} 1s 1 alternate;
    
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
    transform: scale(0.85) translateY(2px) rotate(calc((Math.random() - 0.5) * 5deg));
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

const NoRecentRecipesMessage = styled(motion.div)`
  padding: var(--space-8);
  background: var(--color-neutral-0);
  border-radius: var(--radius-2xl);
  text-align: center;
  color: var(--color-neutral-600);
  font-style: italic;
  font-size: var(--text-lg);
  box-shadow: var(--shadow-lg);
  border: 4px dashed var(--color-primary-300);
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(2deg);

  p {
    margin: 0;
  }
`;

// --- Composant Principal RecentRecipes ---

const RecentRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wiggleClass, setWiggleClass] = useState('');

  const fetchRecentRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/dashboard/recent-recipes');
      setRecipes(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des recettes récentes:', err);
      setError('Impossible de charger les dernières recettes.');
      toast.error('Erreur de chargement des recettes récentes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentRecipes();

    const startWiggleInterval = () => {
      setWiggleClass('occasional-wiggle');
      const wiggleTimeout = setTimeout(() => {
        setWiggleClass('');
      }, 2000);

      const nextWiggleTime = 15000 + Math.random() * 5000;
      return setTimeout(startWiggleInterval, nextWiggleTime);
    };

    let intervalId = startWiggleInterval();

    return () => {
      clearTimeout(intervalId);
    };
  }, [fetchRecentRecipes]);

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

  const [direction, setDirection] = useState(0);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (recipes.length === 0) return 0;
      if (newDirection > 0) {
        return (prevIndex + 1) % recipes.length;
      } else {
        return (prevIndex - 1 + recipes.length) % recipes.length;
      }
    });
  };

  if (loading) {
    return (
      <RolodexContainer>
        <NoRecentRecipesMessage
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
        >
          <p>Feuilletage des créations mondiales...</p>
        </NoRecentRecipesMessage>
      </RolodexContainer>
    );
  }

  if (error) {
    return (
      <RolodexContainer>
        <NoRecentRecipesMessage
          style={{ color: 'var(--color-error-dark)', background: 'var(--color-error-soft)' }}
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
        >
          <p>{error}</p>
        </NoRecentRecipesMessage>
      </RolodexContainer>
    );
  }

  return (
    <RolodexContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <RolodexCardArea>
        <AnimatePresence initial={false} custom={direction}>
          {recipes.length > 0 && (
            <RolodexCard
              key={currentIndex}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {recipes[currentIndex].imageUrl ? (
                <CardImage src={recipes[currentIndex].imageUrl} alt={recipes[currentIndex].nom} />
              ) : (
                <CardPlaceholderImage>
                  😋
                </CardPlaceholderImage>
              )}
              <CardTitle>{recipes[currentIndex].nom}</CardTitle>
              <CardAuthor>par {recipes[currentIndex].auteur || 'Un Chef Inconnu'}</CardAuthor>
              {/* Si vous voulez afficher la description, décommentez ceci et assurez-vous que `description` est disponible dans `recipes` */}
              {/* <CardDescription>{recipes[currentIndex].description}</CardDescription> */}
            </RolodexCard>
          )}
        </AnimatePresence>

        {recipes.length === 0 && (
          <NoRecentRecipesMessage
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
          >
            <p>Pas de nouvelles créations mondiales pour le moment.</p>
          </NoRecentRecipesMessage>
        )}
      </RolodexCardArea>

      {recipes.length > 1 && (
        <RolodexNavigation>
          <NavButton onClick={() => paginate(-1)} whileTap={{ scale: 0.85 }}>
            <span className={wiggleClass}>&larr;</span>
          </NavButton>
          <NavButton onClick={() => paginate(1)} whileTap={{ scale: 0.85 }}>
            <span className={wiggleClass}>&rarr;</span>
          </NavButton>
        </RolodexNavigation>
      )}
    </RolodexContainer>
  );
};

export default RecentRecipes;