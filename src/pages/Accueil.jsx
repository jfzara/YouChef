// src/pages/Accueil.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useHover } from '../contexts/HoverContext';
import Footer from '../components/Footer/Footer'; // Importe le composant Footer

// --- Styled Components pour la Page d'Accueil ---

const AccueilContainer = styled(motion.div)`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--space-8) 0; /* Garde le padding vertical */
    position: relative;
    overflow: hidden; /* Important pour masquer les débordements des éléments décoratifs */
    color: var(--color-neutral-800);
    background-color: var(--color-cream); /* Fond doux de la section principale */
    text-align: center;

    @media (max-width: 880px) {
        padding-bottom: calc(var(--space-8) + 70px);
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
    max-width: 1200px; /* Largeur maximale pour le contenu */
    padding: 0 var(--space-4); /* Padding horizontal ici */
    box-sizing: border-box; /* S'assure que le padding est inclus dans la largeur */
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-6);

    @media (max-width: 480px) {
        padding: 0 var(--space-3);
    }
`;

const MainTitle = styled(motion.h1)`
    font-family: var(--font-family-heading);
    font-size: var(--text-6xl);
    color: var(--color-bright-pink-crayola); /* Couleur vive pour le titre principal */
    margin-bottom: var(--space-4);
    line-height: 1.1;

    @media (max-width: 1024px) {
        font-size: var(--text-5xl);
    }

    @media (max-width: 880px) {
        font-size: var(--text-4xl);
    }
`;

const Subtitle = styled(motion.p)`
    font-family: var(--font-family-sans);
    font-size: var(--text-2xl);
    color: var(--color-neutral-700); /* Texte légèrement plus doux que le noir pur */
    margin-bottom: var(--space-8);
    max-width: 700px;
    line-height: 1.6;

    @media (max-width: 880px) {
        font-size: var(--text-xl);
    }
`;

const CallToActionButton = styled(motion(Link))`
    background-color: var(--color-jasmine); /* Couleur chaude et accueillante */
    color: var(--color-neutral-900);
    font-family: var(--font-family-sans);
    font-size: var(--text-xl);
    padding: var(--space-4) var(--space-8);
    margin-top:6vw;
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition: background-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    &:hover {
        background-color: var(--color-salmon); /* Passage à une couleur plus intense au survol */
        color: var(--color-neutral-0);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
    }

    &:active {
        transform: translateY(0);
        box-shadow: var(--shadow-sm);
    }

    @media (max-width: 480px) {
        font-size: var(--text-lg);
        padding: var(--space-3) var(--space-6);
    }
`;

// --- Nouveaux Styled Components pour la Section "Comment ça Marche ?" (ultra-discrète) ---

const HowItWorksSection = styled(motion.section)`
    width: 100%;
    max-width: 800px; /* Largeur maximale réduite */
    padding: var(--space-5) var(--space-3); /* Padding vertical et horizontal encore plus réduits */
    margin-top: var(--space-6); /* Marge supérieure légèrement réduite */
    background-color: var(--color-light-sky-blue); /* Une couleur de fond pour que le glassmorphism soit visible */
    border-radius: var(--radius-xl);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.03); /* Ombre encore plus discrète */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5); /* Espacement réduit entre les éléments de la section */

    @media (max-width: 880px) {
        margin-top: var(--space-5);
        padding: var(--space-4) var(--space-3);
    }

    @media (max-width: 768px) {
        max-width: 90%; /* S'adapte mieux sur les petits écrans */
    }
`;

const HowItWorksTitle = styled.h2`
    display: none; /* Cache toujours le titre */
`;

const StepsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Taille minimale des cartes légèrement réduite */
    gap: var(--space-4); /* Espacement réduit entre les cartes */
    width: 100%;
    margin-top: var(--space-3); /* Marge supérieure des cartes réduite */

    @media (max-width: 768px) {
        grid-template-columns: 1fr; /* Colonne unique sur mobile */
    }
`;

// Styles pour le glassmorphism encore plus subtil et intégré
const StepCard = styled(motion.div)`
    background-color: rgba(255, 255, 255, 0.25); /* Fond encore plus transparent */
    backdrop-filter: blur(8px); /* Flou légèrement réduit pour un look plus intégré */
    -webkit-backdrop-filter: blur(8px); /* Pour la compatibilité Safari */
    border: 1px solid rgba(255, 255, 255, 0.1); /* Bordure presque invisible */
    border-radius: var(--radius-lg);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.03); /* Ombre très très légère */
    padding: var(--space-4); /* Padding interne des cartes réduit */
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2); /* Espacement réduit à l'intérieur de la carte */
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;

    &:hover {
        transform: translateY(-2px); /* Léger soulèvement très subtil au survol */
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07); /* Ombre un peu plus présente au survol, mais toujours discrète */
    }
`;

const StepIcon = styled.div`
    font-size: var(--text-4xl); /* Taille des icônes réduite */
    color: var(--color-salmon); /* Conserve une touche de couleur vive pour les icônes */
    margin-bottom: var(--space-1); /* Marge sous l'icône réduite */
`;

const StepTitle = styled.h3`
    font-family: var(--font-family-sans);
    font-size: var(--text-lg); /* Taille de la police du titre réduite */
    color: var(--color-neutral-900);
    margin-bottom: var(--space-1);
`;

const StepDescription = styled.p`
    font-family: var(--font-family-sans);
    font-size: var(--text-sm); /* Taille de la police de la description réduite */
    color: var(--color-neutral-800);
    line-height: 1.4;
`;

// --- Composant Page d'Accueil ---

const Accueil = () => {
    const { isNavbarHovered } = useHover();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 15
            }
        }
    };

    return (
        <AccueilContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <BackgroundImageLayer
                initial={{ opacity: 0 }}
                animate={{ opacity: isNavbarHovered ? 0.15 : 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />

            <ContentWrapper>
                <MainTitle variants={itemVariants}>
                    Votre Aventure Culinaire Commence Maintenant !
                </MainTitle>
               
                
            </ContentWrapper>

            {/* Section "Comment ça Marche ?" rendue encore plus discrète et plus petite */}
            <HowItWorksSection
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Le titre HowItWorksTitle n'est pas rendu ici */}
                <StepsGrid>
                    <StepCard variants={itemVariants}>
                        <StepIcon>🍽️</StepIcon>
                        <StepTitle>Découvrez de nouvelles saveurs</StepTitle>
                        <StepDescription>Parcourez notre vaste collection de recettes. Utilisez la barre de recherche et les filtres pour trouver l'inspiration.</StepDescription>
                    </StepCard>
                    <StepCard variants={itemVariants}>
                        <StepIcon>✍️</StepIcon>
                        <StepTitle>Partagez vos créations</StepTitle>
                        <StepDescription>Connectez-vous pour ajouter facilement vos recettes préférées et les partager avec la communauté.</StepDescription>
                    </StepCard>
                    <StepCard variants={itemVariants}>
                        <StepIcon>⭐</StepIcon>
                        <StepTitle>Gérez vos favoris</StepTitle>
                        <StepDescription>Créez votre propre carnet de recettes en enregistrant et en organisant vos découvertes culinaires.</StepDescription>
                    </StepCard>
                </StepsGrid>
            </HowItWorksSection>
<CallToActionButton
                    to="/recettes"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -4, boxShadow: "var(--shadow-lg)" }}
                    whileTap={{ scale: 0.95, y: 0, boxShadow: "var(--shadow-sm)" }}
                >
                    Découvrir les Recettes
                </CallToActionButton>
            {/* Intégration du Footer */}
            <Footer />
        </AccueilContainer>
    );
};

export default Accueil;