// src/components/AdminDashboard/AdminDashboard.styles.js

import styled from 'styled-components';
import { motion } from 'framer-motion';
// import { NavLink } from 'react-router-dom'; // Non utilisé dans ce fichier, peut être supprimé si non pertinent ailleurs.

// Définition et exportation manquante de AdminDashboardContainer
export const AdminDashboardContainer = styled(motion.div)`
    padding: var(--space-6);
    max-width: 1200px;
    margin: var(--space-4) auto;
    background-color: var(--color-neutral-0); /* Fond blanc ou très clair */
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    font-family: var(--font-family-sans);
    /* Ajout pour s'assurer que le contenu ne déborde pas horizontalement */
    overflow-x: hidden; 
    box-sizing: border-box; /* S'assurer que le padding est inclus dans la largeur */

    @media (max-width: 768px) {
        padding: var(--space-4); /* Réduire le padding sur les petits écrans */
    }

    @media (max-width: 480px) {
        padding: var(--space-3); /* Encore plus de réduction pour les très petits écrans */
    }

    h1 {
        font-family: var(--font-family-heading);
        color: var(--color-bright-pink-crayola);
        text-align: center;
        margin-bottom: var(--space-6);
        font-size: var(--text-4xl);

        @media (max-width: 768px) {
            font-size: var(--text-3xl);
        }
        @media (max-width: 480px) {
            font-size: var(--text-2xl); /* Ajuster la taille du titre pour les très petits écrans */
        }
    }

    section {
        background-color: var(--color-cream);
        padding: var(--space-5);
        border-radius: var(--radius-md);
        margin-bottom: var(--space-6);
        box-shadow: var(--shadow-sm);

        @media (max-width: 768px) {
            padding: var(--space-4);
        }
        @media (max-width: 480px) {
            padding: var(--space-3); /* Réduire le padding de section */
        }

        h2 {
            font-family: var(--font-family-heading);
            color: var(--color-neutral-800);
            margin-top: 0;
            margin-bottom: var(--space-4);
            font-size: var(--text-2xl);

            @media (max-width: 768px) {
                font-size: var(--text-xl);
            }
            @media (max-width: 480px) {
                font-size: var(--text-lg); /* Ajuster la taille du sous-titre */
            }
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        li {
            display: flex;
            flex-wrap: wrap; /* Assure que les éléments s'enroulent */
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
                padding: var(--space-3); /* Ajuster le padding des items de liste */
            }
             /* Pour les très petits viewports, s'assurer que le contenu des listes reste à l'intérieur */
            @media (max-width: 480px) {
                padding: var(--space-2);
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
    white-space: nowrap; /* Conserver le nowrap par défaut, mais nous allons le gérer spécifiquement pour les petits écrans */
    
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

    @media (max-width: 480px) {
        padding: var(--space-2) var(--space-3); /* Réduire le padding des boutons */
        font-size: var(--text-sm); /* Réduire la taille de la police des boutons */
        white-space: normal; /* Permettre au texte de s'enrouler */
        word-break: break-word; /* Casser les mots longs si nécessaire */
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
    min-width: 0; /* Permet à l'élément de rétrécir plus que son contenu */
    padding-right: var(--space-3); /* Garder un petit espace */

    @media (max-width: 768px) {
        width: 100%; /* Occupe toute la largeur disponible pour le texte */
        padding-right: 0;
        text-align: left;
        /* Sur les petits écrans, on peut permettre un retour à la ligne si le texte est vraiment long */
        white-space: normal; 
        word-break: break-word; /* Assure que les mots longs ne débordent pas */
    }

    img {
        /* Assurer que l'image ne cause pas de débordement */
        flex-shrink: 0; /* Empêche l'image de rétrécir */
        margin-right: var(--space-3); /* Ajuster la marge pour éviter le chevauchement */
        @media (max-width: 480px) {
            width: 40px !important; /* Réduire la taille de l'image sur les très petits écrans */
            height: 40px !important;
            margin-right: var(--space-2);
        }
    }
`;

export const ListButtonsContainer = styled.div`
    display: flex;
    gap: var(--space-2);
    flex-shrink: 0; /* Empêche ce conteneur de rétrécir plus que nécessaire */

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;
        gap: var(--space-1);
        align-items: flex-start; /* Aligner les boutons à gauche en mode colonne */
    }
    
    @media (max-width: 480px) {
        gap: var(--space-1); /* Réduire l'espace entre les boutons */
    }
`;