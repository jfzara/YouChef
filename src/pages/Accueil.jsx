
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useHover } from '../contexts/HoverContext';
import Footer from '../components/Footer/Footer';

// --- Styled Components pour la Page d'Accueil ---

const AccueilContainer = styled(motion.div)`
    margin-top: 3rem; /* Espace réduit par défaut pour desktop */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--space-8) 0;
    position: relative;
    overflow: hidden;
    color: var(--color-neutral-800);
    background-color: var(--color-cream);
    text-align: center;
    min-height: 100vh;
    box-sizing: border-box;

    @media (max-width: 1024px) { /* Ajustement pour les écrans intermédiaires/petits desktops */
        margin-top: 4rem; /* Légèrement plus d'espace */
    }

    @media (max-width: 880px) {
        margin-top: 3rem; /* Retour à 3rem pour mobile/tablette */
        padding-bottom: 'calc(var(--space-6) + 120px)';
        justify-content: flex-start;
    }
    @media (max-width: 480px) {
        padding-bottom: 'calc(var(--space-5) + 100px)';
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
        margin-top: var(--space-6);
    }
    @media (max-width: 480px) {
        font-size: var(--text-3xl);
        margin-top: var(--space-5);
    }
`;

const Subtitle = styled(motion.p)`
    font-family: var(--font-family-sans);
    font-size: var(--text-2xl);
    color: var(--color-neutral-700);
    margin-bottom: var(--space-8);
    max-width: 700px;
    line-height: 1.6;

    @media (max-width: 880px) {
        font-size: var(--text-xl);
        margin-bottom: var(--space-6);
    }
    @media (max-width: 480px) {
        font-size: var(--text-base);
        margin-bottom: var(--space-5);
    }
`;

const CallToActionButton = styled(motion(Link))`
    background-color: var(--color-jasmine);
    color: var(--color-neutral-900);
    font-family: var(--font-family-sans);
    font-size: var(--text-xl);
    padding: var(--space-4) var(--space-8);
    margin-top: 3rem; /* CORRECTION APPORTÉE ICI pour desktop: 3rem */
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
        margin-top: var(--space-7);
    }

    @media (max-width: 480px) {
        font-size: var(--text-lg);
        padding: var(--space-3) var(--space-6);
        margin-top: var(--space-6);
    }
`;

// --- Styled Components pour la Section "Comment ça Marche ?" ---

const HowItWorksSection = styled(motion.section)`
    width: 100%;
    max-width: 800px;
    padding: var(--space-5) var(--space-3);
    margin-top: var(--space-6); /* Pas besoin d'ajuster ici car le CTA gère sa propre marge top */
    background-color: var(--color-light-sky-blue);
    border-radius: var(--radius-xl);
    box-shadow: '0 2px 10px 0 rgba(0, 0, 0, 0.03)';
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5);
    opacity: 0;

    @media (min-width: 769px) {
        display: flex;
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

const HowItWorksTitle = styled.h2`
    display: none;
`;

const StepsGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    width: 100%;
    margin-top: var(--space-3);

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--space-3);
    }
`;

const StepCard = styled(motion.div)`
    background-color: ${({ index }) => {
        const baseColor = [173, 216, 230];
        let alpha = 0.25;
        
        if (index === 0) {
            return `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${alpha})`;
        } else if (index === 1) {
            return `rgba(${Math.min(255, baseColor[0] + 10)}, ${Math.min(255, baseColor[1] + 10)}, ${Math.min(255, baseColor[2] + 10)}, ${alpha})`;
        } else if (index === 2) {
            return `rgba(${Math.min(255, baseColor[0] + 20)}, ${Math.min(255, baseColor[1] + 20)}, ${Math.min(255, baseColor[2] + 20)}, ${alpha})`;
        }
        return `rgba(255, 255, 255, ${alpha})`;
    }};
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

    @media (max-width: 768px) {
        padding: var(--space-3);
        gap: var(--space-1);
    }
`;

const StepIcon = styled.div`
    font-size: var(--text-4xl);
    color: var(--color-salmon);
    margin-bottom: var(--space-1);

    @media (max-width: 768px) {
        font-size: var(--text-3xl);
    }
`;

const StepTitle = styled.h3`
    font-family: var(--font-family-sans);
    font-size: var(--text-lg);
    color: var(--color-neutral-900);
    margin-bottom: var(--space-1);

    @media (max-width: 768px) {
        font-size: var(--text-base);
    }
`;

const StepDescription = styled.p`
    font-family: var(--font-family-sans);
    font-size: var(--text-sm);
    color: var(--color-neutral-800);
    line-height: 1.4;

    @media (max-width: 768px) {
        font-size: var(--text-xs);
    }
`;

// --- Composant Page d'Accueil ---

const Accueil = () => {
    const { isNavbarHovered } = useHover();

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

    const isDesktop = window.innerWidth > 768;

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

                <Subtitle variants={mainItemVariants}>
                    Découvrez, partagez et savourez des recettes uniques et inspirantes.
                </Subtitle>
            </ContentWrapper>

            {isDesktop && (
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
                        <StepCard variants={cardItemVariants} index={0}>
                            <StepIcon>🍽️</StepIcon>
                            <StepTitle>Découvrez de nouvelles saveurs</StepTitle>
                            <StepDescription>Parcourez notre vaste collection de recettes. Utilisez la barre de recherche et les filtres pour trouver l'inspiration.</StepDescription>
                        </StepCard>
                        <StepCard variants={cardItemVariants} index={1}>
                            <StepIcon>✍️</StepIcon>
                            <StepTitle>Partagez vos créations</StepTitle>
                            <StepDescription>Connectez-vous pour ajouter facilement vos recettes préférées et les partager avec la communauté.</StepDescription>
                        </StepCard>
                        <StepCard variants={cardItemVariants} index={2}>
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