


// src/components/AdminDashboard/AdminDashboard.styles.js

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

// Définition et exportation manquante de AdminDashboardContainer
export const AdminDashboardContainer = styled(motion.div)`
    padding: var(--space-6);
    max-width: 1200px;
    margin: var(--space-4) auto;
    background-color: var(--color-neutral-0); /* Fond blanc ou très clair */
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    font-family: var(--font-family-sans);

    h1 {
        font-family: var(--font-family-heading);
        color: var(--color-bright-pink-crayola);
        text-align: center;
        margin-bottom: var(--space-6);
        font-size: var(--text-4xl);

        @media (max-width: 768px) {
            font-size: var(--text-3xl);
        }
    }

    section {
        background-color: var(--color-cream);
        padding: var(--space-5);
        border-radius: var(--radius-md);
        margin-bottom: var(--space-6);
        box-shadow: var(--shadow-sm);

        h2 {
            font-family: var(--font-family-heading);
            color: var(--color-neutral-800);
            margin-top: 0;
            margin-bottom: var(--space-4);
            font-size: var(--text-2xl);

            @media (max-width: 768px) {
                font-size: var(--text-xl);
            }
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        li {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            padding: var(--space-3) var(--space-4);
            border-bottom: 1px solid var(--color-neutral-200);
            &:last-child {
                border-bottom: none;
            }
            font-size: var(--text-base);
            color: var(--color-neutral-700);

            @media (max-width: 768px) {
                flex-direction: column;
                align-items: flex-start;
                gap: var(--space-2);
            }
        }
    }
`;

// Styles de base pour tous les boutons du dashboard admin
const BaseButton = styled(motion.button)`
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md); // Bordure arrondie
    border: none;
    cursor: pointer;
    font-weight: var(--font-bold); // Police en gras
    font-family: var(--font-family-sans); // Assure la même police que le reste de l'app
    transition: all 0.2s ease-in-out;
    white-space: nowrap;
    
    // Assurez-vous que le texte est bien centré dans le bouton
    display: inline-flex; // Utiliser flexbox pour centrer le contenu
    align-items: center;
    justify-content: center;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    &:active {
        transform: translateY(0);
        box-shadow: var(--shadow-sm);
    }

    @media (max-width: 768px) {
        width: 100%;
        margin-top: var(--space-2);
    }
`;

// Bouton de suppression (rouge)
export const DeleteButton = styled(BaseButton)`
    background-color: var(--color-salmon);
    color: var(--color-neutral-0);

    &:hover {
        background-color: var(--color-bright-pink-crayola);
    }
`;

// Bouton de promotion (vert)
export const PromoteButton = styled(BaseButton)`
    background-color: var(--color-bright-pink-crayola);
    color: var(--color-neutral-0);
    margin-left: var(--space-3);

    &:hover {
        background-color: var(--color-salmon);
    }

    @media (max-width: 768px) {
        margin-left: 0;
    }
`;

// Bouton de rétrogradation (orange/jaune)
export const DemoteButton = styled(BaseButton)`
    background-color: var(--color-jasmine);
    color: var(--color-neutral-800);
    margin-left: var(--space-3);

    &:hover {
        background-color: var(--color-cream);
    }

    @media (max-width: 768px) {
        margin-left: 0;
    }
`;

// Nouveau bouton de modification (bleu ou couleur neutre)
// Le problème venait probablement de la manière dont les styles de BaseButton étaient appliqués
export const EditButton = styled(BaseButton)` // <--- Basé directement sur BaseButton
    background-color: var(--color-light-sky-blue);
    color: var(--color-neutral-800);
    margin-right: var(--space-3);

    &:hover {
        background-color: var(--color-cream);
    }

    @media (max-width: 768px) {
        margin-right: 0;
    }
`;
// Styles pour les éléments de liste pour gérer l'ellipsis et l'alignement
export const ListItemContent = styled.span`
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    padding-right: var(--space-3);

    @media (max-width: 768px) {
        width: 100%;
        padding-right: 0;
        text-align: left;
    }
`;

export const ListButtonsContainer = styled.div`
    display: flex;
    gap: var(--space-2);
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;
        gap: var(--space-1);
    }
`;