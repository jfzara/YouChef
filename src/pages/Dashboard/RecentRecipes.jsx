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
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  overflow: hidden;
  border: 4px solid var(--color-secondary-500);
  border-radius: var(--radius-2xl);
  background: var(--color-primary-50); /* Fond légèrement coloré pour le conteneur */
  box-shadow: var(--shadow-xl);
`;

const RolodexCard = styled(motion.div)`
  position: absolute;
  width: 85%;
  height: 85%;
  background: var(--color-neutral-0); /* Les cartes restent blanches pour le contraste */
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4);
  box-shadow: var(--shadow-md);
  backface-visibility: hidden;
  border: 2px dashed var(--color-primary-300); /* Bordure en pointillé, plus fun */
  text-align: center;
  cursor: grab; /* Indique qu'on peut la "saisir" */

  &:active {
    cursor: grabbing;
  }
`;

const CardImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2);
  border: 2px solid var(--color-info-300); /* Petite bordure autour de l'image */
`;

const CardTitle = styled.h4`
  font-family: var(--font-family-heading);
  font-size: var(--text-xl);
  color: var(--color-primary-700);
  margin: 0;
  line-height: 1.2;
  text-shadow: var(--shadow-text-sm);
`;

const CardAuthor = styled.p`
  font-size: var(--text-sm);
  color: var(--color-neutral-600);
  margin-top: var(--space-1);
`;

const RolodexNavigation = styled.div`
  position: absolute;
  bottom: var(--space-3);
  width: 100%;
  display: flex;
  justify-content: center;
  gap: var(--space-6);
  z-index: 2;
`;

const NavButton = styled(motion.button)`
  background: var(--color-secondary-500);
  color: var(--color-neutral-0);
  border: 3px solid var(--color-secondary-700);
  border-radius: var(--radius-full);
  width: 45px; /* Légèrement plus grands */
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-fast);
  transform: rotate(calc((Math.random() - 0.5) * 10deg)); /* Plus bancal */
  text-shadow: var(--shadow-text-sm);
  font-family: 'HandwrittenFont', cursive; /* Si vous avez une police d'écriture manuelle */


  &:hover {
    background: var(--color-secondary-600);
    box-shadow: var(--shadow-lg);
    transform: scale(1.15) rotate(calc((Math.random() - 0.5) * -15deg)); /* Plus de mouvement */
    animation: pulse 0.5s infinite alternate; /* Ajout d'une petite animation de pulsation */
  }
  &:disabled {
    background: var(--color-neutral-300);
    color: var(--color-neutral-500);
    cursor: not-allowed;
    box-shadow: var(--shadow-sm);
    transform: none;
    animation: none;
  }

  @keyframes pulse {
    from {
      transform: scale(1.15) rotate(calc((Math.random() - 0.5) * -15deg));
    }
    to {
      transform: scale(1.2) rotate(calc((Math.random() - 0.5) * 15deg));
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
    color: var(--color-info-700); /* Couleur plus joyeuse pour le texte */
    font-weight: var(--font-semibold);
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

  // Anciennes fonctions handleNext/handlePrev supprimées, remplacées par paginate

  // Variants pour l'animation de la carte (Rolodex) - Rendues plus "quirky"
  const cardVariants = {
    enter: (direction) => ({
      opacity: 0,
      rotateY: direction > 0 ? 120 : -120, // Rotation plus large
      scale: 0.6, // Plus petite à l'entrée
      x: direction > 0 ? 300 : -300, // Déplacement plus grand
      filter: 'blur(5px)', // Flou à l'entrée
      rotateZ: direction > 0 ? 15 : -15, // Inclinaison sur l'axe Z
    }),
    center: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      x: 0,
      filter: 'blur(0px)',
      rotateZ: 0,
      transition: {
        type: "spring",
        stiffness: 150, // Moins rigide
        damping: 8, // Moins d'amortissement, plus de rebond
      }
    },
    exit: (direction) => ({
      opacity: 0,
      rotateY: direction > 0 ? -120 : 120,
      scale: 0.6,
      x: direction > 0 ? -300 : 300,
      filter: 'blur(5px)',
      rotateZ: direction > 0 ? -15 : 15,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 8,
      }
    })
  };

  // Pour gérer la direction de l'animation lors du changement d'index
  const [direction, setDirection] = useState(0); // 0 = initial, 1 = suivant, -1 = précédent

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
          <p>Feuilletage des créations mondiales... 🌍🍜</p>
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
          <p>{error} 😔</p>
        </NoRecentRecipesMessage>
      </RolodexContainer>
    );
  }

  return (
    <RolodexContainer
      initial={{ opacity: 0, y: 50, rotateX: 10 }} // Ajoute une petite rotation X à l'entrée
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 100, damping: 10 }}
    >
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
            <CardImage src={recipes[currentIndex].imageUrl || 'https://via.placeholder.com/100/FF9800/FFFFFF?text=Création'} alt={recipes[currentIndex].nom} />
            <CardTitle>{recipes[currentIndex].nom}</CardTitle>
            <CardAuthor>par {recipes[currentIndex].auteur || 'Un Chef Inconnu'} 👩‍🍳</CardAuthor>
          </RolodexCard>
        )}
      </AnimatePresence>

      {recipes.length > 1 && (
        <RolodexNavigation>
          <NavButton onClick={() => paginate(-1)} whileTap={{ scale: 0.8 }} aria-label="Recette précédente">&larr;</NavButton>
          <NavButton onClick={() => paginate(1)} whileTap={{ scale: 0.8 }} aria-label="Recette suivante">&rarr;</NavButton>
        </RolodexNavigation>
      )}

      {recipes.length === 0 && (
          <NoRecentRecipesMessage
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
          >
            <p>Pas de nouvelles créations mondiales pour le moment. Le frigo est vide ! 😅</p>
          </NoRecentRecipesMessage>
      )}
    </RolodexContainer>
  );
};

export default RecentRecipes;