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
  padding-bottom: 30%;

  /* Hauteur fixe pour le rolodex */
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px; /* Pour l'effet 3D */
  overflow: hidden; /* Cache les cartes en dehors de la vue */
  border: 4px solid var(--color-primary-500); /* Bordure principale plus vive et plus épaisse */
  border-radius: var(--radius-2xl);
  background: var(--color-primary-100); /* Fond léger mais coloré pour le conteneur */
  box-shadow: var(--shadow-xl);
  transform: rotate(${(Math.random() - 0.5) * 1.5}deg); /* Très légère inclinaison du conteneur */
  transition: transform 0.3s ease-out; /* Transition pour le hover */

  &:hover {
      transform: rotate(0deg) scale(1.005); /* Se redresse légèrement au survol */
  }
`;

const RolodexCard = styled(motion.div)`
  position: absolute;
  top:13%;
  bottom:10%;
  width: 85%; /* Taille de la carte dans le rolodex */
  height: 70%;
  background: var(--color-neutral-50); /* Fond légèrement différent pour la carte */
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4);
  box-shadow: var(--shadow-md);
  backface-visibility: hidden; /* Prévient les flashs lors des rotations 3D */
 margin:4rem;
  text-align: center;
`;

const CardImage = styled.img`
  width: 100px; /* Plus petite image pour le rolodex */
  height: 100px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2);
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
  z-index: 2; /* Au-dessus des cartes */
`;

const NavButton = styled(motion.button)`
  background: var(--color-bright-pink-crayola); /* Couleur de fond vive */
  color: var(--color-neutral-0); /* Texte blanc */
  border: 3px solid var(--color-bright-pink-crayola); /* Bordure initiale de la même couleur */
  border-radius: var(--radius-full);
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Retirons font-size ici pour l'appliquer à un span interne */
  font-weight: var(--font-bold);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: rotate(calc((Math.random() - 0.5) * 6deg));
  text-shadow: var(--shadow-text-sm);
  outline: none;
  position: relative;
  overflow: hidden;

  /* Style pour la flèche elle-même (le contenu du bouton) */
  span {
    display: flex; /* Utilise flexbox pour centrer le caractère */
    justify-content: center;
    align-items: center;
    font-size: var(--text-4xl); /* Applique la taille de police ici */
    line-height: 1; /* Force une ligne-hauteur de 1 pour un meilleur contrôle du centrage */
    transform: translateY(1px); /* Ajustement fin pour le centrage vertical de la flèche */
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
    0% {
      transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg)) translateX(0px);
      filter: hue-rotate(0deg);
    }
    20% {
      transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg)) translateX(2px) skewX(2deg);
      filter: hue-rotate(10deg);
    }
    40% {
      transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg)) translateX(-3px) skewX(-1deg);
      filter: hue-rotate(0deg);
    }
    60% {
      transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg)) translateX(1px) skewX(1deg);
      filter: hue-rotate(5deg);
    }
    80% {
      transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg)) translateX(-2px) skewX(-2deg);
      filter: hue-rotate(0deg);
    }
    100% {
      transform: scale(1.2) translateY(-8px) rotate(calc((Math.random() - 0.5) * -12deg)) translateX(0px);
      filter: hue-rotate(0deg);
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
  height: 90%; /* Prend presque toute la hauteur du conteneur */
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(2deg); /* Message bancal */

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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  // Variants pour l'animation de la carte (Rolodex)
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
      transition={{ duration: 0.5, delay: 1 }} // Apparition du conteneur du rolodex
    >
      <AnimatePresence initial={false} custom={direction}>
        {recipes.length > 0 && (
          <RolodexCard
            key={currentIndex} // La clé change pour déclencher l'animation
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <CardImage src={recipes[currentIndex].imageUrl || 'https://via.placeholder.com/100/FF9800/FFFFFF?text=Création'} alt={recipes[currentIndex].nom} />
            <CardTitle>{recipes[currentIndex].nom}</CardTitle>
            <CardAuthor>par {recipes[currentIndex].auteur || 'Un Chef Inconnu'}</CardAuthor>
          </RolodexCard>
        )}
      </AnimatePresence>

      {recipes.length > 1 && ( // Affiche les boutons seulement s'il y a plus d'une recette
        <RolodexNavigation>
          <NavButton onClick={() => paginate(-1)} whileTap={{ scale: 0.9 }}>&larr;</NavButton>
          <NavButton onClick={() => paginate(1)} whileTap={{ scale: 0.9 }}>&rarr;</NavButton>
        </RolodexNavigation>
      )}

      {recipes.length === 0 && (
         <NoRecentRecipesMessage
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
          >
            <p>Pas de nouvelles créations mondiales pour le moment.</p>
          </NoRecentRecipesMessage>
      )}
    </RolodexContainer>
  );
};

export default RecentRecipes;