 

// src/pages/Dashboard/StatsBubble.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext'; // Importez le hook useAuth

// Importe les icônes que tu auras placées dans assets/icons
import BrainIcon from '../../assets/icons/stats.svg';
import CloseIcon from '../../assets/icons/close.svg';
import RecipeBookIcon from '../../assets/icons/stats.svg';
import ToqueIcon from '../../assets/icons/stats.svg';
import SpoonIcon from '../../assets/icons/stats.svg';


// --- Styles pour la bulle et son déclencheur ---

const StatsTrigger = styled(motion.div)`
    /* CHANGEMENT CLÉ ICI : position: fixed pour le maintenir à l'écran */
    position: fixed; 
    top: calc(var(--navbar-height, 0px) + var(--space-4));
    right: var(--space-8); /* Valeur par défaut pour les grands écrans */
    width: 5vw; /* Sera surchargé par les media queries ci-dessous */
    height: 5vw; /* Sera surchargé par les media queries ci-dessous */
    background: var(--color-accent-purple);
    border-radius: var(--radius-full);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: var(--shadow-2xl);
    color: var(--color-neutral-0);
    font-family: var(--font-family-heading);
    font-size: var(--text-sm);
    text-align: center;
    line-height: 1.2;
    /* CHANGEMENT CLÉ ICI : z-index inférieur à la navbar (ex: 1000) mais supérieur au contenu */
    z-index: 990; 
    transform: rotate(5deg);
    border: 4px solid var(--color-accent-purple-dark);
    transition: all var(--transition-base) ease-in-out;

    &:hover {
        background: var(--color-accent-purple-light);
        box-shadow: var(--shadow-3xl);
        transform: scale(1.1) rotate(-5deg);
        border-color: var(--color-accent-purple-dark);
    }

    span {
        margin-top: var(--space-1);
        font-weight: var(--font-bold);
        text-shadow: var(--shadow-text-sm);
    }

    img {
        width: 35px;
        height: 35px;
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
    }

    /* MEDIA QUERY pour les écrans très grands (au-delà de 1840px) */
    @media (min-width: 1841px) {
        width: 101.1px; 
        height: 101.1px;
        right: var(--space-8); 
    }

    /* MEDIA QUERY pour les écrans entre 521px et 1840px */
    @media (min-width: 521px) and (max-width: 1840px) {
        width: 10vw;
        height: 10vw;
        right: var(--space-8); 
        font-size: var(--text-sm);
        
        img {
            width: 35px; 
            height: 35px;
        }
    }

    /* MEDIA QUERY pour les petits écrans (max-width: 520px) */
    @media (max-width: 520px) {
        right: var(--space-1); /* Rapproche de la droite pour ne pas chevaucher l'icône hamburger */
        width: 19vw;
        height: 19vw;
        font-size: var(--text-xs);

        img {
            width: 28px;
            height: 28px;
        }
    }
`;

const StatsOverlay = styled(motion.div)`
    position: fixed; /* L'overlay doit rester fixed pour couvrir tout l'écran */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* z-index : var(--z-high) devrait être supérieur au z-index du StatsTrigger (ex: 990) */
    z-index: var(--z-high); 

    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12px);
`;

const StatsBubbleContainer = styled(motion.div)`
    background: rgba(255, 255, 255, 0.98);
    border-radius: var(--radius-2xl);
    padding: var(--space-6);
    box-shadow: var(--shadow-2xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    position: relative;
    border: 4px solid var(--color-primary-500);
    /* z-index : Doit être au-dessus de l'overlay et de tout le reste */
    z-index: calc(var(--z-high) + 10); 
    transform: translateZ(0); /* Pour assurer le positionnement correct de la modale */

    h2 {
        color: var(--color-primary-800);
        margin-bottom: var(--space-4);
        font-size: var(--text-3xl);
        text-shadow: var(--shadow-text-sm);
    }
`;

const CloseButton = styled(motion.button)`
    position: absolute;
    top: var(--space-3);
    right: var(--space-3);
    background: none;
    border: none;
    font-size: var(--text-2xl);
    color: var(--color-neutral-600);
    cursor: pointer;
    padding: var(--space-2);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);

    &:hover {
        background: var(--color-error-light);
        color: var(--color-error-dark);
        transform: rotate(90deg) scale(1.1);
    }

    img {
        width: 28px;
        height: 28px;
        filter: invert(30%) sepia(0%) saturate(1%) hue-rotate(0deg) brightness(0%) contrast(100%);
    }
`;

const StatsGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-5);
    margin-top: var(--space-4);
`;

const StatCardStyled = styled(motion.div)`
    background: var(--color-tertiary-100);
    padding: var(--space-5);
    border-radius: var(--radius-xl);
    text-align: center;
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--color-tertiary-300);

    &:nth-child(1) { transform: rotate(-1deg); }
    &:nth-child(2) { transform: rotate(2deg); }
    &:nth-child(3) { transform: rotate(-0.5deg); }


    strong {
        font-size: var(--text-4xl);
        color: var(--color-primary-900);
        font-family: var(--font-family-heading);
        line-height: 1;
        margin-bottom: var(--space-1);
    }

    span {
        font-size: var(--text-base);
        color: var(--color-neutral-800);
        font-weight: var(--font-medium);
    }

    img {
        width: 36px;
        height: 36px;
        margin-bottom: var(--space-3);
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

    // Utilisez le hook useAuth pour obtenir l'état d'authentification
    const { isAuthenticated } = useAuth();

    const toggleBubble = useCallback(() => {
        setShowBubble(prev => !prev);
    }, []);

    // Effet pour ajouter/retirer la classe 'body--blurred'
    useEffect(() => {
        if (showBubble) {
            document.body.classList.add('body--blurred');
        } else {
            document.body.classList.remove('body--blurred');
        }
        // Nettoyage à la désactivation du composant
        return () => {
            document.body.classList.remove('body--blurred');
        };
    }, [showBubble]);

    // Effet pour charger les statistiques
    useEffect(() => {
        // Ne tente de charger les stats que si la bulle est visible ET l'utilisateur est authentifié
        // ET les stats ne sont pas déjà chargées (ou sont à zéro) ET pas en cours de chargement.
        if (showBubble && isAuthenticated && (stats.totalRecipes === 0 && stats.totalCategories === 0 && stats.totalSousCategories === 0) && !loading) {
            const fetchStats = async () => {
                setLoading(true);
                setError(null);
                try {
                    // La requête API n'a pas besoin de l'ID utilisateur ici, car axiosInstance
                    // ajoute automatiquement le token JWT, et le backend utilise ce token.
                    const response = await api.get('/dashboard/stats');
                    setStats(response.data);
                } catch (err) {
                    console.error('Erreur lors de la récupération des statistiques:', err);
                    setError('Impossible de charger les statistiques. 😢 Veuillez vous connecter ou réessayer.');
                    toast.error('Erreur de chargement des statistiques.');
                } finally {
                    setLoading(false);
                }
            };
            fetchStats();
        }
        // Ajoutez 'isAuthenticated' aux dépendances pour recharger les stats si l'état de connexion change
    }, [showBubble, isAuthenticated, stats, loading]);

    const bubbleVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50, rotate: -5, transition: { type: "spring", stiffness: 200, damping: 20 } },
        visible: { opacity: 1, scale: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
    };

    // Assignation des icônes
    const recipeBookIcon = RecipeBookIcon;
    const categoriesIcon = ToqueIcon;
    const subCategoriesIcon = SpoonIcon;


    return (
        <>
            {/* Le StatsTrigger est le bouton de la bulle */}
            <StatsTrigger
                onClick={toggleBubble}
                initial={{ opacity: 0, scale: 0, rotate: 10 }}
                // L'animation d'entrée du trigger est toujours la même
                animate={{ opacity: 1, scale: 1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 150, damping: 10, delay: 1 }}
            >
                <img src={BrainIcon} alt="Cerveau" />
                <span>Mes Stats</span>
            </StatsTrigger>

            {/* L'AnimatePresence gère l'affichage de l'overlay et de la bulle de stats */}
            <AnimatePresence>
                {showBubble && (
                    <StatsOverlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        // Permet de fermer la modale en cliquant sur l'overlay, mais pas sur la bulle elle-même
                        onClick={(e) => e.target === e.currentTarget && toggleBubble()}
                    >
                        <StatsBubbleContainer
                            variants={bubbleVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            // Empêche la fermeture de l'overlay si on clique à l'intérieur de la bulle
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
                                                staggerChildren: 0.1, // Anime les cartes une par une
                                            },
                                        },
                                    }}
                                >
                                    {!isAuthenticated ? (
                                        <p>Veuillez vous connecter pour voir vos statistiques. 🗝️</p>
                                    ) : (
                                        <>
                                            <StatCard value={stats.totalRecipes} label="Recettes Créées" icon={recipeBookIcon} />
                                            <StatCard value={stats.totalCategories} label="Catégories Uniques" icon={categoriesIcon} />
                                            <StatCard value={stats.sousCategories} label="Sous-Catégories Explorées" icon={subCategoriesIcon} />
                                        </>
                                    )}
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