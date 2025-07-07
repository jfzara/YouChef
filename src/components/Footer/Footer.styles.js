import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledFooter = styled(motion.footer)`
    background-color: var(--color-light-sky-blue);
    color: var(--color-neutral-800);
    padding: var(--space-4) var(--space-4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: var(--shadow-sm);
    width: 100%;

    /* --- Modifications pour que le footer s'insère normalement dans le flux --- */
    /* Suppression des lignes suivantes qui forçaient le positionnement fixe: */
    /* position: fixed; */ 
    /* bottom: 0; */
    /* left: 0; */
    /* z-index: var(--z-low); */ 
    /* --- Fin des modifications --- */

    /* Ajout d'une marge supérieure pour espacer le contenu et le footer */
    margin-top: var(--space-8); /* Ajustez cette valeur si nécessaire */

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        padding: var(--space-4) var(--space-8);
    }
`;

export const FooterText = styled.p`
    font-family: var(--font-family-sans);
    font-size: var(--text-base);
    margin: var(--space-2) 0;

    @media (max-width: 767px) {
        font-size: var(--text-sm);
    }
`;

export const FooterCredits = styled(FooterText)`
    font-weight: var(--font-semibold);
    color: var(--color-bright-pink-crayola);
    margin-top: var(--space-3); /* Ajoute un peu d'espace au-dessus */

    @media (min-width: 768px) {
        order: -1; /* Place les crédits en premier sur les grands écrans si tu veux */
        margin-top: 0;
    }
`;

export const SocialLinks = styled.div`
    display: flex;
    gap: var(--space-4);
    margin: var(--space-2) 0;

    @media (min-width: 768px) {
        margin: 0;
    }
`;

export const SocialIcon = styled(motion.a)`
    color: var(--color-neutral-800);
    font-size: var(--text-2xl);
    transition: color var(--transition-fast), transform var(--transition-fast);

    &:hover {
        color: var(--color-bright-pink-crayola);
        transform: translateY(-2px);
    }

    @media (max-width: 767px) {
        font-size: var(--text-xl);
    }
`;

export const FooterNavLink = styled(motion.a)`
    font-family: var(--font-family-sans);
    font-size: var(--text-base);
    color: var(--color-neutral-800);
    text-decoration: none;
    margin: var(--space-1) 0;
    transition: color var(--transition-fast), transform var(--transition-fast);

    &:hover {
        color: var(--color-salmon);
        transform: translateX(2px);
    }

    @media (max-width: 767px) {
        font-size: var(--text-sm);
    }
`;

export const LinksColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: var(--space-3) 0;
    
    @media (min-width: 768px) {
        align-items: flex-start;
        margin: 0;
    }
`;