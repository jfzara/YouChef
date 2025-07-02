import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Styled Components pour la Page de Recettes ---

export const RecettesContainer = styled(motion.div)`
    min-height: 100vh;
    padding: var(--space-8) 0;
    background: var(--gradient-mesh); /* Votre fond mesh existant */
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center; /* Centrer horizontalement */
`;

export const PageTitle = styled(motion.h1)`
   
    font-size: var(--text-5xl);
    font-weight: var(--font-bold);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: var(--space-4);
    line-height: 1.1;
    text-align: center;
    position: relative;
    z-index: 1;

    &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 4px;
        background: var(--gradient-primary);
        border-radius: var(--radius-full);
        box-shadow: var(--shadow-md);
    }

    @media (max-width: 768px) {
        font-size: var(--text-4xl);
    }
`;

// NOUVELLE EXPORTATION POUR STATUSMESSAGE
export const StatusMessage = styled.p`
    text-align: center;
    color: ${props => props.$isError ? 'var(--color-error)' : 'var(--color-neutral-700)'};
    font-size: var(--text-lg);
    padding: var(--space-4);
    max-width: 600px;
    margin: var(--space-8) auto; /* Ajustez la marge pour qu'elle soit bien centrée et visible */

    @media (max-width: 768px) {
        font-size: var(--text-base);
        max-width: 85vw;
        margin-left: auto;
        margin-right: auto;
    }
`;


export const CategoryFilterContainer = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-3);
    margin: var(--space-8) auto;
    padding: 0 var(--space-4);
    max-width: 1200px;
    width: 100%;
    z-index: 1;

    @media (max-width: 768px) {
        margin: var(--space-6) auto;
        gap: var(--space-2);
        padding: 0 var(--space-2);
    }
`;

export const CategoryButton = styled(motion.button)`
    background-color: ${props => props.$isActive ? 'var(--color-primary-500)' : 'rgba(255, 255, 255, 0.7)'};
    color: ${props => props.$isActive ? 'white' : 'var(--color-neutral-700)'};
    border: 1px solid ${props => props.$isActive ? 'var(--color-primary-500)' : 'rgba(255, 255, 255, 0.3)'};
    backdrop-filter: ${props => props.$isActive ? 'none' : 'blur(15px)'};
    -webkit-backdrop-filter: ${props => props.$isActive ? 'none' : 'blur(15px)'};
    border-radius: var(--radius-full);
    padding: var(--space-3) var(--space-6);
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: ${props => props.$isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)'};

    &:hover {
        background-color: ${props => props.$isActive ? 'var(--color-primary-600)' : 'rgba(255, 255, 255, 0.9)'};
        color: ${props => props.$isActive ? 'white' : 'var(--color-neutral-800)'};
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    &:active {
        transform: translateY(0);
        box-shadow: var(--shadow-sm);
    }

    @media (max-width: 768px) {
        font-size: var(--text-sm);
        padding: var(--space-2) var(--space-4);
    }
`;

export const RecipeGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--space-6);
    width: 100%;
    max-width: 1200px;
    padding: 0 var(--space-4);
    margin: var(--space-8) auto;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: var(--space-5);
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: var(--space-4);
        padding: 0 var(--space-3);
    }
`;

export const RecipeMiniCard = styled(motion.div)`
    background: white;
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    z-index: 1;
    text-align: center;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, opacity 0.3s ease-in-out;

    ${props => props.$anyCardHovered && !props.$isHovered && `
        opacity: 0.75;
        box-shadow: var(--shadow-xs);
    `}

    .image-container {
        width: 100%;
        padding-bottom: 100%;
        position: relative;
        overflow: hidden;
        background-color: var(--color-neutral-200);
    }

    .image-container img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    }

    .recipe-info {
        padding: var(--space-3) var(--space-2);
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Aligner en haut */
        align-items: center; /* Centrer horizontalement */
        flex-grow: 1;
    }

    &:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: var(--shadow-md);
        opacity: 1;
        filter: none;
        z-index: 2;
    }

    @media (max-width: 768px) {
        border-radius: var(--radius-lg);
        .image-container {
            border-radius: var(--radius-lg);
        }
    }
`;

export const RecipeMiniName = styled.h4`
    font-family: var(--font-family-heading);
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--color-neutral-800);
    margin-bottom: 0;
    line-height: 1.3;
    white-space: nowrap; /* Empêche le texte de passer à la ligne */
    overflow: hidden; /* Cache le texte qui dépasse */
    text-overflow: ellipsis; /* Ajoute des points de suspension */
    width: 100%; /* Assure que l'élément prend toute la largeur disponible pour la troncature */
    text-align: center; /* Centre le texte */
    box-sizing: border-box; /* Inclut le padding dans la largeur */

    @media (max-width: 768px) {
        font-size: var(--text-sm);
    }
`;

export const RecipeImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-xl);

    @media (max-width: 768px) {
        border-radius: var(--radius-lg);
    }
`;

export const RecipeNameDetail = styled.h2`
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: var(--font-extrabold);
    color: var(--color-neutral-800);
    margin-bottom: var(--space-4);
    text-align: center;
    @media (max-width: 768px) {
        font-size: var(--text-3xl);
    }
`;

export const RecipeDescriptionDetail = styled.p`
    font-size: var(--text-lg);
    color: var(--color-neutral-700);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-6);
`;

export const Tag = styled.span`
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    margin: 0 var(--space-1) var(--space-1) 0;
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    text-transform: capitalize;
    background-color: ${props => props.$isCategory ? 'var(--soft-green-100)' : 'var(--soft-blue-100)'};
    color: ${props => props.$isCategory ? 'var(--soft-green-700)' : 'var(--soft-blue-700)'};
    white-space: nowrap;
`;

export const ModalOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
`;

export const ModalContent = styled(motion.div)`
    background: white;
    border-radius: var(--radius-3xl);
    padding: var(--space-8);
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-xl);
    position: relative;

    @media (max-width: 768px) {
        padding: var(--space-6);
        width: 95%;
    }
`;

export const CloseButton = styled(motion.button)`
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);

    background-color: var(--color-salmon);
    color: var(--color-neutral-0);
    border: 2px solid var(--color-salmon);
    border-radius: var(--radius-full);
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    cursor: pointer;
    z-index: 100;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease-in-out;

    &:active {
        transform: scale(0.95) rotate(0deg);
        box-shadow: var(--shadow-sm);
    }

    @media (min-width: 769px) {
        background-color: var(--color-bright-pink-crayola);
        border-color: var(--color-bright-pink-crayola);

        &:hover {
            background-color: var(--color-salmon);
            border-color: var(--color-salmon);
            transform: scale(1.1) rotate(5deg);
            box-shadow: var(--shadow-lg);
        }
    }

    img {
        width: 28px;
        height: 28px;
        filter: brightness(0) invert(1);
    }
`;

export const ModalImage = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: var(--radius-xl);
    margin-bottom: var(--space-6);

    @media (max-width: 768px) {
        height: 200px;
        margin-bottom: var(--space-4);
    }
`;

export const RecipeDetailsSection = styled.div`
    margin-top: var(--space-6);
    h3 {
        font-family: var(--font-body);
        font-size: var(--text-xl);
        font-weight: var(--font-semibold);
        color: var(--color-neutral-800);
        margin-bottom: var(--space-3);
    }
    ul, ol {
        list-style-position: inside;
        margin-bottom: var(--space-4);
        padding-left: var(--space-2);
    }
    li {
        font-size: var(--text-base);
        color: var(--color-neutral-700);
        line-height: var(--leading-relaxed);
        margin-bottom: var(--space-2);
    }
`;