// src/pages/Dashboard/RecentRecipes.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';

// --- Styles pour le Rolodex ---

const RolodexContainer = styled(motion.div)`
  position: relative;
  width: 100%;
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
`;

const RolodexCardArea = styled.div`
  position: relative;
  width: 95%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RolodexCard = styled(motion.div)`
  position: absolute;
  transform: translate(-50%, -50%); /* Centrage parfait */

  width: 85%;
  height: 90%;
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
`;

// Nouveau style pour l'image de placeholder (emoji ou icône)
const CardPlaceholderImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2);
  background: var(--color-neutral-200); /* Fond léger pour le placeholder */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-6xl); /* Grande taille pour l'emoji/icône */
  color: var(--color-primary-600); /* Couleur sympa pour l'emoji/icône */
  border: 2px dashed var(--color-primary-300); /* Bordure en pointillés fun */
`;

const CardImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2);
  /* Optionnel: Ajoutez une transition pour un effet doux lors du chargement */
  transition: opacity 0.3s ease-in-out;
`;

const CardTitle = styled.h4`
  font-family: var(--font-family-heading);
  font-size: var(--text-2xl);
  color: var(--color-primary-700);
  margin: 0;
  line-height: 1.2;
  text-shadow: var(--shadow-text-sm);
`;

const CardAuthor = styled.p`
  font-size: var(--text-md);
  color: var(--color-neutral-600);
  margin-top: var(--space-1);
`;

const RolodexNavigation = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: var(--space-6);
  z-index: 2;
  padding-bottom: var(--space-2);
`;

const NavButton = styled(motion.button)`
  background: var(--color-bright-pink-crayola);
  color: var(--color-neutral-0);
  border: 3px solid var(--color-bright-pink-crayola);
  border-radius: var(--radius-full);
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--font-bold);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: rotate(calc((Math.random() - 0.5) * 6deg));
  text-shadow: var(--shadow-text-sm);
  outline: none;
  position: relative;
  overflow: hidden;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--text-4xl);
    line-height: 1;
    transform: translateY(1px);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
    transform: rotate(45deg);
    transition: transform 0.3s ease-out;
  }

  &:hover {
    background: var(--color-salmon);
    border-color: var(--color-bright-pink-crayola);
    transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg));
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    animation: glitchEffect 0.4s infinite alternate;

    &::before {
      transform: rotate(45deg) scale(1.5);
      opacity: 0.8;
    }
  }

  &:active {
    background: var(--color-bright-pink-crayola);
    transform: scale(0.9) translateY(0) rotate(calc((Math.random() - 0.5) * 3deg));
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
  }

  @keyframes glitchEffect {
    0% { transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg)) translateX(0px); filter: hue-rotate(0deg); }
    20% { transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg)) translateX(2px) skewX(2deg); filter: hue-rotate(10deg); }
    40% { transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg)) translateX(-3px) skewX(-1deg); filter: hue-rotate(0deg); }
    60% { transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg)) translateX(1px) skewX(1deg); filter: hue-rotate(5deg); }
    80% { transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg)) translateX(-2px) skewX(-2deg); filter: hue-rotate(0deg); }
    100% { transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg)) translateX(0px); filter: hue-rotate(0deg); }
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

const RecentRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      if (newDirection > 0) { // Next
        return (prevIndex + 1) % recipes.length;
      } else { // Previous
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
              {/* Condition pour afficher l'image réelle ou le placeholder */}
              {recipes[currentIndex].imageUrl ? (
                <CardImage src={recipes[currentIndex].imageUrl} alt={recipes[currentIndex].nom} />
              ) : (
                <CardPlaceholderImage>
                  😋 {/* Un emoji sympa pour la nourriture ! */}
                </CardPlaceholderImage>
              )}
              <CardTitle>{recipes[currentIndex].nom}</CardTitle>
              <CardAuthor>par {recipes[currentIndex].auteur || 'Un Chef Inconnu'}</CardAuthor>
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
          <NavButton onClick={() => paginate(-1)} whileTap={{ scale: 0.9 }}><span>&larr;</span></NavButton>
          <NavButton onClick={() => paginate(1)} whileTap={{ scale: 0.9 }}><span>&rarr;</span></NavButton>
        </RolodexNavigation>
      )}
    </RolodexContainer>
  );
};

export default RecentRecipes;