

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useHover } from '../contexts/HoverContext';
import Footer from '../components/Footer/Footer'; // Importe le composant Footer

// --- Styled Components pour la Page d'Accueil ---

const AccueilContainer = styled(motion.div)`
    margin-top: 3rem; /* Vérifié : Variable CSS ou déjà correct */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--space-8) 0; /* Vérifié : Variable CSS */
    position: relative;
    overflow: hidden; /* Important pour masquer les débordements des éléments décoratifs */
    color: var(--color-neutral-800);
    background-color: var(--color-cream); /* Fond doux de la section principale */
    text-align: center;

    @media (max-width: 880px) {
        /* Ajustement clé pour laisser de la place au footer sur mobile */
        padding-bottom: 'calc(var(--space-8) + 120px)'; /* CORRECTION : '120px' */
    }
    @media (max-width: 480px) {
        padding-bottom: 'calc(var(--space-8) + 100px)'; /* CORRECTION : '100px' */
    }
`;

const BackgroundImageLayer = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    pointer-events: none;
    z-index: 0;
    opacity: 0;
`;

const ContentWrapper = styled.div`
    width: 100%;
    max-width: 1200px; /* Vérifié : Unité en dur, pas de problème */
    padding: 0 var(--space-4); /* Vérifié : Variable CSS */
    box-sizing: border-box; /* S'assure que le padding est inclus dans la largeur */
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-6); /* Vérifié : Variable CSS */

    @media (max-width: 480px) {
        padding: 0 var(--space-3); /* Vérifié : Variable CSS */
    }
`;

const MainTitle = styled(motion.h1)`
    font-family: var(--font-family-heading);
    font-size: var(--text-6xl); /* Vérifié : Variable CSS */
    color: var(--color-bright-pink-crayola); /* Couleur vive pour le titre principal */
    margin-bottom: var(--space-4); /* Vérifié : Variable CSS */
    line-height: 1.1;

    @media (max-width: 1024px) {
        font-size: var(--text-5xl); /* Vérifié : Variable CSS */
    }

    @media (max-width: 880px) {
        font-size: var(--text-4xl); /* Vérifié : Variable CSS */
    }
`;

const Subtitle = styled(motion.p)`
    font-family: var(--font-family-sans);
    font-size: var(--text-2xl); /* Vérifié : Variable CSS */
    color: var(--color-neutral-700); /* Texte légèrement plus doux que le noir pur */
    margin-bottom: var(--space-8); /* Vérifié : Variable CSS */
    max-width: 700px; /* Vérifié : Unité en dur, pas de problème */
    line-height: 1.6;

    @media (max-width: 880px) {
        font-size: var(--text-xl); /* Vérifié : Variable CSS */
    }
`;

const CallToActionButton = styled(motion(Link))`
    background-color: var(--color-jasmine); /* Couleur chaude et accueillante */
    color: var(--color-neutral-900);
    font-family: var(--font-family-sans);
    font-size: var(--text-xl); /* Vérifié : Variable CSS */
    padding: var(--space-4) var(--space-8); /* Vérifié : Variable CSS */
    margin-top: '6vw'; /* CORRECTION APPORTÉE ICI */
    border: none;
    border-radius: var(--radius-full); /* Vérifié : Variable CSS */
    cursor: pointer;
    box-shadow: var(--shadow-md); /* Vérifié : Variable CSS */
    transition: background-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast); /* Vérifié : Variable CSS */
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    &:hover {
        background-color: var(--color-salmon); /* Passage à une couleur plus intense au survol */
        color: var(--color-neutral-0);
        transform: translateY(-4px); /* CORRECTION : '-4px' */
        box-shadow: var(--shadow-lg); /* Vérifié : Variable CSS */
    }

    &:active {
        transform: translateY(0);
        box-shadow: var(--shadow-sm); /* Vérifié : Variable CSS */
    }

    @media (max-width: 880px) {
        margin-top: var(--space-6); /* Vérifié : Variable CSS */
    }

    @media (max-width: 480px) {
        font-size: var(--text-lg); /* Vérifié : Variable CSS */
        padding: var(--space-3) var(--space-6); /* Vérifié : Variable CSS */
        margin-top: var(--space-5); /* Vérifié : Variable CSS */
    }
`;


const HowItWorksSection = styled(motion.section)`
    width: 100%;
    max-width: 800px; /* Vérifié : Unité en dur, pas de problème */
    padding: var(--space-5) var(--space-3); /* Vérifié : Variable CSS */
    margin-top: var(--space-6); /* Vérifié : Variable CSS */
    background-color: var(--color-light-sky-blue); /* Une couleur de fond pour que le glassmorphism soit visible */
    border-radius: var(--radius-xl); /* Vérifié : Variable CSS */
    box-shadow: '0 2px 10px 0 rgba(0, 0, 0, 0.03)'; /* CORRECTION : '0 2px 10px 0 ...' */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5); /* Vérifié : Variable CSS */
    
    opacity: 0; 

    @media (max-width: 880px) {
        margin-top: var(--space-5); /* Vérifié : Variable CSS */
        padding: var(--space-4) var(--space-3); /* Vérifié : Variable CSS */
    }

    @media (max-width: 768px) {
        max-width: 90%; /* Vérifié : Unité en dur, pas de problème */
        margin-top: var(--space-4); /* Vérifié : Variable CSS */
        padding: var(--space-3) var(--space-2); /* Vérifié : Variable CSS */
    }
`;

const HowItWorksTitle = styled.h2`
    display: none; /* Cache toujours le titre */
`;

const StepsGrid = styled(motion.div)` 
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax('200px', 1fr)); /* CORRECTION : '200px' */
    gap: var(--space-4); /* Vérifié : Variable CSS */
    width: 100%;
    margin-top: var(--space-3); /* Vérifié : Variable CSS */

    @media (max-width: 768px) {
        grid-template-columns: 1fr; /* Vérifié : Pas d'unité */
        gap: var(--space-3); /* Vérifié : Variable CSS */
    }
`;

// Styles pour le glassmorphism encore plus subtil et intégré
const StepCard = styled(motion.div)`
    background-color: rgba(255, 255, 255, 0.25); /* Vérifié : Pas d'unité */
    backdrop-filter: blur('8px'); /* CORRECTION : '8px' */
    -webkit-backdrop-filter: blur('8px'); /* CORRECTION : '8px' */
    border: '1px solid rgba(255, 255, 255, 0.1)'; /* CORRECTION : '1px solid ...' */
    border-radius: var(--radius-lg); /* Vérifié : Variable CSS */
    box-shadow: '0 2px 8px 0 rgba(0, 0, 0, 0.03)'; /* CORRECTION : '0 2px 8px 0 ...' */
    padding: var(--space-4); /* Vérifié : Variable CSS */
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2); /* Vérifié : Variable CSS */
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out; /* Vérifié : Pas d'unité directement après un nombre */

    &:hover {
        transform: translateY('-2px'); /* CORRECTION : '-2px' */
        box-shadow: '0 5px 20px 0 rgba(0, 0, 0, 0.07)'; /* CORRECTION : '0 5px 20px 0 ...' */
    }

    @media (max-width: 768px) {
        padding: var(--space-3); /* Vérifié : Variable CSS */
        gap: var(--space-1); /* Vérifié : Variable CSS */
    }
`;

const StepIcon = styled.div`
    font-size: var(--text-4xl); /* Vérifié : Variable CSS */
    color: var(--color-salmon); /* Conserve une touche de couleur vive pour les icônes */
    margin-bottom: var(--space-1); /* Vérifié : Variable CSS */

    @media (max-width: 768px) {
        font-size: var(--text-3xl); /* Vérifié : Variable CSS */
    }
`;

const StepTitle = styled.h3`
    font-family: var(--font-family-sans);
    font-size: var(--text-lg); /* Vérifié : Variable CSS */
    color: var(--color-neutral-900);
    margin-bottom: var(--space-1); /* Vérifié : Variable CSS */

    @media (max-width: 768px) {
        font-size: var(--text-base); /* Vérifié : Variable CSS */
    }
`;

const StepDescription = styled.p`
    font-family: var(--font-family-sans);
    font-size: var(--text-sm); /* Vérifié : Variable CSS */
    color: var(--color-neutral-800);
    line-height: 1.4;

    @media (max-width: 768px) {
        font-size: var(--text-xs); /* Vérifié : Variable CSS */
    }
`;

const Accueil = () => {
    const { isNavbarHovered } = useHover();

    // Variants pour les éléments principaux (titre, CTA)
    const mainItemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 15,
                delay: 0.3 // Démarre un peu après le chargement de la page
            }
        }
    };

    // Variants pour l'apparition individuelle des cartes (fade-in + léger glissement)
    const cardItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4, // Durée courte pour un fade-in rapide
                ease: "easeOut"
            }
        }
    };

    // Variants pour la grille des cartes (orchestre l'apparition successive)
    const cardsGridContainerVariants = {
        hidden: { opacity: 0 }, // La grille est initialement invisible
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Délai très court entre chaque carte
                delayChildren: 0.5 // Démarre l'apparition de la première carte après 0.5s
            }
        }
    };

    // Variants pour le conteneur HowItWorksSection (le fond bleu)
    const howItWorksSectionBackgroundVariants = {
        visible: {
            opacity: 1,
            // Calcul du délai : (délai avant 1ère carte) + (délai entre les 3 cartes) + (durée anim de la dernière carte) + (petit buffer)
            delay: 0.5 + (0.15 * 2) + 0.4 + 0.1, // environ 0.5 + 0.3 + 0.4 + 0.1 = 1.3 secondes
            duration: 0.8, // Durée du fondu du fond
            ease: "easeOut"
        }
    };


    return (
        <AccueilContainer
            initial="hidden"
            animate="visible"
        >
            <BackgroundImageLayer
                initial={{ opacity: 0 }}
                animate={{ opacity: isNavbarHovered ? 0.15 : 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />

            <ContentWrapper>
                <MainTitle variants={mainItemVariants}>
                    Votre Aventure Culinaire Commence Maintenant !
                </MainTitle>
            </ContentWrapper>

            {/* Section "Comment ça Marche ?" (le conteneur avec le fond bleu) */}
            <HowItWorksSection
                animate="visible" 
                variants={howItWorksSectionBackgroundVariants} 
            >
                <HowItWorksTitle />
                <StepsGrid
                    variants={cardsGridContainerVariants} 
                    initial="hidden"
                    animate="visible"
                >
                    <StepCard variants={cardItemVariants}> 
                        <StepIcon>🍽️</StepIcon>
                        <StepTitle>Découvrez de nouvelles saveurs</StepTitle>
                        <StepDescription>Parcourez notre vaste collection de recettes. Utilisez la barre de recherche et les filtres pour trouver l'inspiration.</StepDescription>
                    </StepCard>
                    <StepCard variants={cardItemVariants}>
                        <StepIcon>✍️</StepIcon>
                        <StepTitle>Partagez vos créations</StepTitle>
                        <StepDescription>Connectez-vous pour ajouter facilement vos recettes préférées et les partager avec la communauté.</StepDescription>
                    </StepCard>
                    <StepCard variants={cardItemVariants}>
                        <StepIcon>⭐</StepIcon>
                        <StepTitle>Gérez vos favoris</StepTitle>
                        <StepDescription>Créez votre propre carnet de recettes en enregistrant et en organisant vos découvertes culinaires.</StepDescription>
                    </StepCard>
                </StepsGrid>
            </HowItWorksSection>

            <CallToActionButton
                to="/recettes"
                variants={mainItemVariants}
                whileHover={{ scale: 1.05, y: -4, boxShadow: "var(--shadow-lg)" }}
                whileTap={{ scale: 0.95, y: 0, boxShadow: "var(--shadow-sm)" }}
            >
                Découvrir les Recettes
            </CallToActionButton>

            <Footer />
        </AccueilContainer>
    );
};

export default Accueil;