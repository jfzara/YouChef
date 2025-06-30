

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
    min-height: 100vh; /* S'assure que le conteneur prend au moins toute la hauteur de la vue */
    box-sizing: border-box; /* Inclut le padding dans le calcul de la hauteur */


    @media (max-width: 880px) {
        /* Ajustement clé pour laisser de la place au footer sur mobile */
        /* Nous n'avons plus les cartes, donc moins de contenu, le padding peut être réduit */
        padding-bottom: 'calc(var(--space-6) + 120px)'; /* Espace pour le footer mobile */
        justify-content: flex-start; /* Aligne le contenu en haut pour éviter trop d'espace au-dessus du titre */
    }
    @media (max-width: 480px) {
        padding-bottom: 'calc(var(--space-5) + 100px)'; /* Ajustement pour les très petits mobiles */
        justify-content: flex-start;
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
    max-width: 1200px;
    padding: 0 var(--space-4);
    box-sizing: border-box;
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
    color: var(--color-bright-pink-crayola);
    margin-bottom: var(--space-4);
    line-height: 1.1;

    @media (max-width: 1024px) {
        font-size: var(--text-5xl);
    }

    @media (max-width: 880px) {
        font-size: var(--text-4xl);
        margin-top: var(--space-6); /* Ajoute une marge au-dessus du titre pour le mobile */
    }
    @media (max-width: 480px) {
        font-size: var(--text-3xl); /* Rendre le titre plus petit sur les très petits écrans */
        margin-top: var(--space-5);
    }
`;

// La Subtitle est désormais optionnelle ou peut être rendue conditionnellement
const Subtitle = styled(motion.p)`
    font-family: var(--font-family-sans);
    font-size: var(--text-2xl);
    color: var(--color-neutral-700);
    margin-bottom: var(--space-8);
    max-width: 700px;
    line-height: 1.6;

    @media (max-width: 880px) {
        font-size: var(--text-xl);
        margin-bottom: var(--space-6); /* Réduit la marge pour rapprocher le CTA */
    }
    @media (max-width: 480px) {
        font-size: var(--text-base); /* Texte encore plus petit sur les très petits écrans */
        margin-bottom: var(--space-5);
    }
`;

const CallToActionButton = styled(motion(Link))`
    background-color: var(--color-jasmine);
    color: var(--color-neutral-900);
    font-family: var(--font-family-sans);
    font-size: var(--text-xl);
    padding: var(--space-4) var(--space-8);
    margin-top: '6vw'; /* Conserve cette unité pour les grands écrans, mais révisée ci-dessous */
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
        background-color: var(--color-salmon);
        color: var(--color-neutral-0);
        transform: translateY('-4px');
        box-shadow: var(--shadow-lg);
    }

    &:active {
        transform: translateY(0);
        box-shadow: var(--shadow-sm);
    }

    @media (max-width: 880px) {
        margin-top: var(--space-7); /* Plus d'espace au-dessus du bouton après le titre/sous-titre sur tablette */
    }

    @media (max-width: 480px) {
        font-size: var(--text-lg);
        padding: var(--space-3) var(--space-6);
        margin-top: var(--space-6); /* Plus d'espace au-dessus du bouton après le titre/sous-titre sur mobile */
    }
`;

// --- Ces Styled Components ne seront plus utilisés pour les mobiles ---
const HowItWorksSection = styled(motion.section)`
    /* Conservez ces styles pour les écrans plus grands si nécessaire */
    width: 100%;
    max-width: 800px;
    padding: var(--space-5) var(--space-3);
    margin-top: var(--space-6);
    background-color: var(--color-light-sky-blue);
    border-radius: var(--radius-xl);
    box-shadow: '0 2px 10px 0 rgba(0, 0, 0, 0.03)';
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5);
    opacity: 0; /* Initialiser à 0 pour l'animation */

    @media (max-width: 768px) {
        display: none; /* CACHE LA SECTION ENTIÈRE SUR MOBILE */
    }
`;

const HowItWorksTitle = styled.h2`
    display: none;
`;

const StepsGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax('200px', 1fr));
    gap: var(--space-4);
    width: 100%;
    margin-top: var(--space-3);
`;

const StepCard = styled(motion.div)`
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur('8px');
    -webkit-backdrop-filter: blur('8px');
    border: '1px solid rgba(255, 255, 255, 0.1)';
    border-radius: var(--radius-lg);
    box-shadow: '0 2px 8px 0 rgba(0, 0, 0, 0.03)';
    padding: var(--space-4);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;

    &:hover {
        transform: translateY('-2px');
        box-shadow: '0 5px 20px 0 rgba(0, 0, 0, 0.07)';
    }
`;

const StepIcon = styled.div`
    font-size: var(--text-4xl);
    color: var(--color-salmon);
    margin-bottom: var(--space-1);
`;

const StepTitle = styled.h3`
    font-family: var(--font-family-sans);
    font-size: var(--text-lg);
    color: var(--color-neutral-900);
    margin-bottom: var(--space-1);
`;

const StepDescription = styled.p`
    font-family: var(--font-family-sans);
    font-size: var(--text-sm);
    color: var(--color-neutral-800);
    line-height: 1.4;
`;

// --- Composant Page d'Accueil ---

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
                delay: 0.3
            }
        }
    };

    // Les variants des cartes ne sont plus utilisés pour l'affichage mobile, mais conservés si la section est affichée sur desktop.
    const cardItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const cardsGridContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.5
            }
        }
    };

    const howItWorksSectionBackgroundVariants = {
        visible: {
            opacity: 1,
            delay: 0.5 + (0.15 * 2) + 0.4 + 0.1,
            duration: 0.8,
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

                {/* Ajout du sous-titre ici pour qu'il apparaisse avant le CTA */}
                <Subtitle variants={mainItemVariants}>
                    Découvrez, partagez et savourez des recettes uniques et inspirantes.
                </Subtitle>
            </ContentWrapper>

            {/* Section "Comment ça Marche ?" conditionnelle : affichée uniquement sur les écrans plus grands */}
            {window.innerWidth > 768 && ( // Rendre conditionnellement en fonction de la taille de l'écran
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
            )}

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