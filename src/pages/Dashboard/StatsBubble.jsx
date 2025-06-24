// src/pages/Dashboard/StatsBubble.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';

// Importe les icônes que tu auras placées dans assets/icons
import BrainIcon from '../../assets/icons/stats.svg';
import CloseIcon from '../../assets/icons/close.svg';
import RecipeBookIcon from '../../assets/icons/stats.svg';
import ToqueIcon from '../../assets/icons/stats.svg';
import SpoonIcon from '../../assets/icons/stats.svg';


// --- Styles pour la bulle et son déclencheur ---

const StatsTrigger = styled(motion.div)`
  position: fixed;
  bottom: var(--space-8);
  right: var(--space-8);
  width: 75px; /* Légèrement plus grand */
  height: 75px; /* Légèrement plus grand */
  background: var(--color-accent-purple); /* Nouvelle couleur qui se démarque bien */
  border-radius: var(--radius-full); /* Rendre le bouton parfaitement rond */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: var(--shadow-2xl); /* Ombre plus prononcée pour attirer l'œil */
  color: var(--color-neutral-0);
  font-family: var(--font-family-heading);
  font-size: var(--text-sm);
  text-align: center;
  line-height: 1.2;
  z-index: var(--z-mid); /* Au-dessus du contenu normal, sous le modal */
  transform: rotate(5deg); /* Plus de rotation pour un look "quirky" */
  border: 4px solid var(--color-accent-purple-dark); /* Bordure épaisse pour le contraste */
  transition: all var(--transition-base) ease-in-out; /* Assure une belle transition */


  &:hover {
    background: var(--color-accent-purple-light); /* Changer de couleur au survol */
    box-shadow: var(--shadow-3xl); /* Ombre encore plus intense */
    transform: scale(1.1) rotate(-5deg); /* Rotation inverse et grossissement au survol */
    border-color: var(--color-accent-purple-dark); /* Maintenir une bordure forte */
  }

  span {
    margin-top: var(--space-1);
    font-weight: var(--font-bold); /* Texte plus gras */
    text-shadow: var(--shadow-text-sm); /* Petite ombre sur le texte */
  }

  img {
    width: 35px; /* Icône légèrement plus grande */
    height: 35px; /* Icône légèrement plus grande */
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%); /* Rendre l'icône blanche */
  }
`;

const StatsOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-high); /* Assurez-vous que c'est une valeur très élevée, ex: 1000 */

  /* --- NOUVEAU: ASSOMBRISSEMENT PLUS FORT ET FLOU INTENSE --- */
  background: rgba(0, 0, 0, 0.7); /* Augmente l'opacité du voile noir pour un assombrissement plus fort */
  backdrop-filter: blur(12px); /* Augmente la valeur du flou pour un effet plus prononcé */
  
  /* IMPORTANT: Si tu as toujours tes variables CSS --dashboard-blur et --dashboard-opacity
      définies *ailleurs* (par exemple, dans GlobalStyles.js) et que tu veux les utiliser,
      assure-toi qu'elles sont appliquées à StatsOverlay comme suit:
      background: rgba(0, 0, 0, var(--dashboard-opacity));
      backdrop-filter: blur(var(--dashboard-blur));
      MAIS D'ABORD, ESSAYE AVEC DES VALEURS FIXES COMME 0.7 et 12px POUR T'ASSURER DU FONCTIONNEMENT.
  */
`;

const StatsBubbleContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.98); /* Presque opaque pour la bulle elle-même */
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  position: relative;
  border: 4px solid var(--color-primary-500); /* Bordure plus épaisse */
  z-index: calc(var(--z-high) + 10); /* Assure qu'elle est bien au-dessus de l'overlay flouté */
  transform: translateZ(0); /* Conserve pour l'optimisation Framer Motion */

  h2 {
    color: var(--color-primary-800);
    margin-bottom: var(--space-4);
    font-size: var(--text-3xl); /* Titre plus grand */
    text-shadow: var(--shadow-text-sm);
  }
`;
const CloseButton = styled(motion.button)`
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  background: none;
  border: none;
  font-size: var(--text-2xl); /* Icône plus grande */
  color: var(--color-neutral-600);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-error-light);
    color: var(--color-error-dark);
    transform: rotate(90deg) scale(1.1); /* Rotation et léger grossissement */
  }

  img {
    width: 28px; /* Taille d'icône plus grande */
    height: 28px;
    filter: invert(30%) sepia(0%) saturate(1%) hue-rotate(0deg) brightness(0%) contrast(100%);
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5); /* Espacement légèrement augmenté */
  margin-top: var(--space-4);
`;

const StatCardStyled = styled(motion.div)`
  background: var(--color-tertiary-100); /* Couleur de fond pour les stat cards */
  padding: var(--space-5); /* Plus de padding */
  border-radius: var(--radius-xl); /* Bords plus arrondis */
  text-align: center;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-tertiary-300); /* Bordure légère */

  &:nth-child(1) { transform: rotate(-1deg); }
  &:nth-child(2) { transform: rotate(2deg); }
  &:nth-child(3) { transform: rotate(-0.5deg); }


  strong {
    font-size: var(--text-4xl); /* Valeurs plus grandes */
    color: var(--color-primary-900);
    font-family: var(--font-family-heading);
    line-height: 1;
    margin-bottom: var(--space-1);
  }

  span {
    font-size: var(--text-base); /* Labels plus grands */
    color: var(--color-neutral-800);
    font-weight: var(--font-medium);
  }

  img {
    width: 36px; /* Icônes plus grandes */
    height: 36px;
    margin-bottom: var(--space-3); /* Plus d'espace sous l'icône */
    filter: invert(20%) sepia(90%) saturate(1000%) hue-rotate(30deg) brightness(90%) contrast(100%);
  }
`;

const StatCard = ({ value, label, icon: IconComponent }) => (
  <StatCardStyled variants={{
    hidden: { opacity: 0, y: 20, scale: 0.9, rotate: (Math.random() - 0.5) * 5 },
    visible: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
  }}>
    {IconComponent && <img src={IconComponent} alt={label} />}
    <strong>{value}</strong>
    <span>{label}</span>
  </StatCardStyled>
);


const StatsBubble = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [stats, setStats] = useState({ totalRecipes: 0, totalCategories: 0, totalSousCategories: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleBubble = useCallback(() => {
    setShowBubble(prev => !prev);
  }, []);

  useEffect(() => {
    if (showBubble) {
      document.body.classList.add('body--blurred');
    } else {
      document.body.classList.remove('body--blurred');
    }
    return () => {
      document.body.classList.remove('body--blurred');
    };
  }, [showBubble]);

  useEffect(() => {
    // Ne charger les stats que si la bulle est ouverte et si elles n'ont pas déjà été chargées (ou si elles sont à 0)
    if (showBubble && (stats.totalRecipes === 0 && stats.totalCategories === 0 && stats.totalSousCategories === 0) && !loading) {
      const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await api.get('/dashboard/stats');
          setStats(response.data);
        } catch (err) {
          console.error('Erreur lors de la récupération des statistiques:', err);
          setError('Impossible de charger les statistiques. 😢');
          toast.error('Erreur de chargement des statistiques.');
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }
  }, [showBubble, stats, loading]);

  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50, rotate: -5, transition: { type: "spring", stiffness: 200, damping: 20 } },
    visible: { opacity: 1, scale: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };

  // Les variants pour les items de stat card sont maintenant directement dans StatCardStyled

  const recipeBookIcon = RecipeBookIcon;
  const categoriesIcon = ToqueIcon;
  const subCategoriesIcon = SpoonIcon;


  return (
    <>
      <StatsTrigger
        onClick={toggleBubble}
        initial={{ opacity: 0, scale: 0, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 5 }} /* Animation finale avec rotation */
        transition={{ type: "spring", stiffness: 150, damping: 10, delay: 1 }}
      >
        <img src={BrainIcon} alt="Cerveau" />
        <span>Mes Stats</span>
      </StatsTrigger>

      <AnimatePresence>
        {showBubble && (
          <StatsOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && toggleBubble()}
          >
            <StatsBubbleContainer
              variants={bubbleVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={e => e.stopPropagation()}
            >
              <CloseButton onClick={toggleBubble} whileTap={{ scale: 0.9 }}>
                <img src={CloseIcon} alt="Fermer" />
              </CloseButton>
              <h2>Mes Chiffres Gourmands</h2>
              {loading && <p>Réflexion en cours...</p>}
              {error && <p style={{ color: 'var(--color-error-dark)' }}>{error}</p>}
              {!loading && !error && (
                <StatsGrid
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  <StatCard value={stats.totalRecipes} label="Recettes Créées" icon={recipeBookIcon} />
                  <StatCard value={stats.totalCategories} label="Catégories Uniques" icon={categoriesIcon} />
                  <StatCard value={stats.totalSousCategories} label="Sous-Catégories Explorées" icon={subCategoriesIcon} />
                </StatsGrid>
              )}
            </StatsBubbleContainer>
          </StatsOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default StatsBubble;