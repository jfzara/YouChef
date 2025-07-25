// C:\Users\Jeff\Desktop\PROJETS VS CODE\JAVASCRIPT\REACT\recettesreact\src\components\Dashboard\Dashboard.styles.js

import styled from 'styled-components';
import { motion } from 'framer-motion';

export const RecipeImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: var(--radius-md);
    margin-bottom: var(--space-3);
`;

export const DashboardContainer = styled(motion.div)`
    padding: var(--space-8);
    flex-grow: 1; 

    @media (max-width: 768px) {
        padding: var(--space-4);
        /* --- AJOUT OU MODIFICATION IMPORTANTE ICI --- */
        /* Pousse le contenu vers le bas pour ne pas chevaucher la navbar */
        padding-top: calc(var(--navbar-height) + var(--space-4)); 
    }
`;

export const WelcomeSection = styled(motion.div)`
    text-align: center;
    margin-bottom: var(--space-8);
    color: var(--color-neutral-800);

    h1 {
        font-size: var(--text-5xl);
        color: var(--color-primary-700);
        text-shadow: var(--shadow-text-md);

        @media (max-width: 768px) {
            font-size: var(--text-4xl);
        }
    }

    p {
        font-size: var(--text-lg);
        margin-top: var(--space-4);
        color: var(--color-neutral-700);
    }
`;

export const ContentGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--space-8);
    align-items: start;

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
`;

export const MainContent = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
`;

export const SidebarContent = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: var(--space-8);

    @media (max-width: 992px) {
        order: -1;
    }
`;

export const Card = styled(motion.div)`
    background: var(--color-neutral-0);
    border-radius: var(--radius-2xl);
    padding: var(--space-6);
    box-shadow: var(--shadow-xl);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    position: relative;
    overflow: hidden;
    border: 1px solid var(--color-secondary-500);
    transform: rotate(${(Math.random() - 0.5) * 2}deg);
`;

export const DashboardTitle = styled.h2`
    text-align: center;
    margin-bottom: var(--space-6);
    color: var(--color-primary-800);
    font-size: var(--text-3xl);
    text-shadow: var(--shadow-text-sm);
`;

export const AddRecipeToggleCard = styled(motion.button)`
    background: var(--color-accent-blue);
    color: var(--color-neutral-0);
   
    border-radius: var(--radius-2xl);
    padding: var(--space-6) var(--space-6);
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    text-transform: uppercase;
    letter-spacing: 1px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    text-align: center;
    min-height: 180px;
    transform: rotate(-5deg);

    &:before {
        content: '✨';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: var(--text-5xl);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        z-index: -1;
        pointer-events: none;
    }

    &:hover {
        background: var(--color-accent-blue-dark);
        box-shadow: var(--shadow-xl);
        transform: translateY(-5px) rotate(0deg) scale(1.02);
        border-color: var(--color-accent-blue-light);

        &:before {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 1;
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
    }

    &:active {
        transform: translateY(0) rotate(0deg) scale(0.98);
        box-shadow: var(--shadow-sm);
    }

    h3 {
        color: var(--color-neutral-0);
        margin-top: 0;
        margin-bottom: var(--space-4);
        font-size: var(--text-2xl);
        text-shadow: var(--shadow-text-md);
        line-height: 1.2;
    }

    .add-icon {
        font-size: var(--text-7xl);
        line-height: 1;
        text-shadow: var(--shadow-text-lg);
        display: inline-block;
        transition: transform 0.3s ease-out;
    }

    &:hover .add-icon {
        transform: rotate(180deg) scale(1.2);
    }
`;

export const FormGroup = styled.div`
    margin-bottom: var(--space-4);
    width: 100%;

    label {
        display: block;
        font-weight: var(--font-medium);
        margin-bottom: var(--space-2);
        color: var(--color-neutral-700);
        font-size: var(--text-sm);
    }

    input[type="text"],
    input[type="email"],
    input[type="password"],
    textarea {
        width: 100%;
        padding: var(--space-3);
        border: 1px solid var(--color-neutral-300);
        border-radius: var(--radius-md);
        font-family: var(--font-family-sans);
        font-size: var(--text-base);
        color: var(--color-neutral-800);
        background-color: var(--color-neutral-50);
        transition: all var(--transition-base);

        &:focus {
            outline: none;
            border-color: var(--color-primary-500);
            box-shadow: 0 0 0 2px var(--color-primary-100);
        }
    }

    textarea {
        min-height: 80px;
        resize: vertical;
    }
`;

export const Button = styled(motion.button)`
    background: var(--gradient-primary);
    color: white;
    padding: var(--space-3) var(--space-5);
    border: none;
    border-radius: var(--radius-lg);
    font-family: var(--font-family-heading);
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-md);
    margin-top: var(--space-2);

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
        filter: brightness(1.05);
    }

    &:active {
        transform: translateY(0);
        box-shadow: var(--shadow-sm);
    }

    &:disabled {
        background: var(--color-neutral-300);
        cursor: not-allowed;
        filter: none;
        transform: none;
        box-shadow: var(--shadow-sm);
    }
`;

export const StatusMessage = styled(motion.p)`
    padding: var(--space-3);
    border-radius: var(--radius-md);
    margin-top: var(--space-4);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    text-align: center;

    &.success {
        background-color: var(--color-success-light);
        color: var(--color-success-dark);
        border: 1px solid var(--color-success);
    }

    &.error {
        background-color: var(--color-error-light);
        color: var(--color-error-dark);
        border: 1px solid var(--color-error);
    }
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-4);
`;

export const StatCard = styled(Card)`
    text-align: center;
    padding: var(--space-5);
    background: var(--color-neutral-50);
    box-shadow: var(--shadow-md);

    h3 {
        font-family: var(--font-family-heading);
        font-size: var(--text-4xl);
        color: var(--color-primary-600);
        margin-bottom: var(--space-2);
    }

    p {
        font-size: var(--text-lg);
        color: var(--color-neutral-700);
        margin: 0;
    }
`;

export const RecentRecipesSection = styled.div`
    margin-top: var(--space-8);
`;

export const RecipeList = styled.ul`
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    
`;

export const RecipeListItem = styled(motion.li)`
    background: var(--color-neutral-0);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    
    height: 320px; 
    overflow: hidden; 
    position: relative; 
    
    transition: all var(--transition-base);
    justify-content: flex-start; 

    &:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg);
    }

    h4 {
        font-family: var(--font-family-heading);
        font-size: var(--text-xl);
        color: var(--color-primary-700);
        margin: 0 0 var(--space-2) 0; 
        line-height: 1.3; 
        
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis; 
    }

    p {
        font-size: var(--text-sm);
        color: var(--color-neutral-600);
        margin: 0;
        flex-grow: 1; 
        line-height: 1.4; 
        
        display: -webkit-box;
        -webkit-line-clamp: 3; 
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    span {
        font-size: var(--text-xs);
        color: var(--color-neutral-500);
        margin-top: var(--space-2); 
    }
`;